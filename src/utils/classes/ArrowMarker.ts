import { GAME_PREFERENCE } from "@/constants/settings";
import { Road } from "./Road";

export class ArrowMarker {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    drawArrowhead(x: number, y: number, angle: number) {
        const arrowSize = GAME_PREFERENCE.ROAD.MARKING.WIDTH;

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-arrowSize, -arrowSize / 2);
        this.ctx.lineTo(-arrowSize, arrowSize / 2);
        this.ctx.closePath();

        this.ctx.fillStyle = GAME_PREFERENCE.ROAD.MARKING.COLOR;
        this.ctx.fill();
        this.ctx.restore();
    }

    drawArrows(road: Road) {
        if (road.points.length < 2) return;

        const arrowSpacing = GAME_PREFERENCE.ROAD.MARKING.DISTANCE;
        let accumulatedDistance = 0;

        for (let i = 1; i < road.points.length; i++) {
            const start = road.points[i - 1];
            const end = road.points[i];

            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const segmentDistance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            accumulatedDistance += segmentDistance;

            while (accumulatedDistance >= arrowSpacing) {
                accumulatedDistance -= arrowSpacing;

                const t = 1 - accumulatedDistance / segmentDistance;
                const x = start.x + dx * t;
                const y = start.y + dy * t;

                this.drawArrowhead(x, y, angle);
            }
        }
    }
}
