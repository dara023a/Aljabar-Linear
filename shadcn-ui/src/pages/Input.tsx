import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DataInputTable from '@/components/DataInputTable';
import { DataRow, validateAllData } from '@/lib/validateData';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Input() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataRow[]>([
    { distance: 0, time: 0, cost: 0 },
  ]);

  const handleCalculate = () => {
    const validation = validateAllData(data);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    // Store data in sessionStorage for the result page
    sessionStorage.setItem('splData', JSON.stringify(data));
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-primary-400 hover:bg-primary-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <DataInputTable
            data={data}
            setData={setData}
            onCalculate={handleCalculate}
          />
        </motion.div>
      </div>
    </div>
  );
}