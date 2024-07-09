const getKey = () => `_${new Date().getTime()}_${Math.random() * 1000}`;

export class Time {
  static intervalListeners: Record<
    string,
    { callback: () => void; time: number; initialTime: number }
  > = {};
  static timeoutListeners: Record<
    string,
    { callback: () => void; time: number }
  > = {};

  public static setInterval(callback: () => void, time: number) {
    const key = getKey();
    this.intervalListeners[key] = {
      callback,
      time,
      initialTime: time,
    };
    return key;
  }

  public static clearInterval(key: string) {
    delete this.intervalListeners[key];
  }

  public static setTimeout(callback: () => void, time: number) {
    console.log("received function", callback);
    const key = getKey();
    this.timeoutListeners[key] = { callback, time };
  }

  /**
   * Updates all listeners and call the ones that should be called.
   * @param deltaTime Time since last cycle, in milliseconds
   */
  public static _update(cycleTime: number) {
    for (const key in this.timeoutListeners) {
      this.timeoutListeners[key].time -= cycleTime;
      // Is listener's time is less than 0, triggers its callback and clear it from listeners list
      if (this.timeoutListeners[key].time <= 0) {
        this.timeoutListeners[key].callback();
        delete this.timeoutListeners[key];
      }
    }
    for (const key in this.intervalListeners) {
      this.intervalListeners[key].time -= cycleTime;
      // Is listener's time is less than 0, triggers its callback and resets its time counter
      if (this.intervalListeners[key].time <= 0) {
        this.intervalListeners[key].callback();
        this.intervalListeners[key].time =
          this.intervalListeners[key].initialTime;
      }
    }
  }
}
