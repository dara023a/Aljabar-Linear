import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Database, Calculator } from 'lucide-react';
import { DataRow, getDummyData } from '@/lib/validateData';
import { toast } from 'sonner';

interface DataInputTableProps {
  data: DataRow[];
  setData: (data: DataRow[]) => void;
  onCalculate: () => void;
}

export default function DataInputTable({ data, setData, onCalculate }: DataInputTableProps) {
  const addRow = () => {
    setData([...data, { distance: 0, time: 0, cost: 0 }]);
    toast.success('Baris baru ditambahkan');
  };

  const removeRow = (index: number) => {
    if (data.length <= 1) {
      toast.error('Minimal 1 baris data harus ada');
      return;
    }
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    toast.success('Baris dihapus');
  };

  const updateRow = (index: number, field: keyof DataRow, value: string) => {
    const newData = [...data];
    const numValue = parseFloat(value) || 0;
    newData[index] = { ...newData[index], [field]: numValue };
    setData(newData);
  };

  const loadDummyData = () => {
    setData(getDummyData());
    toast.success('Data contoh dimuat');
  };

  const clearAllData = () => {
    setData([{ distance: 0, time: 0, cost: 0 }]);
    toast.success('Semua data dihapus');
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-xl border-primary-300">
      <CardHeader>
        <CardTitle className="text-3xl text-primary-400 flex items-center gap-2">
          <Database className="h-8 w-8" />
          Input Data Perjalanan
        </CardTitle>
        <CardDescription className="text-lg text-primary-400/80">
          Masukkan data jarak, waktu, dan biaya perjalanan Grab (terbatas 3 baris)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            onClick={addRow}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Baris
          </Button>
          <Button
            onClick={loadDummyData}
            variant="outline"
            className="border-primary-300 text-primary-400 hover:bg-primary-200"
          >
            <Database className="mr-2 h-4 w-4" />
            Muat Contoh Data
          </Button>
          <Button
            onClick={clearAllData}
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive/70"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus Semua
          </Button>
        </div>

        <div className="rounded-lg border border-primary-300 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary-200 hover:bg-primary-200">
                <TableHead className="text-primary-400 font-semibold w-12">#</TableHead>
                <TableHead className="text-primary-400 font-semibold">Jarak (km)</TableHead>
                <TableHead className="text-primary-400 font-semibold">Waktu (menit)</TableHead>
                <TableHead className="text-primary-400 font-semibold">Biaya (Rp)</TableHead>
                <TableHead className="text-primary-400 font-semibold w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {data.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-primary-200"
                  >
                    <TableCell className="font-medium text-primary-400">{index + 1}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.distance || ''}
                        onChange={(e) => updateRow(index, 'distance', e.target.value)}
                        className="border-primary-300 focus:border-accent text-primary-400"
                        placeholder="0"
                        min="0"
                        step="0.1"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.time || ''}
                        onChange={(e) => updateRow(index, 'time', e.target.value)}
                        className="border-primary-300 focus:border-accent text-primary-400"
                        placeholder="0"
                        min="0"
                        step="1"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.cost || ''}
                        onChange={(e) => updateRow(index, 'cost', e.target.value)}
                        className="border-primary-300 focus:border-accent text-primary-400"
                        placeholder="0"
                        min="0"
                        step="100"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => removeRow(index)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={onCalculate}
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Calculator className="mr-3 h-6 w-6" />
            Hitung SPL
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}