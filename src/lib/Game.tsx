/* eslint-disable @typescript-eslint/no-this-alias */
import { Camera } from "./Camera";
import { Collider, ColliderBody } from "./Collider";
import { Debug } from "./Debug";
import { Entity } from "./Entity";
import { GameConfig } from "./GameConfig";
import { Drawable } from "./Graphic";
import { Room } from "./Room";
import { Frame, SpriteSet } from "./SpriteSet";
import { GameInput } from "./GameInput";
import { GameUI } from "./GameUI";
import { Time } from "./Time";

export class Game {
  public static readonly CYCLES_MS = 20;
  // Game's UI element
  private static UI: JSX.Element;
  // HTML canvas element, present inside the #game-canvas element
  private static canvas: HTMLCanvasElement;
  // The setInterval ID of the cycle method
  private static cycleInterval: NodeJS.Timeout;
  // Debug function, logs when this.debug is true
  private static debugLog = (...args: unknown[]) =>
    this.debug.log && console.log(...args);
  // Current room being executed by the cycle method
  private static currentRoom: Room;
  // Collection of spriteSets
  private static spriteSets: { [name: string]: SpriteSet };
  // True for logging to the console
  private static debug: Debug;
  // Screen width in pixels
  private static screenWidth: number;
  // Screen height in pixels
  private static screenHeight: number;

  public static getSpriteSets() {
    return this.spriteSets;
  }

  public static getCameraOffsetX() {
    return Camera.x - this.screenWidth / 2;
  }
  public static getCameraOffsetY() {
    return Camera.y - this.screenHeight / 2;
  }

  public static ctx: CanvasRenderingContext2D;

  public static getScreen() {
    return {
      width: this.screenWidth,
      height: this.screenHeight,
    };
  }

  public static getUI() {
    return this.UI;
  }

  public static setup(
    initialRoom: Room,
    spriteSets: { [name: string]: SpriteSet },
    config: GameConfig,
    uiComponent: JSX.Element,
    debug: Debug = {
      log: false,
      displayCollisionBoxes: false,
      displayPivots: false,
      displayDrawIndexes: false,
    }
  ) {
    // Sets up the GameInput class
    GameInput.setup();
    // Initializes the GameUI class
    GameUI.init(uiComponent);
    // Creates and configurates the canvas HTML element
    const {
      screenWidth,
      screenHeight,
      canvasElementId,
      canvasBackgroundColor,
    } = config;
    this.spriteSets = spriteSets;
    this.debug = debug;
    this.canvas = document.createElement("canvas");
    this.canvas.id = canvasElementId;
    this.canvas.width = this.screenWidth = screenWidth;
    this.canvas.height = this.screenHeight = screenHeight;
    this.canvas.style.background = canvasBackgroundColor;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    // Sets the initial room as current room
    this.setCurrentRoom(initialRoom);
    // Debug logs the spritesets
    this.debugLog("Game constructor: spriteSets", this.spriteSets);
    const self = this;
    // Adds the window resize event listener
    window.addEventListener("resize", () => {
      setTimeout(
        () => console.log("resizing", window.innerWidth, window.innerHeight),
        200
      );
      self.canvas.width = window.innerWidth;
      self.canvas.height = window.innerHeight;
    });
  }

  public static setCurrentRoom(room: Room | null) {
    // If a current room exists, execute its unmount method and removes its HTML element
    if (this.currentRoom) {
      this.currentRoom.onUnmount();
    }
    if (room) {
      // Sets the new room as current room
      this.currentRoom = room;
      // Executes the new current room's onInit method
      this.currentRoom.onInit();
      this.debugLog("Game constructor: room", this.currentRoom);
    }
  }

