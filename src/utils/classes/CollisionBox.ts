import { GAME_PREFERENCE } from "@/constants/settings";

export class CollisionBox {
    public locationX: number | 'left' | 'right' | 'center';
    public locationY: number | 'bottom' | 'top'| 'center';
    public size: number;
    public color: string; 
    public locationXNumber: number;
    public locationYNumber: number;

    constructor(locationX:number | 'left' | 'right' | 'center' = 'left' ,locationY:number | 'bottom' | 'top' | 'center' = 'top',size: number = GAME_PREFERENCE.COLLISION_BOX.SIZE, color: string = GAME_PREFERENCE.COLLISION_BOX.COLOR) { // Default width set to 10
        this.locationX = locationX;
        this.locationXNumber = (locationX === 'left' || locationX === 'right'|| locationX === 'center') ? 0 : locationX;
        this.locationY = locationY;
        this.locationYNumber = (locationY === 'top' || locationY === 'bottom'|| locationY === 'center') ? 0: locationY;
        this.size = size;
        this.color = color;
    }  
}
