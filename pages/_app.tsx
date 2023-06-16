import "@/styles/globals.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { Sidebar } from "primereact/sidebar";
import Settings from "@/components/Settings";
import { useEffect, useState } from "react";
import { AppEvent, subscribe, unsubscribe } from "@/lib/events/events";

export default function App({ Component, pageProps }: AppProps) {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  const showSettings = () => {
    setSettingsVisible(true);
  };

  const hideSettings = () => {
    setSettingsVisible(false);
  };

  useEffect(() => {
    subscribe(AppEvent.ShowSettings, showSettings);

    return () => {
      unsubscribe(AppEvent.ShowSettings, showSettings);
    };
  }, []);

  return (
    <>
      <Header />
      <Sidebar
        visible={settingsVisible}
        position="right"
        onHide={() => hideSettings()}
      >
        <Settings />
      </Sidebar>
      <Component {...pageProps} />
    </>
  );
}
