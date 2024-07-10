import { System } from "detect-collisions";
import { Entity } from "./Entity";
import { v4 as uuid } from "uuid";
import { Collider } from "./Collider";
import { Drawable } from "./Graphic";
import { Game } from "./Game";

export class Room {
  protected entities: Entity[];
  protected collisionSystems: {
    [name: string]: System;
  };

  constructor() {
    this.entities = [];
    this.collisionSystems = {};
  }

  /* Called just before room is set as Game's current room */
  public onInit() {}

  /* Called just before room is set out as Game's current room */
  public onUnmount() {}

  public getEntities() {
    return this.entities;
  }

  public getCollisionSystem(name: string): System | undefined {
    return this.collisionSystems[name];
  }

  public getAllCollisionSystems(): System[] {
    return Object.values(this.collisionSystems);
  }

  public appendEntities(entities: Entity[], collisionSystemName?: string) {
    entities.forEach((entity) => {
      entity._id = uuid();
      entity.onInit();
      this.entities.push(entity);
      // If entity is a collider, also inserts it into the collision system
      if (entity instanceof Collider && collisionSystemName) {
        const collisionSystem = this.collisionSystems[collisionSystemName];
        if (collisionSystem) {
          collisionSystem.insert(entity.body);
        }
      }
    });
  }

  public appendEntitiesFromMap(
    gridData: {
      sizeX: number;
      sizeY: number;
      xInitialPos?: number;
      yInitialPos?: number;
    },
    entityMap: Array<typeof Drawable>,
    map: Array<Array<number>>,
    collisionSystemName?: string
  ) {
    const filledMap: Drawable[] = [];
    const xInitialPos =
      gridData.xInitialPos === undefined ? 0 : gridData.xInitialPos;
    const yInitialPos =
      gridData.yInitialPos === undefined ? 0 : gridData.yInitialPos;
    for (const [rowIndex, row] of map.entries()) {
      for (const [columnIndex, entityIndex] of row.entries()) {
        const entityClass = entityMap[entityIndex - 1];
        if (entityClass) {
          filledMap.push(
            new entityClass({
              x:
                gridData.sizeX *
                (columnIndex + xInitialPos) *
                Game.RENDER_SCALE,
              y: gridData.sizeY * (rowIndex + yInitialPos) * Game.RENDER_SCALE,
            })
          );
        }
      }
    }
    // Finally, appends the entities from the map in the room
    this.appendEntities(filledMap, collisionSystemName);
  }
}
