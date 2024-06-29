import { Dictionary } from "./Dictionary";

interface InputAxisSetup {
  upKey: string;
  downKey: string;
  leftKey: string;
  rightKey: string;
}

type InputAxisListener = (axis: { x: number; y: number }) => unknown;
type KeyListener = () => unknown;

interface InputAxis {
  x: number;
  y: number;
  setup: InputAxisSetup;
  listeners: InputAxisListener[];
}

export class GameInput {
  private static axis1: InputAxis;
  private static axis2: InputAxis;
  private static keyPressListeners: Dictionary<KeyListener[] | undefined>;
  private static keyReleaseListeners: Dictionary<KeyListener[] | undefined>;

  static handleKeyPress(key: string) {
    // Verifies if axis1 changed
    const reg = new RegExp(
      this.axis1.setup.downKey +
        "|" +
        this.axis1.setup.upKey +
        "|" +
        this.axis1.setup.leftKey +
        "|" +
        this.axis1.setup.rightKey
    );
    const axis1Match = reg.test(key);
    if (axis1Match) {
      // Updates axis status
      const { downKey, leftKey, rightKey, upKey } = this.axis1.setup;
      const pressedLeft = key === leftKey ? -1 : 0;
      const pressedRight = key === rightKey ? 1 : 0;
      const pressedUp = key === upKey ? 1 : 0;
      const pressedDown = key === downKey ? -1 : 0;
      this.axis1.x += pressedLeft + pressedRight;
      this.axis1.y += pressedDown + pressedUp;
      this.roundAxis1();
      // Calls all the axis' listeners, passing the axis status as parameter
      this.axis1.listeners.forEach((listener) => {
        listener({ x: this.axis1.x, y: this.axis1.y });
      });
    }
    this.keyPressListeners[key]?.forEach((handler) => handler());
  }

  static handleKeyRelease(key: string) {
    // Verifies if axis1 changed
    const reg = new RegExp(
      this.axis1.setup.downKey +
        "|" +
        this.axis1.setup.upKey +
        "|" +
        this.axis1.setup.leftKey +
        "|" +
        this.axis1.setup.rightKey
    );
    const axis1Match = reg.test(key);
    if (axis1Match) {
      // Updates axis status
      const { downKey, leftKey, rightKey, upKey } = this.axis1.setup;
      const releasedLeft = key === leftKey ? 1 : 0;
      const releasedRight = key === rightKey ? -1 : 0;
      const releasedUp = key === upKey ? -1 : 0;
      const releasedDown = key === downKey ? 1 : 0;
      this.axis1.x += releasedLeft + releasedRight;
      this.axis1.y += releasedDown + releasedUp;
      this.roundAxis1();
      // Calls all the axis' listeners, passing the axis status as parameter
      this.axis1.listeners.forEach((listener) => {
        listener({ x: this.axis1.x, y: this.axis1.y });
      });
    }
    this.keyReleaseListeners[key]?.forEach((handler) => handler());
  }

  /**
   * Makes sure the axis don't get modular values greater than 1
   */
  private static roundAxis1() {
    if (this.axis1.x > 1) {
      this.axis1.x = 1;
    }
    if (this.axis1.x < -1) {
      this.axis1.x = -1;
    }
    if (this.axis1.y > 1) {
      this.axis1.y = 1;
    }
    if (this.axis1.y < -1) {
      this.axis1.y = -1;
    }
  }

  public static setup() {
    // Setup axis
    this.axis1 = {
      x: 0,
      y: 0,
      setup: {
        downKey: "KeyS",
        upKey: "KeyW",
        leftKey: "KeyA",
        rightKey: "KeyD",
      },
      listeners: [],
    };
    this.axis2 = {
      x: 0,
      y: 0,
      setup: {
        downKey: "ArrowDown",
        upKey: "ArrowUp",
        leftKey: "ArrowLeft",
        rightKey: "ArrowRight",
      },
      listeners: [],
    };
    this.keyPressListeners = {};
    this.keyReleaseListeners = {};
    // Sets up handlers for keyboard event listeners
    window.onkeydown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }
      this.handleKeyPress(event.code);
    };
    window.onkeyup = (event: KeyboardEvent) => {
      this.handleKeyRelease(event.code);
    };
  }

  /**
   * Adds a listener for axis1 changes
   * @param listener
   */
  public static addAxis1Listener(listener: InputAxisListener) {
    this.axis1.listeners.push(listener);
  }

  public static addKeyListener(
    action: "press" | "release",
    key: string,
    listener: () => unknown
  ) {
    switch (action) {
      case "press":
        if (!this.keyPressListeners[key]) {
          this.keyPressListeners[key] = [];
        }
        this.keyPressListeners[key]!.push(listener);
        break;
      case "release":
        if (!this.keyReleaseListeners[key]) {
          this.keyReleaseListeners[key] = [];
        }
        this.keyReleaseListeners[key]!.push(listener);
        break;
    }
  }
}
