import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { DataRow } from '@/lib/validateData';
import { createAugmentedMatrix } from '@/lib/matrixUtils';
import { gaussElimination, GaussResult } from '@/lib/gauss';
import { gaussJordanElimination, GaussJordanResult } from '@/lib/gaussJordan';
import MatrixDisplay from '@/components/MatrixDisplay';
import SolutionSummary from '@/components/SolutionSummary';
import StepByStep from '@/components/StepByStep';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Result() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataRow[]>([]);
  const [gaussResult, setGaussResult] = useState<GaussResult | null>(null);
  const [gaussJordanResult, setGaussJordanResult] = useState<GaussJordanResult | null>(null);
  const [error, setError] = useState<string>('');

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
      
      // Calculate using Gauss elimination
      const gauss = gaussElimination(matrix);
      setGaussResult(gauss);

      // Calculate using Gauss-Jordan elimination
      const gaussJordan = gaussJordanElimination(matrix);
      setGaussJordanResult(gaussJordan);

      toast.success('Perhitungan berhasil!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan dalam perhitungan';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md text-center"
        >
          <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
          <p className="text-primary-400/90 mb-6">{error}</p>
          <Button onClick={() => navigate('/input')} className="bg-accent hover:bg-accent/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Input
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!gaussResult || !gaussJordanResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex items-center justify-center">
        <div className="text-primary-400 text-xl font-medium">Memproses perhitungan...</div>
      </div>
    );
  }

  const augmentedMatrix = createAugmentedMatrix(data);

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
            onClick={() => navigate('/input')}
            variant="ghost"
            className="text-primary-400 hover:bg-primary-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Input
          </Button>
          <Button
            onClick={() => navigate('/visual')}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Lihat Visualisasi
          </Button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-primary-400 mb-8 text-center"
        >
          Hasil Perhitungan SPL
        </motion.h1>

        <Tabs defaultValue="gauss" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="gauss" className="data-[state=active]:bg-accent data-[state=active]:text-white">
              Metode Gauss
            </TabsTrigger>
            <TabsTrigger value="gauss-jordan" className="data-[state=active]:bg-accent data-[state=active]:text-white">
              Metode Gauss-Jordan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gauss" className="space-y-8">
            <MatrixDisplay
              title="Matriks Augmented Awal"
              description="Matriks yang dibentuk dari data input"
              matrix={augmentedMatrix}
            />
            
            <StepByStep steps={gaussResult.steps} title="Eliminasi Gauss" />
            
            <MatrixDisplay
              title="Matriks Hasil Akhir"
              description="Matriks dalam bentuk segitiga atas"
              matrix={gaussResult.matrix}
            />

            <SolutionSummary solution={gaussResult.solution} method="Gauss" />
          </TabsContent>

          <TabsContent value="gauss-jordan" className="space-y-8">
            <MatrixDisplay
              title="Matriks Augmented Awal"
              description="Matriks yang dibentuk dari data input"
              matrix={augmentedMatrix}
            />
            
            <StepByStep steps={gaussJordanResult.steps} title="Eliminasi Gauss-Jordan" />
            
            <MatrixDisplay
              title="Matriks Hasil Akhir"
              description="Matriks dalam bentuk identitas tereduksi"
              matrix={gaussJordanResult.matrix}
            />

            <SolutionSummary solution={gaussJordanResult.solution} method="Gauss-Jordan" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}