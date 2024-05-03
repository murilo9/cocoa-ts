## Classes & Interfaces

#### [Entity](./Entity.ts)

- \_id: string
- onInit()
- beforeRun()
- onRun()
- afterRun()

#### [Drawable](./Graphic.ts) (extends Entity)

- \_isGraphic: true
- x: number
- y: number
- xPivot: number
- yPivot: number
- rotation: number
- xSpeed: number
- ySpeed: number
- sprite: StaticSpriteConfig | AnimationSpriteConfig | null
- drawIndex: number
- xScale: number
- yScale: number
- visible: boolean

#### [StaticSpriteConfig](./Graphic.ts)

- type: "static"
- spriteSetName: string
- frameName: string

#### [AnimationSpriteConfig](./Graphic.ts)

- type: "animation"
- animation: Animation

#### Frame

- [sx: number, sy: numbe, tx: numbe, ty: number]

#### SpriteSet

- image: HTMLImageElement
- getImage(): Image
- getFrame(): Frame

## Game

In order to build a game:

1. Declare the spriteSets
2. Declare the initial room
3. Instantiate a new Game instance, passing the initialRoom, spriteSets and debug as parameters
4. Call the Game instance start method

### Game lifecycle

The _main.tsx_ file will render _App.tsx_, which will call your game's `init` function (and call your game's `exit` function once it unmounts).
Your game's init function should call Game's `setup` method passing the config, spritesets and rooms definitions, then call Game's `start` method.
The Game's `setup` method will initiate the canvas. The Game's `start` method will initialize the rendering cycles. The Game's `exit` method will stop the rendering cycle and make memory clearing operations (removing game's HTML elements).

#### Detailed lifecycle

The game will initiate the HTML canvas at the element with "game-canvas" id. Then the game instance start method will initialize all entities inside the initial room by calling their onInit methods. Finally the game instance will call its cycle method each 16 ms. The game instance exit method will clear the cycle interval, preventing the cycles from running.
Each game cycle will:

1. Execute all entities' beforeRun methods
2. Resolve dynamic entities (apply movements)
3. Draw graphic entities (sort entities by drawIndex, and draw their respective sprites or animations)
4. Resolve physic entities (resolve collisions)
5. Execute all entities' onRun methods
6. Execute all entities' afterRun methods

### How does UI work

Each room has a private `ui` property, which is a ReactNode. Once a room is set as Game's current room, a HTML element will be created in order to render the room's `ui`.
