import { createRoot } from "react-dom/client";
import { Dictionary } from "./Dictionary";

type UIEventListener<T> = (eventData: T) => unknown;

export class GameUI {
  // The game's UI React component
  private static component: JSX.Element;
  // UI event listeners
  private static uiEventListeners: Dictionary<UIEventListener<any>>;

  public static init(component: JSX.Element) {
    this.component = component;
    this.uiEventListeners = {};
    // Removes game's UI HTMLElement, if it exists
    const gameUI = document.getElementById("room-ui");
    if (gameUI) {
      gameUI.remove();
    }
    // Creates the HTML element fo the game's UI, with proper styles
    const newGameUI = document.createElement("div");
    newGameUI.id = "game-ui";
    (newGameUI.style.position = "absolute"), (newGameUI.style.top = "0");
    newGameUI.style.left = "0";
    newGameUI.style.width = "100vw";
    newGameUI.style.height = "100vh";
    // Appends the new game's UI HTML element to the body
    document.body.appendChild(newGameUI);
    // Makes React render the current game's UI HTML element
    createRoot(document.getElementById("game-ui")!).render(this.component);
  }

  /**
   * Dispatches an event for the game's UI React component
   * @param eventName
   * @param payload
   */
  public static dispatchUIEvent(eventName: string, payload: unknown) {
    if (this.uiEventListeners[eventName]) {
      this.uiEventListeners[eventName](payload);
    }
  }

  /**
   * Called by the game's UI React component only.
   * Sets the listener to a UI event.
   * @param eventName
   * @param listener
   */
  public static setUIEventListener<T>(
    eventName: string,
    listener: UIEventListener<T>
  ) {
    this.uiEventListeners[eventName] = listener;
  }
}
