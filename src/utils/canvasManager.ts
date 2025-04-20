import { GAME_PREFERENCE } from "@/constants/settings";
import { Road } from "./classes/Road";
import { Renderer } from "./classes/Renderer";
import { clearLevelRoadByKey, setLevelWiseRoadSlice } from "@/store/slices/levelWiseRoadSlice";
import { CoordinateGroup, LevelWiseRoadData } from "@/types/dataTypes";
import { CollisionBox } from "./classes/CollisionBox";

export class CanvasManager {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private roads: Road[] = [];
    private currentRoad: Road | null = null;
    private renderer: Renderer;
    private storageKey: string; // Unique key for each canvas
    private dispatch: any; // Redux dispatch function
    private roadCoordinates: CoordinateGroup[]; // Array to hold road coordinates
    private collisionBoxes: CollisionBox[] = []; // Array to hold collision boxes

    constructor(canvas: HTMLCanvasElement, storageKey: string, dispatch: any,
        roadCoordinates: CoordinateGroup[], collisionBoxes: CollisionBox[]) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.renderer = new Renderer(this.ctx);
        this.storageKey = storageKey;
        this.dispatch = dispatch;
        this.roadCoordinates = roadCoordinates;
        this.collisionBoxes = collisionBoxes;
        this.initializeCanvas();
    }

    public initializeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 100;
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.setupCanvas();
        this.loadFromLocalStorage();


    }

    getCanvasY() {
        return this.canvas.height;
    }

    private setupCanvas() {
        this.ctx.imageSmoothingEnabled = false;
        this.initializeCollisionBoxes();
    }

    private initializeCollisionBoxes() {
        if (this.collisionBoxes && this.collisionBoxes.length > 0) {
            this.collisionBoxes.forEach((box) => {
                this.drawBox(box)
            })
        }
    }

    private loadFromLocalStorage() {
        const savedRoads = this.roadCoordinates;
        if (savedRoads) {
            this.roads = savedRoads.map((roadData: { x: number; y: number }[]) => {
                const road = new Road();
                roadData.forEach(({ x, y }) => road.addPoint(x, y));
                return road;
            });
            this.redraw();
        }
    }

    /** replace all collision boxes and fully redraw everything */
    public updateCollisionBoxes(boxes: CollisionBox[]) {
        this.collisionBoxes = boxes;
        // clear everything
        this.renderer.clearCanvas(
            GAME_PREFERENCE.CANVAS.BACKGROUND,
            this.canvas.width,
            this.canvas.height
        );
        // redraw existing roads
        this.roads.forEach(r => this.renderer.drawRoad(r));
        // redraw boxes on top
        this.initializeCollisionBoxes();
    }
  

    public startDrawing(x: number, y: number) {
        if (!this.ctx) return;

        this.isDrawing = true;
        this.currentRoad = new Road();

        const adjustedPoint = this.adjustForCenter(x, y);

        // 2) if that point lies inside any collision box, snap it to that box’s edge
        const hitBox = this.collisionBoxes.find(box =>
            this.isPointInsideBox(
                { x: adjustedPoint.x, y: adjustedPoint.y },
                this.parseCollisionBoxLocationX(box),
                this.parseCollisionBoxLocationY(box),
                this.parseCollisionBoxLocationX(box) + box.size,
                this.parseCollisionBoxLocationY(box) + box.size
            )
        );
        if (hitBox) {
            const snapped = this.getClosestEdgePoint(hitBox, { x: adjustedPoint.x, y: adjustedPoint.y });
            adjustedPoint.x = snapped.x;
            adjustedPoint.y = snapped.y;
        }

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clip();

        this.currentRoad.addPoint(adjustedPoint.x, adjustedPoint.y);
    }

    private getClosestEdgePoint(box: CollisionBox, pt: { x: number; y: number }) {
        const left = this.parseCollisionBoxLocationX(box);
        const top = this.parseCollisionBoxLocationY(box);
        const size = box.size;
        const right = left + size;
        const bottom = top + size;

        // candidate points on each side:
        const candidates = [
            { x: left, y: Math.min(Math.max(pt.y, top), bottom) },   // left edge
            { x: right, y: Math.min(Math.max(pt.y, top), bottom) },   // right edge
            { x: Math.min(Math.max(pt.x, left), right), y: top },     // top edge
            { x: Math.min(Math.max(pt.x, left), right), y: bottom }   // bottom edge
        ];
        // pick the one with minimal Euclidean distance
        return candidates.reduce((best, cand) => {
            const dab = (cand.x - pt.x) ** 2 + (cand.y - pt.y) ** 2;
            const dbb = (best.x - pt.x) ** 2 + (best.y - pt.y) ** 2;
            return dab < dbb ? cand : best;
        }, candidates[0]);
    }

    public draw(x: number, y: number) {
        if (!this.isDrawing || !this.currentRoad) return;

        const prevPoint = this.currentRoad.getLastPoint();
        const adjustedPoint = this.adjustForCenter(x, y);

        // Restrict drawing within canvas bounds
        adjustedPoint.x = Math.max(0, Math.min(this.canvas.width, adjustedPoint.x));
        adjustedPoint.y = Math.max(0, Math.min(this.canvas.height, adjustedPoint.y));

        // this.currentRoad.addPoint(adjustedPoint.x, adjustedPoint.y);
        // this.renderer.drawRoad(this.currentRoad);
        // Check for collision with collision boxes along the segment from prevPoint to adjustedPoint
        let newPoint = adjustedPoint;
        let closestIntersection: { x: number, y: number } | null = null;
        let minDistance = Infinity;

        this.collisionBoxes.forEach(box => {
            const boxLeft = this.parseCollisionBoxLocationX(box);
            const boxTop = this.parseCollisionBoxLocationY(box);
            const boxRight = boxLeft + box.size;
            const boxBottom = boxTop + box.size;

            // Check each edge of the collision box
            const edges = [
                { start: { x: boxLeft, y: boxTop }, end: { x: boxRight, y: boxTop } },    // Top edge
                { start: { x: boxRight, y: boxTop }, end: { x: boxRight, y: boxBottom } }, // Right edge
                { start: { x: boxLeft, y: boxBottom }, end: { x: boxRight, y: boxBottom } }, // Bottom edge
                { start: { x: boxLeft, y: boxTop }, end: { x: boxLeft, y: boxBottom } },   // Left edge
            ];

            edges.forEach(edge => {
                const intersect = this.getLineSegmentIntersection(
                    prevPoint,
                    adjustedPoint,
                    edge.start,
                    edge.end
                );
                if (intersect) {
                    // Calculate distance from previous point to intersection
                    const dx = intersect.x - prevPoint.x;
                    const dy = intersect.y - prevPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIntersection = intersect;
                    }
                }
            });
        });

        // Use the closest intersection point as the new point if found
        if (closestIntersection) {
            newPoint = closestIntersection;
        }

        // Prevent adding duplicate points
        if (
            this.currentRoad.points.length === 0 ||
            (newPoint.x !== prevPoint.x || newPoint.y !== prevPoint.y)
        ) {
            this.currentRoad.addPoint(newPoint.x, newPoint.y);
            this.renderer.drawRoad(this.currentRoad);
        }

    }

    public stopDrawing() {
        if (this.currentRoad && this.currentRoad.points.length > 1) {
            // this.detectSelfMerges(this.currentRoad);
            this.roads.push(this.currentRoad);
        }
        this.isDrawing = false;
        this.currentRoad = null;

        this.ctx.restore();
        this.saveToLocalStorage();
    }

    private markIntersection(point: { x: number; y: number }) {
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private redraw() {
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.initializeCollisionBoxes();
        this.roads.forEach(road => this.renderer.drawRoad(road));
    }

    private saveToLocalStorage() {
        const data: LevelWiseRoadData = {
            levelStoreKey: this.storageKey,
            roadCoordinates: this.roads.map(road => road.points),
        }
        this.dispatch(setLevelWiseRoadSlice(data));
    }

    public clearCanvas() {
        this.roads = [];
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.dispatch(clearLevelRoadByKey(this.storageKey));
        this.initializeCollisionBoxes();
    }

    private adjustForCenter(x: number, y: number) {
        const roadWidth = GAME_PREFERENCE.ROAD.WIDTH / 2;

        return {
            x: x,
            y: y - roadWidth,
        };
    }

    private drawBox(box: CollisionBox) {
        if (!this.ctx) return;
        this.ctx.fillStyle = box.color;
        this.ctx.fillRect(this.parseCollisionBoxLocationX(box), this.parseCollisionBoxLocationY(box),
            box.size, box.size);
    }

    private parseCollisionBoxLocationX(box: CollisionBox) {
        return box.locationX === 'right' ? this.canvas.width - box.size :
            box.locationX === 'left' ? 0 : box.locationXNumber;
    }

    private parseCollisionBoxLocationY(box: CollisionBox) {
        return box.locationY === 'bottom' ? this.canvas.height - box.size :
            box.locationY === 'top' ? 0 : box.locationYNumber
    }


    private isPointInsideBox(point: { x: number; y: number }, boxLeft: number, boxTop: number, boxRight: number, boxBottom: number): boolean {
        return point.x >= boxLeft && point.x <= boxRight && point.y >= boxTop && point.y <= boxBottom;
    }

    private getLineSegmentIntersection(
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        p3: { x: number; y: number },
        p4: { x: number; y: number }
    ): { x: number; y: number } | null {
        const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
        if (denominator === 0) return null; // Lines are parallel

        const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
        const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            return {
                x: p1.x + ua * (p2.x - p1.x),
                y: p1.y + ua * (p2.y - p1.y),
            };
        }
        return null;
    }

}
