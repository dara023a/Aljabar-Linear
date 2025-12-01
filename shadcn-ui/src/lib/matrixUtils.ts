export type Matrix = number[][];

export function createAugmentedMatrix(data: { distance: number; time: number; cost: number }[]): Matrix {
  return data.map(row => [1, row.distance, row.time, row.cost]);
}

export function copyMatrix(matrix: Matrix): Matrix {
  return matrix.map(row => [...row]);
}

export function formatNumber(num: number): string {
  return Math.abs(num) < 0.0001 ? '0' : num.toFixed(4);
}

export function matrixToString(matrix: Matrix): string {
  return matrix.map(row => 
    row.map(val => formatNumber(val).padStart(10)).join(' ')
  ).join('\n');
}

export function swapRows(matrix: Matrix, row1: number, row2: number): void {
  [matrix[row1], matrix[row2]] = [matrix[row2], matrix[row1]];
}

export function scaleRow(matrix: Matrix, row: number, scalar: number): void {
  for (let j = 0; j < matrix[row].length; j++) {
    matrix[row][j] *= scalar;
  }
}

export function addScaledRow(matrix: Matrix, targetRow: number, sourceRow: number, scalar: number): void {
  for (let j = 0; j < matrix[targetRow].length; j++) {
    matrix[targetRow][j] += matrix[sourceRow][j] * scalar;
  }
}

export function findPivotRow(matrix: Matrix, col: number, startRow: number): number {
  let maxRow = startRow;
  let maxVal = Math.abs(matrix[startRow][col]);
  
  for (let i = startRow + 1; i < matrix.length; i++) {
    const val = Math.abs(matrix[i][col]);
    if (val > maxVal) {
      maxVal = val;
      maxRow = i;
    }
  }
  
  return maxRow;
}