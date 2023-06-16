import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../public/pi-logo.svg";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Dropdown } from "primereact/dropdown";
import { CONFIG } from "@/lib/config/AppConfig";
import React, { useEffect, useState } from "react";
import { createPiServer } from "@/lib/pi-server/createPiServer";
import { PiServerOptions } from "@/lib/pi-server/PiServerOptions";
import { AppEvent, publish, subscribe, unsubscribe } from "@/lib/events/events";

export default function Header() {
  const [servers, setServers] = useState<PiServerOptions[]>(CONFIG.servers);
  const [activeServer, setActiveServer] = useState<PiServerOptions | undefined>(
    CONFIG.activeServer
  );
  const router = useRouter();
  const navigate = (href: string, event?: Event | undefined) => {
    event?.preventDefault();
    router.push(href);
  };

  const items = [
    {
      label: "GPIO Pins",
      icon: "pi pi-fw pi-bolt",
      command: () => navigate("/")
    },
    {
      label: "Recipes",
      icon: "pi pi-fw pi-bookmark",
      command: () => navigate("/recipes")
    }
  ];

  const selectServer = (server: PiServerOptions) => {
    CONFIG.activeServer = createPiServer(server);
    setActiveServer(server);
    publish(AppEvent.RefreshPins);
  };

  const showSettings = () => {
    publish(AppEvent.ShowSettings);
  };

  const applyConfigChange = () => {
    setServers([...CONFIG.servers]);

    if (!CONFIG.activeServer) {
      return;
    }

    const server = CONFIG.servers.find(
      (s) => s.serverUrl === CONFIG.activeServer?.serverUrl
    );

    setActiveServer(server);
  };

  const start = <Image alt="logo" src={logo} height="40" className="mr-2" />;
  const end = (
    <>
      <Dropdown
        optionLabel="name"
        placeholder="Select a server"
        options={servers}
        value={activeServer}
        onChange={(e) => selectServer(e.value)}
      />
      <Button
        icon="pi pi-cog"
        rounded
        text
        aria-label="Settings"
        onClick={() => showSettings()}
      />
    </>
  );

  useEffect(() => {
    subscribe(AppEvent.ConfigChange, applyConfigChange);

    return () => {
      unsubscribe(AppEvent.ConfigChange, applyConfigChange);
    };
  }, []);

  return (
    <header className="flex-1">
      <Menubar model={items} start={start} end={end} />
    </header>
  );
}
