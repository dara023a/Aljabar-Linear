import { Matrix, copyMatrix, swapRows, scaleRow, addScaledRow, findPivotRow, formatNumber } from './matrixUtils';

export interface GaussJordanStep {
  description: string;
  matrix: Matrix;
  stepNumber: number;
}

export interface GaussJordanResult {
  solution: number[];
  matrix: Matrix;
  steps: GaussJordanStep[];
}

export function gaussJordanElimination(inputMatrix: Matrix): GaussJordanResult {
  const matrix = copyMatrix(inputMatrix);
  const n = matrix.length;
  const steps: GaussJordanStep[] = [];
  let stepNumber = 0;

  steps.push({
    stepNumber: stepNumber++,
    description: 'Matriks augmented awal',
    matrix: copyMatrix(matrix)
  });
  
  // Forward elimination and normalization
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
    
    // Normalize pivot row
    const pivot = matrix[i][i];
    scaleRow(matrix, i, 1 / pivot);
    steps.push({
      stepNumber: stepNumber++,
      description: `Normalisasi baris ${i + 1}: Baris ${i + 1} = Baris ${i + 1} ÷ ${formatNumber(pivot)} (membuat pivot = 1)`,
      matrix: copyMatrix(matrix)
    });
    
    // Eliminate column (both above and below)
    for (let j = 0; j < n; j++) {
      if (j !== i && Math.abs(matrix[j][i]) > 1e-10) {
        const factor = -matrix[j][i];
        addScaledRow(matrix, j, i, factor);
        
        const direction = j < i ? 'atas' : 'bawah';
        steps.push({
          stepNumber: stepNumber++,
          description: `Eliminasi ${direction} baris ${j + 1}: Baris ${j + 1} = Baris ${j + 1} + (${formatNumber(factor)}) × Baris ${i + 1}`,
          matrix: copyMatrix(matrix)
        });
      }
    }
    
    steps.push({
      stepNumber: stepNumber++,
      description: `Kolom ${i + 1} selesai dieliminasi (pivot = 1, elemen lain = 0)`,
      matrix: copyMatrix(matrix)
    });
  }
  
  steps.push({
    stepNumber: stepNumber++,
    description: 'Matriks dalam bentuk identitas tereduksi (Reduced Row Echelon Form)',
    matrix: copyMatrix(matrix)
  });
  
  // Extract solution from the last column
  const solution: number[] = matrix.map(row => row[n]);
  
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