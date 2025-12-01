import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Matrix, formatNumber } from '@/lib/matrixUtils';
import { ChevronRight } from 'lucide-react';

interface Step {
  description: string;
  matrix: Matrix;
  stepNumber: number;
}

interface StepByStepProps {
  steps: Step[];
  title: string;
}

export default function StepByStep({ steps, title }: StepByStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-primary-300">
        <CardHeader>
          <CardTitle className="text-2xl text-primary-400">Langkah-langkah {title}</CardTitle>
          <CardDescription className="text-primary-400/80 text-base">
            Proses perhitungan secara detail dan terstruktur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-primary-200 rounded-lg p-4 bg-primary-50/50"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  {step.stepNumber}
                </div>
                <div className="flex-1">
                  <p className="text-primary-400 font-medium text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              <div className="ml-11 overflow-x-auto">
                <div className="inline-block min-w-full">
                  <div className="border border-primary-200 rounded-lg p-3 bg-white/70">
                    <table className="w-full">
                      <tbody>
                        {step.matrix.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-3 py-1.5 text-center font-mono text-sm ${
                                  j === row.length - 1
                                    ? 'border-l-2 border-primary-400 text-primary-400 font-bold'
                                    : 'text-primary-400/90'
                                }`}
                              >
                                {formatNumber(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-3">
                  <ChevronRight className="h-5 w-5 text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}