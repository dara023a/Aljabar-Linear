import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DataRow } from '@/lib/validateData';
import { createAugmentedMatrix } from '@/lib/matrixUtils';
import { gaussElimination } from '@/lib/gauss';
import GraphSection from '@/components/GraphSection';
import { toast } from 'sonner';

export default function Visual() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataRow[]>([]);
  const [solution, setSolution] = useState<number[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('splData');
    
    if (!storedData) {
      toast.error('Tidak ada data. Silakan input data terlebih dahulu.');
      navigate('/input');
      return;
    }

    try {
      const parsedData: DataRow[] = JSON.parse(storedData);
      setData(parsedData);

      const matrix = createAugmentedMatrix(parsedData);
      const result = gaussElimination(matrix);
      setSolution(result.solution);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan dalam memuat data';
      toast.error(errorMessage);
      navigate('/input');
    }
  }, [navigate]);

  if (data.length === 0 || solution.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex items-center justify-center">
        <div className="text-primary-400 text-xl">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <Button
            onClick={() => navigate('/result')}
            variant="ghost"
            className="text-primary-400 hover:bg-primary-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Hasil
          </Button>
          <Button
            onClick={() => navigate('/input')}
            variant="outline"
            className="border-primary-200 text-primary-400 hover:bg-primary-100"
          >
            Input Data Baru
          </Button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-primary-400 mb-8 text-center"
        >
          Visualisasi Data
        </motion.h1>

        <GraphSection data={data} solution={solution} />
      </div>
    </div>
  );
}