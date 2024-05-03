import { System } from "detect-collisions";
import { Entity } from "./Entity";
import { v4 as uuid } from "uuid";
import { Collider } from "./Collider";
import { ReactNode, useEffect } from "react";

export function wrapRoom(room: Room) {}

/**
 * Wraps a Room's UI so it
 */
export function RoomUIWrapper(props: { children?: ReactNode }) {
  useEffect(() => {
    return;
  }, []);

  return <>{props.children}</>;
}

export class Room {
  private entities: Entity[];
  private collisionSystems: {
    [name: string]: System;
  };
  private ui: JSX.Element;

  constructor(
    collisionSystems: {
      [name: string]: System;
    } = {},
    ui: JSX.Element
  ) {
    this.entities = [];
    this.collisionSystems = collisionSystems;
    this.ui = ui;
  }

  /* Called just before room is set as Game's current room */
  public onInit() {}

  /* Called just before room is set out as Game's current room */
  public onUnmount() {}

  public getUi() {
    return this.ui;
  }

  public getEntities() {
    return this.entities;
  }

  public getCollisionSystem(name: string): System | undefined {
    return this.collisionSystems[name];
  }

  public getAllCollisionSystems(): System[] {
    return Object.values(this.collisionSystems);
  }

  appendEntities(entities: Entity[], collisionSystemName?: string) {
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
    return this;
  }
}
