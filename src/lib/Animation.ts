export class Animation {
  // Controls frame change speed
  private frameCounter = 0;
  // Current frame to render
  private frameIndex = 0;

  constructor(
    public spriteSetName: string,
    private framesList: string[],
    private refreshTime: number // The higher, the longer it takes to advance to next frame
  ) {}

  public getRefreshTime() {
    return this.refreshTime;
  }

  public setRefreshTime(time: number) {
    this.refreshTime = time;
  }

  public setFrameIndex(index: number) {
    this.frameIndex = index;
  }

  public getCurrentFrameName(): string {
    return this.framesList[this.frameIndex];
  }

  public _countFrame() {
    this.frameCounter += 1;
    if (this.frameCounter >= this.refreshTime && this.refreshTime !== 0) {
      this.frameCounter = 0;
      this.frameIndex += 1;
      if (this.frameIndex === this.framesList.length) {
        this.frameIndex = 0;
      }
    }
  }
}