  private static cycle() {
    // **** PART 1: Execute entities' beforeRun methods ****

    this.debugLog("cycle", this.currentRoom.getEntities());
    this.currentRoom.getEntities().forEach((entity) => {
      entity.beforeRun && entity.beforeRun();
    });

    // Get context
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingEnabled = false;
    // Set context scale

    // **** PART 2: Resolve entities' movements ****

    this.currentRoom.getEntities().forEach((entity) => {
      (entity as Entity & Drawable).x += (entity as Entity & Drawable).xSpeed;
      (entity as Entity & Drawable).y += (entity as Entity & Drawable).ySpeed;
    });
    // Update camera
    Camera.updatePosition();

    // **** PART 3: Resolve entities' sprites ****

    // Sort entities
    const graphicEntities = this.currentRoom
      .getEntities()
      .filter((entity) => entity instanceof Drawable) as Drawable[];
    const sortedGraphicEntities = graphicEntities.sort(
      (entityA, entityB) => entityA.drawIndex - entityB.drawIndex
    );
    // For each sorted entity, render it
    sortedGraphicEntities.forEach((entity) => {
      const { sprite, x, y, flipX, flipY } = entity;
      let frame: Frame;
      let spriteSet: SpriteSet;
      let image: HTMLImageElement;

      // Render sprites
      if (sprite && entity.visible) {
        // Deal with static sprite
        if (sprite.type === "static") {
          const { frameName, spriteSetName } = sprite;
          spriteSet = this.spriteSets[spriteSetName];
          image = spriteSet.getImage();
          frame = spriteSet.getFrame(frameName);
        }
        // Deal with animated sprite
        else {
          sprite.animation._countFrame();
          const spriteSetName = sprite.animation.spriteSetName;
          spriteSet = this.spriteSets[spriteSetName];
          image = spriteSet.getImage();
          const frameName = sprite.animation.getCurrentFrameName();
          frame = spriteSet.getFrame(frameName);
        }
        // Save the original state of the context
        this.ctx.save();
        // Prepare the sprite frame to be rendered
        const sx = frame[0];
        const sy = frame[1];
        const sWidth = frame[2] - sx;
        const sHeight = frame[3] - sy;
        const dx = x - this.getCameraOffsetX();
        const dy = y - this.getCameraOffsetY();

        if (flipX) {
          this.ctx.translate(sWidth, 0);
          this.ctx.scale(-1, 1);
        }
        if (flipY) {
          this.ctx.translate(0, sHeight);
          this.ctx.scale(1, -1);
        }
        // Render the frame in the canvas context
        this.ctx.drawImage(
          image,
          sx,
          sy,
          sWidth,
          sHeight,
          flipX ? -dx : dx,
          flipY ? -dy : dy,
          sWidth,
          sHeight
        );

        this.ctx.restore();

        // Display entity drawIndex
        if (this.debug.displayDrawIndexes) {
          this.ctx.fillText(
            "d: " + Math.floor(entity.drawIndex).toString(),
            entity.x - this.getCameraOffsetX(),
            entity.y - (sHeight + 24) - this.getCameraOffsetY()
          );
          this.ctx.fillText(
            "y: " + Math.floor(entity.y).toString(),
            entity.x - this.getCameraOffsetX(),
            entity.y - (sHeight + 12) - this.getCameraOffsetY()
          );
          this.ctx.fillText(
            "p: " + Math.floor(entity.yPivot).toString(),

            entity.x - this.getCameraOffsetX(),
            entity.y - sHeight - this.getCameraOffsetY()
          );
        }
        // Draw green line to outline entity's frame
        if (this.debug.displayPivots) {
          this.ctx.lineWidth = 1;
          this.ctx.strokeStyle = "green";
          this.ctx.beginPath();
          this.ctx.moveTo(
            entity.x + sWidth - this.getCameraOffsetX(),
            entity.y + sHeight - this.getCameraOffsetY()
          );
          this.ctx.lineTo(
            entity.x - this.getCameraOffsetX(),
            entity.y + sHeight - this.getCameraOffsetY()
          );
          this.ctx.lineTo(
            entity.x - this.getCameraOffsetX(),
            entity.y - this.getCameraOffsetY()
          );
          this.ctx.lineTo(
            entity.x + sWidth - this.getCameraOffsetX(),
            entity.y - this.getCameraOffsetY()
          );
          this.ctx.lineTo(
            entity.x + sWidth - this.getCameraOffsetX(),
            entity.y + sHeight - this.getCameraOffsetY()
          );

          this.ctx.stroke();
        }
      }
    });

    // **** PART 4: Resolve entities' collisions ****

    const sortedColliderEntities = sortedGraphicEntities.filter(
      (entity) => entity instanceof Collider
    ) as Collider[];
    // Apply collison bodies transformations
    sortedColliderEntities.forEach((entity) => {
      // Update collision body position
      entity.body.setPosition(
        entity.x - this.getCameraOffsetX(),
        entity.y - this.getCameraOffsetY(),
        false
      );
      // Update collision body rotation
      entity.body.setAngle(entity.rotation, false);
      // Update collison body pivot
      entity.body.offset.x = entity.xPivot;
      entity.body.offset.y = entity.yPivot;
      // Apply final update
      entity.body.updateBody();
    });
    // Resolve collisions
    const self = this;
    this.currentRoom.getAllCollisionSystems().forEach((system) => {
      system.checkAll((response) => {
        const a = response.a as ColliderBody;
        const { overlapV } = response;
        a.setPosition(a.x - overlapV.x, a.y - overlapV.y);
      });
      if (this.debug.displayCollisionBoxes) {
        self.ctx.strokeStyle = "#FF0066";
        self.ctx.beginPath();
        system.draw(self.ctx);
        self.ctx.stroke();
      }
    });
    // Update entities' position based on collision bodies new position
    sortedColliderEntities.forEach((entity) => {
      entity.x = entity.body.x + this.getCameraOffsetX();
      entity.y = entity.body.y + this.getCameraOffsetY();
    });

    // **** PART 5: Execute entities' onRun methods ****

    this.currentRoom.getEntities().forEach((entity) => {
      entity.onRun && entity.onRun();
    });

    // **** PART 5: Execute entities' afterRun methods ****

    this.currentRoom.getEntities().forEach((entity) => {
      entity.afterRun && entity.afterRun();
    });

    // **** PART 6: Updates Time class ****
    //Time._update(CYCLES_MS);
    // Commented out due to not receiving parameters as expected ("this" context gets lost)
  }

  public static start() {
    const self = this;
    self.cycle();
    // Try to cycle at 60 fps
    this.cycleInterval = setInterval(function () {
      self.cycle();
    }, this.CYCLES_MS);
  }

  /* Exits the game */
  public static exit() {
    // Stops the cycle interval
    clearInterval(this.cycleInterval);
    // Sets out current room
    this.setCurrentRoom(null);
    // Removes the game canvas
    const gameCanvas = document.getElementById("game-canvas");
    if (gameCanvas) {
      gameCanvas.remove();
    }
  }
}
