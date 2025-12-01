import { Matrix, copyMatrix, swapRows, scaleRow, addScaledRow, findPivotRow, formatNumber } from './matrixUtils';

export interface GaussStep {
  description: string;
  matrix: Matrix;
  stepNumber: number;
}

export interface GaussResult {
  solution: number[];
  matrix: Matrix;
  steps: GaussStep[];
}

export function gaussElimination(inputMatrix: Matrix): GaussResult {
  const matrix = copyMatrix(inputMatrix);
  const n = matrix.length;
  const steps: GaussStep[] = [];
  let stepNumber = 0;

  steps.push({
    stepNumber: stepNumber++,
    description: 'Matriks augmented awal',
    matrix: copyMatrix(matrix)
  });
  
  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    const pivotRow = findPivotRow(matrix, i, i);
    
    if (Math.abs(matrix[pivotRow][i]) < 1e-10) {
      throw new Error('Sistem tidak memiliki solusi unik (matriks singular)');
    }
    
    // Swap rows if needed
    if (pivotRow !== i) {
      swapRows(matrix, i, pivotRow);
      steps.push({
        stepNumber: stepNumber++,
        description: `Tukar baris ${i + 1} dengan baris ${pivotRow + 1} untuk mendapatkan pivot terbesar`,
        matrix: copyMatrix(matrix)
      });
    }
    
    // Eliminate below
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matrix[j][i]) > 1e-10) {
        const factor = -matrix[j][i] / matrix[i][i];
        addScaledRow(matrix, j, i, factor);
        
        steps.push({
          stepNumber: stepNumber++,
          description: `Eliminasi baris ${j + 1}: Baris ${j + 1} = Baris ${j + 1} + (${formatNumber(factor)}) × Baris ${i + 1}`,
          matrix: copyMatrix(matrix)
        });
      }
    }
  }
  
  steps.push({
    stepNumber: stepNumber++,
    description: 'Matriks dalam bentuk segitiga atas (Forward Elimination selesai)',
    matrix: copyMatrix(matrix)
  });
  
  // Back substitution
  const solution: number[] = new Array(n);
  
  for (let i = n - 1; i >= 0; i--) {
    let sum = matrix[i][n];
    
    for (let j = i + 1; j < n; j++) {
      sum -= matrix[i][j] * solution[j];
    }
    
    solution[i] = sum / matrix[i][i];
    
    if (i > 0) {
      steps.push({
        stepNumber: stepNumber++,
        description: `Substitusi mundur: x${i + 1} = ${formatNumber(solution[i])}`,
        matrix: copyMatrix(matrix)
      });
    }
  }
  
  steps.push({
    stepNumber: stepNumber++,
    description: `Solusi akhir: x1 = ${formatNumber(solution[0])}, x2 = ${formatNumber(solution[1])}, x3 = ${formatNumber(solution[2])}`,
    matrix: copyMatrix(matrix)
  });
  
  return {
    solution,
    matrix,
    steps
  };
}