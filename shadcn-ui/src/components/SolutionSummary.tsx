import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, TrendingUp } from 'lucide-react';

interface SolutionSummaryProps {
  solution: number[];
  method: string;
}

export default function SolutionSummary({ solution, method }: SolutionSummaryProps) {
  const [tarifDasar, tarifPerKm, tarifPerMenit] = solution;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const solutionItems = [
    {
      label: 'Tarif Dasar',
      value: tarifDasar,
      description: 'Biaya tetap untuk setiap perjalanan',
      icon: CheckCircle2,
    },
    {
      label: 'Tarif per Kilometer',
      value: tarifPerKm,
      description: 'Biaya tambahan untuk setiap kilometer',
      icon: TrendingUp,
    },
    {
      label: 'Tarif per Menit',
      value: tarifPerMenit,
      description: 'Biaya tambahan untuk setiap menit perjalanan',
      icon: TrendingUp,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-accent/10 to-primary-100 shadow-xl border-accent/30">
        <CardHeader>
          <CardTitle className="text-3xl text-primary-400 flex items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-accent" />
            Solusi {method}
          </CardTitle>
          <CardDescription className="text-lg text-primary-400/70">
            Hasil perhitungan sistem persamaan linear
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {solutionItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary-400 mb-1">{item.label}</h3>
                  <p className="text-3xl font-bold text-accent mb-2">{formatCurrency(item.value)}</p>
                  <p className="text-sm text-primary-400/70">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-primary-100/50 rounded-lg border border-primary-200"
          >
            <h4 className="font-semibold text-primary-400 mb-2">Formula Biaya Total:</h4>
            <p className="text-primary-400/80 font-mono text-sm">
              Biaya = {formatCurrency(tarifDasar)} + ({formatCurrency(tarifPerKm)} × Jarak) + (
              {formatCurrency(tarifPerMenit)} × Waktu)
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}