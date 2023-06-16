import { CONFIG } from "@/lib/config/AppConfig";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { GpioPinValue } from "@/lib/pins/GpioPinValue";
import { PinResponse } from "@/lib/pi-server/PinResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

export interface PinRow extends PinResponse {
  loading?: boolean | undefined;
  initializing?: boolean | undefined;
}

export interface PinTableProperties {
  loading?: boolean;
  pins?: PinRow[];
  setPin?: (pin: PinRow, value: GpioPinValue) => Promise<GpioPinValue>;
}

type None = null | undefined;

export default function PinList(props: PinTableProperties) {
  const skeleton = <Skeleton height="2rem"></Skeleton>;

  const setPinValue = async (pin: PinRow, checked: boolean | None) => {
    const value = checked ? GpioPinValue.On : GpioPinValue.Off;
    await props.setPin?.(pin, value);
  };

  const pinBodyTemplate = (row: PinRow) => {
    return <>{row.initializing ? skeleton : row.pin}</>;
  };

  const nameBodyTemplate = (row: PinRow) => {
    return (
      <span className="font-medium">
        {row.initializing ? skeleton : row.name}
      </span>
    );
  };

  const valueBodyTemplate = (row: PinRow) => {
    const checked = Boolean(row.value);
    if (row.initializing) {
      return skeleton;
    } else if (row.loading) {
      return (
        <ProgressSpinner
          style={{ width: "28px", height: "28px" }}
          strokeWidth="8"
          animationDuration=".5s"
        />
      );
    } else {
      return (
        <InputSwitch
          checked={checked}
          onChange={(e: InputSwitchChangeEvent) => setPinValue(row, e.value)}
        />
      );
    }
  };

  return (
    <DataTable
      value={props.pins}
      loading={props.loading}
      resizableColumns
      size={CONFIG.dataTableSize}
      className="flex-1"
    >
      <Column
        field="pin"
        header="#"
        sortable
        style={{ width: "100px" }}
        body={pinBodyTemplate}
      ></Column>
      <Column
        field="name"
        header="Name"
        sortable
        body={nameBodyTemplate}
      ></Column>
      <Column
        field="value"
        header="State"
        sortable
        body={valueBodyTemplate}
      ></Column>
    </DataTable>
  );
}
