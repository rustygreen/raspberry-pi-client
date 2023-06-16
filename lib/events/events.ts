interface AppEventListener<T extends Event = Event> extends EventListener {
  (evt: T): void;
}

interface AppEventListenerObject<T extends Event = Event>
  extends EventListenerObject {
  handleEvent(object: T): void;
}

type AppEventListenerOrObject<T extends Event = Event> =
  | AppEventListener<T>
  | AppEventListenerObject<T>;

export function subscribe<T extends Event = Event>(
  eventName: string,
  listener: AppEventListenerOrObject<T>
): void {
  document.addEventListener(eventName, listener);
}

export function unsubscribe<T extends Event = Event>(
  eventName: string,
  listener: AppEventListenerOrObject<T>
) {
  document.removeEventListener(eventName, listener);
}

export function publish(eventOrName: Event | string | AppEvent) {
  const event =
    typeof eventOrName === "string"
      ? new Event(eventOrName as string)
      : (eventOrName as Event);

  document.dispatchEvent(event);
}

export enum AppEvent {
  RefreshPins = "refresh",
  ShowSettings = "settings",
  ConfigChange = "config-change"
}
