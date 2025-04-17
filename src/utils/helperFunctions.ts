export const generateCenteredSpiralMatrix = (n: number): number[][] => {
    if (n % 2 === 0) throw new Error("Matrix size must be odd");

    const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const center = Math.floor(n / 2);

    let x = center;
    let y = center;
    let num = 1;

    matrix[y][x] = num++;

    let step = 1;
    const directions = [
        [1, 0],   // → right
        [0, 1],   // ↓ down
        [-1, 0],  // ← left
        [0, -1],  // ↑ up
    ];

    while (num <= n * n) {
        for (let d = 0; d < 4; d++) {
            const [dx, dy] = directions[d];

            const moves = d % 2 === 0 ? step : step;

            for (let i = 0; i < moves; i++) {
                x += dx;
                y += dy;
                if (x >= 0 && x < n && y >= 0 && y < n) {
                    matrix[y][x] = num++;
                }
            }

            if (d === 1 || d === 3) step++; // increase steps after vertical moves
        }
    }

    return matrix;
}

export const getGridLayoutClassNames = (n: number): string => { 

    let className  = 'grid';
    let gridRowCols = 'grid-cols-3 grid-rows-3'

    switch(n){
        case 3:
            gridRowCols = 'grid-cols-3 grid-rows-3';
            break;
        case 5:
            gridRowCols = 'grid-cols-5 grid-rows-5';
            break;
        case 7:
            gridRowCols = 'grid-cols-7 grid-rows-7';
            break;
        case 9:
            gridRowCols = 'grid-cols-9 grid-rows-9';
            break;
        default:
            gridRowCols = 'grid-cols-3 grid-rows-3';
            break;
    }


    return className + ' ' + gridRowCols;

}
