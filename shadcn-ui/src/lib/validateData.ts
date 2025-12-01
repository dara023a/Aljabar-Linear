export interface DataRow {
  distance: number;
  time: number;
  cost: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateDataRow(row: DataRow): string[] {
  const errors: string[] = [];
  
  if (isNaN(row.distance) || row.distance < 0) {
    errors.push('Jarak harus berupa angka positif');
  }
  
  if (isNaN(row.time) || row.time < 0) {
    errors.push('Waktu harus berupa angka positif');
  }
  
  if (isNaN(row.cost) || row.cost < 0) {
    errors.push('Biaya harus berupa angka positif');
  }
  
  return errors;
}

export function validateAllData(data: DataRow[]): ValidationResult {
  const errors: string[] = [];
  
  if (data.length < 3) {
    errors.push('Minimal 3 baris data diperlukan untuk perhitungan SPL');
    return { isValid: false, errors };
  }
  
  data.forEach((row, index) => {
    const rowErrors = validateDataRow(row);
    if (rowErrors.length > 0) {
      errors.push(`Baris ${index + 1}: ${rowErrors.join(', ')}`);
    }
  });
  
  // Check for duplicate data
  const seen = new Set<string>();
  data.forEach((row, index) => {
    const key = `${row.distance}-${row.time}`;
    if (seen.has(key)) {
      errors.push(`Baris ${index + 1}: Data duplikat (jarak dan waktu sama dengan baris lain)`);
    }
    seen.add(key);
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getDummyData(): DataRow[] {
  return [
    { distance: 5, time: 15, cost: 29500 },
    { distance: 10, time: 25, cost: 49500 },
    { distance: 2, time: 10, cost: 18000 }
  ];
}