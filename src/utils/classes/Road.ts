import { GAME_PREFERENCE } from "@/constants/settings";

export class Road {
    public points: { x: number; y: number }[];
    private width: number;
    private color: string;

    constructor(width: number = GAME_PREFERENCE.ROAD.WIDTH, color: string = GAME_PREFERENCE.ROAD.COLOR) { // Default width set to 10
        this.points = [];
        this.width = width;
        this.color = color;
    }

    addPoint(x: number, y: number) {
        this.points.push({ x, y });
    }

    getLastPoint() {
        return this.points[this.points.length - 1];
    }

    getSegments() {
        return this.points
            .map((_, i, arr) => (i > 0 ? [arr[i - 1], arr[i]] : null))
            .filter(Boolean) as [{ x: number; y: number }, { x: number; y: number }][];
    }

    setWidth(newWidth: number) {
        this.width = newWidth; // Allow changing the road width dynamically
    }

    getWidth(){
        return this.width;
    }

    getColor(){
        return this.color;
    }

    getOffsetPoint(index: number, offset: number) {
        if (this.points.length < 2) return this.points[index]; // No offset if not enough points
    
        let A, B;
    
        if (index === 0) {
            // Use first two points for direction
            A = this.points[0];
            B = this.points[1];
        } else {
            A = this.points[index - 1];
            B = this.points[index];
        }
    
        const dx = B.y - A.y;
        const dy = A.x - B.x;
        const length = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid division by zero
    
        return {
            x: B.x + (dx / length) * offset,
            y: B.y + (dy / length) * offset
        };
    }
    
    
}
