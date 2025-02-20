export class IntersectionDetector {
    static getIntersection(A: { x: number; y: number }, B: { x: number; y: number }, C: { x: number; y: number }, D: { x: number; y: number }) {
        const denominator = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
        if (denominator === 0) return null;

        const t = ((A.x - C.x) * (D.y - C.y) - (A.y - C.y) * (D.x - C.x)) / denominator;
        const u = -((B.x - A.x) * (A.y - C.y) - (B.y - A.y) * (A.x - C.x)) / denominator;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return { x: A.x + t * (B.x - A.x), y: A.y + t * (B.y - A.y) };
        }

        return null;
    }
}
