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
    private storageKey: string; // Unique key for each canvas

    constructor(canvas: HTMLCanvasElement, storageKey: string) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.renderer = new Renderer(this.ctx);
        this.storageKey = storageKey; 
        this.initializeCanvas();
    }

    public initializeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 100;
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.loadFromLocalStorage();
        this.setupCanvas();
    }

    private setupCanvas() {
        this.ctx.imageSmoothingEnabled = false;
    }

    private loadFromLocalStorage() {
        const savedRoads = localStorage.getItem(this.storageKey);
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
        if (!this.ctx) return;
    
        this.isDrawing = true;
        this.currentRoad = new Road();
    
        const adjustedPoint = this.adjustForCenter(x, y);
    
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clip();
    
        this.currentRoad.addPoint(adjustedPoint.x, adjustedPoint.y);
    }

    public draw(x: number, y: number) {
        if (!this.isDrawing || !this.currentRoad) return;
    
        const prevPoint = this.currentRoad.getLastPoint();
        const adjustedPoint = this.adjustForCenter(x, y);
    
        // Restrict drawing within canvas bounds
        adjustedPoint.x = Math.max(0, Math.min(this.canvas.width, adjustedPoint.x));
        adjustedPoint.y = Math.max(0, Math.min(this.canvas.height, adjustedPoint.y));

        // let intersectionPoint: { x: number; y: number } | null = null;
    
        // for (let road of [...this.roads, this.currentRoad]) {
        //     for (let [A, B] of road.getSegments()) {
        //         const intersection = IntersectionDetector.getIntersection(prevPoint, adjustedPoint, A, B);
        //         if (intersection) {
        //             intersectionPoint = intersection;
        //             break;
        //         }
        //     }
        //     if (intersectionPoint) break;
        // }
    
        // if (intersectionPoint) {
        //     this.currentRoad.addPoint(intersectionPoint.x, intersectionPoint.y);
        //     this.markIntersection(intersectionPoint);
        //     this.stopDrawing();
        //     return;
        // }
    
        this.currentRoad.addPoint(adjustedPoint.x, adjustedPoint.y);
        this.renderer.drawRoad(this.currentRoad);
    }

    public stopDrawing() {
        if (this.currentRoad && this.currentRoad.points.length > 1) {
            this.detectSelfMerges(this.currentRoad);
            this.roads.push(this.currentRoad);
        }
        this.isDrawing = false;
        this.currentRoad = null;
    
        this.ctx.restore();
        this.saveToLocalStorage();
    }

    private detectSelfMerges(road: Road) {
        // const points = road.points;
        // for (let i = 0; i < points.length - 1; i++) {
        //     for (let j = i + 2; j < points.length - 1; j++) {
        //         const intersection = IntersectionDetector.getIntersection(points[i], points[i + 1], points[j], points[j + 1]);
        //         if (intersection) {
        //             this.markIntersection(intersection);
        //             return;
        //         }
        //     }
        // }
    }

    private markIntersection(point: { x: number; y: number }) {
        // this.ctx.fillStyle = "blue";
        // this.ctx.beginPath();
        // this.ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        // this.ctx.fill();
    }

    private redraw() {
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        this.roads.forEach(road => this.renderer.drawRoad(road));
    }

    private saveToLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.roads.map(road => road.points)));
    }

    public clearCanvas() {
        this.roads = [];
        this.renderer.clearCanvas(GAME_PREFERENCE.CANVAS.BACKGROUND, this.canvas.width, this.canvas.height);
        localStorage.removeItem(this.storageKey);
    }

    private adjustForCenter(x: number, y: number) {
        const roadWidth = GAME_PREFERENCE.ROAD.WIDTH / 2;

        return {
            x: x ,
            y: y - roadWidth,
        };
    }
}
