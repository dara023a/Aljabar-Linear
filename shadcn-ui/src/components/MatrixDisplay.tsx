import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Matrix, formatNumber } from '@/lib/matrixUtils';

interface MatrixDisplayProps {
  title: string;
  description: string;
  matrix: Matrix;
  highlight?: { row?: number; col?: number };
}

export default function MatrixDisplay({ title, description, matrix, highlight }: MatrixDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-primary-300">
        <CardHeader>
          <CardTitle className="text-2xl text-primary-400">{title}</CardTitle>
          <CardDescription className="text-primary-400/80">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="border border-primary-300 rounded-lg p-4 bg-primary-50/40">
                <table className="w-full">
                  <tbody>
                    {matrix.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-4 py-2 text-center font-mono text-sm ${
                              highlight?.row === i || highlight?.col === j
                                ? 'bg-accent/20 text-primary-400 font-bold'
                                : 'text-primary-400/90'
                            } ${j === row.length - 1 ? 'border-l-2 border-primary-400' : ''}`}
                          >
                            {formatNumber(cell)}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}