import { LaneMarker } from "./LaneMarker"; // Updated import
import { Road } from "./Road";

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private laneMarker: LaneMarker; // Changed from ArrowMarker

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.laneMarker = new LaneMarker(ctx); // Changed from ArrowMarker
    }

    drawRoad(road: Road) {
        if (road.points.length < 2) return;
    
        const width = road.getWidth() / 2; // Half-width for left & right edges
    
        this.ctx.fillStyle = road.getColor(); // Set road color
        this.ctx.beginPath();
    
        // Create left boundary
        for (let i = 0; i < road.points.length; i++) {
            const { x, y } = road.getOffsetPoint(i, -width); // Left offset
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
    
        // Create right boundary (reverse order for closing shape)
        for (let i = road.points.length - 1; i >= 0; i--) {
            const { x, y } = road.getOffsetPoint(i, width); // Right offset
            this.ctx.lineTo(x, y);
        }
    
        this.ctx.closePath(); // Ensure the road is closed
        this.ctx.fill(); // Fill road area

        this.laneMarker.drawLaneMarkings(road); // Use lane markings instead of arrows
    }
    
    clearCanvas(color: string, width: number, height: number) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, width, height);
    }
}
