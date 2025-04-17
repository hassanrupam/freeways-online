import { GAME_PREFERENCE } from "@/constants/settings";
import { Road } from "./Road";

export class LaneMarker {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    drawLaneMarkings(road: Road) {
        if (road.points.length < 2) return;

        const dashLength = GAME_PREFERENCE.ROAD.MARKING.LENGTH;
        const gapLength = GAME_PREFERENCE.ROAD.MARKING.GAP;
        const totalCycleLength = dashLength + gapLength;
        const minStartDistance = 3 * dashLength; // First dash starts after 3 dashes

        let totalRoadDistance = 0;
        let segmentStartDistances: number[] = [0];

        // Calculate total road length and segment start distances
        for (let i = 0; i < road.points.length - 1; i++) {
            const start = road.points[i];
            const end = road.points[i + 1];

            totalRoadDistance += Math.sqrt(
                Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
            );
            segmentStartDistances.push(totalRoadDistance);
        }

        // If road is too short, don't draw markings
        if (totalRoadDistance < minStartDistance) return;

        // Start after 3 dash lengths
        for (let distanceCovered = minStartDistance; distanceCovered + dashLength <= totalRoadDistance; distanceCovered += totalCycleLength) {
            let { point, angle } = this.getPointAtDistance(road, segmentStartDistances, distanceCovered);
            this.drawDash(point.x, point.y, angle, dashLength);
        }
    }

    private getPointAtDistance(road: Road, segmentStartDistances: number[], targetDistance: number) {
        for (let i = 0; i < road.points.length - 1; i++) {
            if (targetDistance < segmentStartDistances[i + 1]) {
                const start = road.points[i];
                const end = road.points[i + 1];

                const segmentDistance = segmentStartDistances[i + 1] - segmentStartDistances[i];
                const t = (targetDistance - segmentStartDistances[i]) / segmentDistance;

                const x = start.x + (end.x - start.x) * t;
                const y = start.y + (end.y - start.y) * t;
                const angle = Math.atan2(end.y - start.y, end.x - start.x);

                return { point: { x, y }, angle };
            }
        }
        return { point: road.points[road.points.length - 1], angle: 0 };
    }

    private drawDash(x: number, y: number, angle: number, dashLength: number) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        this.ctx.strokeStyle = GAME_PREFERENCE.ROAD.MARKING.COLOR;
        this.ctx.lineWidth = GAME_PREFERENCE.ROAD.MARKING.WIDTH;
        this.ctx.setLineDash([]); // Solid dashes

        this.ctx.beginPath();
        this.ctx.moveTo(-dashLength / 2, 0);
        this.ctx.lineTo(dashLength / 2, 0);
        this.ctx.stroke();

        this.ctx.restore();
    }
}
