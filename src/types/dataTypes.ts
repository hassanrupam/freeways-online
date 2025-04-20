import { CollisionBox } from "@/utils/classes/CollisionBox";

export type Coordinate = {
    x: number;
    y: number;
};

export type CoordinateGroup = Coordinate[];

export type LevelWiseRoadData = {
    levelStoreKey: string;
    roadCoordinates: CoordinateGroup[];
}

export type LevelWiseCollisionBoxData = {
    level: number;
    collisionBoxes: CollisionBox[]
}

