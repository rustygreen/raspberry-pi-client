import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config/AppConfig";
import { InputText } from "primereact/inputtext";
import { generateArray } from "@/lib/generateArray";
import PinList, { PinRow } from "@/components/PinList";
import { GpioPinValue } from "@/lib/pins/GpioPinValue";
import { PinResponse } from "@/lib/pi-server/PinResponse";
import { configRepository } from "@/lib/config/configRepository";
import { AppEvent, subscribe, unsubscribe } from "@/lib/events/events";
import { AppConfigProperties } from "@/lib/config/AppConfigProperties";
import { NoPiServerConfiguredError } from "@/lib/errors/NoPiServerConfiguredError";

export const getStaticProps = async () => {
  const config = configRepository.load();
  return { props: { config } };
};

export default function Home(props: { config: AppConfigProperties }) {
  const [pins, setPins] = useState<PinResponse[]>([]);
  const [search, setSearch] = useState("");
  let [unfilteredPins, setUnfilteredPins] = useState<PinResponse[]>([]);

  useEffect(() => {
    CONFIG.apply(props.config);
    refreshPins();
    subscribe(AppEvent.RefreshPins, refreshPins);

    return () => {
      unsubscribe(AppEvent.RefreshPins, refreshPins);
    };
  }, []);

  const setPin = async (row: PinRow, value: GpioPinValue) => {
    const newPins = [...pins];
    row.value = value;
    row.loading = true;
    setPins(newPins);

    if (!CONFIG.activeServer) {
      throw new NoPiServerConfiguredError();
    }

    row.value = await CONFIG.activeServer.setPin(row.pin, value);
    delete row.loading;
    setPins([...newPins]);
    return row.value;
  };

  const refreshPins = async () => {
    if (!CONFIG.activeServer) {
      return;
    }

    setSearch("");
    const mockPinLength = pins.length || CONFIG.pinSkeletonCount;
    const loadingPins = generateArray(mockPinLength, toMockPin);
    setPins(loadingPins);

    const result = await CONFIG.activeServer.getPins();
    setPins(result);
    setUnfilteredPins(result);
  };

  const filterPins = (searchText: string) => {
    setSearch(searchText);
    if (!searchText) {
      setPins(unfilteredPins);
      return;
    }

    const filtered = unfilteredPins.filter((p) =>
      JSON.stringify(p).toLowerCase().includes(searchText)
    );

    setPins(filtered);
  };

  return (
    <main className="flex flex-column">
      <div className="flex align-items-center">
        <h1>GPIO Pins</h1>
        <Button
          icon="pi pi-refresh"
          rounded
          text
          aria-label="Filter"
          onClick={refreshPins}
        />
        <span className="flex-1"></span>

        <div>
          <div className="p-inputgroup">
            <InputText
              placeholder="Search..."
              value={search}
              onChange={(e) => filterPins(e.target.value)}
            />
            <Button
              icon="pi pi-times"
              severity="secondary"
              disabled={!search}
              onClick={() => filterPins("")}
            />
          </div>
        </div>
      </div>

      <PinList pins={pins} setPin={setPin} />
    </main>
  );
}

function toMockPin(index: number): PinRow {
  return { pin: index + 1, value: 0, initializing: true };
}
