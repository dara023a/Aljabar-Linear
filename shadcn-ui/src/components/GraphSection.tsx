import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataRow } from '@/lib/validateData';
import { BarChart3 } from 'lucide-react';

interface GraphSectionProps {
  data: DataRow[];
  solution: number[];
}

export default function GraphSection({ data, solution }: GraphSectionProps) {
  const [tarifDasar, tarifPerKm, tarifPerMenit] = solution;

  // Prepare data for Distance vs Cost chart
  const distanceData = data
    .map((row) => ({
      distance: row.distance,
      actualCost: row.cost,
      predictedCost: tarifDasar + tarifPerKm * row.distance + tarifPerMenit * row.time,
    }))
    .sort((a, b) => a.distance - b.distance);

  // Prepare data for Time vs Cost chart
  const timeData = data
    .map((row) => ({
      time: row.time,
      actualCost: row.cost,
      predictedCost: tarifDasar + tarifPerKm * row.distance + tarifPerMenit * row.time,
    }))
    .sort((a, b) => a.time - b.time);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Distance vs Cost Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-primary-200">
          <CardHeader>
            <CardTitle className="text-2xl text-primary-400 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Grafik Jarak vs Biaya
            </CardTitle>
            <CardDescription className="text-primary-400/70">
              Perbandingan biaya aktual dengan prediksi berdasarkan jarak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={distanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C9F2DD" />
                <XAxis
                  dataKey="distance"
                  label={{ value: 'Jarak (km)', position: 'insideBottom', offset: -5 }}
                  stroke="#3E6C54"
                />
                <YAxis
                  label={{ value: 'Biaya (Rp)', angle: -90, position: 'insideLeft' }}
                  stroke="#3E6C54"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#F5FFF9',
                    border: '1px solid #A7E7BA',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actualCost"
                  stroke="#7BC89A"
                  strokeWidth={3}
                  name="Biaya Aktual"
                  dot={{ fill: '#7BC89A', r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="predictedCost"
                  stroke="#3E6C54"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Biaya Prediksi"
                  dot={{ fill: '#3E6C54', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Time vs Cost Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-primary-200">
          <CardHeader>
            <CardTitle className="text-2xl text-primary-400 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Grafik Waktu vs Biaya
            </CardTitle>
            <CardDescription className="text-primary-400/70">
              Perbandingan biaya aktual dengan prediksi berdasarkan waktu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C9F2DD" />
                <XAxis
                  dataKey="time"
                  label={{ value: 'Waktu (menit)', position: 'insideBottom', offset: -5 }}
                  stroke="#3E6C54"
                />
                <YAxis
                  label={{ value: 'Biaya (Rp)', angle: -90, position: 'insideLeft' }}
                  stroke="#3E6C54"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#F5FFF9',
                    border: '1px solid #A7E7BA',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actualCost"
                  stroke="#7BC89A"
                  strokeWidth={3}
                  name="Biaya Aktual"
                  dot={{ fill: '#7BC89A', r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="predictedCost"
                  stroke="#3E6C54"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Biaya Prediksi"
                  dot={{ fill: '#3E6C54', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}