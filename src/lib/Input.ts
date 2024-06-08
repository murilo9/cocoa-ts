interface InputAxisSetup {
  upKey: string;
  downKey: string;
  leftKey: string;
  rightKey: string;
}

type InputAxisListener = (axis: { x: number; y: number }) => unknown;

interface InputAxis {
  x: number;
  y: number;
  setup: InputAxisSetup;
  listeners: Function[];
}

export class Input {
  private static axis1: InputAxis;
  private static axis2: InputAxis;
  private static A: boolean;
  private static B: boolean;
  private static C: boolean;
  private static D: boolean;
  private static R1: boolean;
  private static R2: boolean;
  private static L1: boolean;
  private static L2: boolean;
  private static START: boolean;
  private static SELECT: boolean;
  private static CTRL: boolean;
  private static L_CTRL: boolean;
  private static R_CTRL: boolean;
  private static ALT: boolean;
  private static L_ALT: boolean;
  private static R_ALT: boolean;
  private static SHIFT: boolean;
  private static L_SHIFT: boolean;
  private static R_SHIFT: boolean;

  static handleKeyPress(key: string) {
    // Verifies if axis1 changed
    if (
      key.match(
        new RegExp(
          this.axis1.setup.downKey +
            "|" +
            this.axis1.setup.upKey +
            "|" +
            this.axis1.setup.leftKey +
            "|" +
            this.axis1.setup.rightKey
        )
      )
    ) {
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
  }

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

  static handleKeyRelease(key: string) {
    // Verifies if axis1 changed
    if (
      key.match(
        new RegExp(
          this.axis1.setup.downKey +
            "|" +
            this.axis1.setup.upKey +
            "|" +
            this.axis1.setup.leftKey +
            "|" +
            this.axis1.setup.rightKey
        )
      )
    ) {
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
  }

  public static setup() {
    // Setup axis
    this.axis1 = {
      x: 0,
      y: 0,
      setup: {
        downKey: "s",
        upKey: "w",
        leftKey: "a",
        rightKey: "d",
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
    // Sets up handlers for keyboard event listeners
    window.onkeydown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }
      console.log("key down", event.key);
      this.handleKeyPress(event.key);
    };
    window.onkeyup = (event: KeyboardEvent) => {
      console.log("key up", event.key);
      this.handleKeyRelease(event.key);
    };
  }

  /**
   * Adds a listener for axis1 changes
   * @param listener
   */
  public static addAxis1Listener(listener: InputAxisListener) {
    this.axis1.listeners.push(listener);
  }
}
