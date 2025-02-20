import { GAME_PREFERENCE } from "@/constants/settings";
import { Road } from "./classes/Road";
import { IntersectionDetector } from "./classes/IntersectionDetector";
import { Renderer } from "./classes/Renderer";

export class CanvasManager {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private roads: Road[] = [];
    private currentRoad: Road | null = null;
    private renderer: Renderer;
    private scaleFactor: number = 1;  // Zoom level
    private offsetX: number = 0;  // Pan X
    private offsetY: number = 0;  // Pan Y

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.renderer = new Renderer(this.ctx);
        this.initializeCanvas();
    }

    public initializeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.loadFromLocalStorage();
        this.setupCanvas();
    }

    private setupCanvas() {
        this.ctx.imageSmoothingEnabled = false;
    }

    public zoomCanvas(scale: number) {
        this.scaleFactor *= scale;
        this.applyTransformations();
    }

    public panCanvas(dx: number, dy: number) {
        this.offsetX += dx;
        this.offsetY += dy;
        this.applyTransformations();
    }

    private applyTransformations() {
        this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.offsetX, this.offsetY);
        this.redraw();
    }

    private loadFromLocalStorage() {
        const savedRoads = localStorage.getItem("roads");
        if (savedRoads) {
            this.roads = JSON.parse(savedRoads).map((roadData: { x: number; y: number }[]) => {
                const road = new Road();
                roadData.forEach(({ x, y }) => road.addPoint(x, y));
                return road;
            });
            this.redraw();
        }
    }

    public startDrawing(x: number, y: number) {
        this.isDrawing = true;
        this.currentRoad = new Road();
        const { x: canvasX, y: canvasY } = this.screenToCanvas(x, y);
        this.currentRoad.addPoint(canvasX, canvasY);
    }

    public draw(x: number, y: number) {
        if (!this.isDrawing || !this.currentRoad) return;

        const prevPoint = this.currentRoad.getLastPoint();
        const { x: canvasX, y: canvasY } = this.screenToCanvas(x, y);

        let intersectionPoint: { x: number; y: number } | null = null;

        for (let road of [...this.roads, this.currentRoad]) {
            for (let [A, B] of road.getSegments()) {
                const intersection = IntersectionDetector.getIntersection(prevPoint, { x: canvasX, y: canvasY }, A, B);
                if (intersection) {
                    intersectionPoint = intersection;
                    break;
                }
            }
            if (intersectionPoint) break;
        }

        if (intersectionPoint) {
            this.currentRoad.addPoint(intersectionPoint.x, intersectionPoint.y);
            this.stopDrawing();
            return;
        }

        this.currentRoad.addPoint(canvasX, canvasY);
        this.renderer.drawRoad(this.currentRoad);
    }

    public stopDrawing() {
        if (this.currentRoad && this.currentRoad.points.length > 1) {
            this.roads.push(this.currentRoad);
        }
        this.isDrawing = false;
        this.currentRoad = null;
        this.saveToLocalStorage();
    }

    private redraw() {
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.roads.forEach(road => this.renderer.drawRoad(road));
    }

    private saveToLocalStorage() {
        localStorage.setItem("roads", JSON.stringify(this.roads.map(road => road.points)));
    }

    public clearCanvas() {
        this.roads = [];
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        localStorage.removeItem("roads");
    }

    private screenToCanvas(x: number, y: number) {
        return {
            x: (x - this.offsetX) / this.scaleFactor,
            y: (y - this.offsetY) / this.scaleFactor,
        };
    }
}