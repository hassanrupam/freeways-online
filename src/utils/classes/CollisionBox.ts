import { GAME_PREFERENCE } from "@/constants/settings";

export class CollisionBox {
    public locationX: number | 'left' | 'right';
    public locationY: number | 'bottom' | 'top';
    public size: number;
    public color: string;
    public locationXNumber: number;
    public locationYNumber: number;

    constructor(locationX:number | 'left' | 'right' = 'left' ,locationY:number | 'bottom' | 'top' = 'top',size: number = GAME_PREFERENCE.COLLISION_BOX.SIZE, color: string = GAME_PREFERENCE.COLLISION_BOX.COLOR) { // Default width set to 10
        this.locationX = locationX;
        this.locationXNumber = (locationX === 'left') ? 0 : (locationX === 'right') ? 0 : locationX;
        this.locationY = locationY;
        this.locationYNumber = (locationY === 'bottom') ? 0 : (locationY === 'top') ? 0 : locationY;
        this.size = size;
        this.color = color;
    }  
}
