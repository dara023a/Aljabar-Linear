import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/assets/matrix-background-pattern.png" 
          alt="Background Pattern" 
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4 max-w-4xl"
      >
        {/* Floating Calculator Icon */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
            <img 
              src="/assets/hero-calculator-icon.png" 
              alt="Calculator Icon" 
              className="w-32 h-32 object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-primary-400"
        >
          Simulasi Perhitungan SPL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-4 text-primary-400"
        >
          Sistem Persamaan Linear
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl mb-12 text-primary-400/90 max-w-2xl mx-auto"
        >
          Analisis Biaya Transportasi Grab dengan Metode Eliminasi Gauss dan Gauss-Jordan
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => navigate('/input')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-12 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Calculator className="mr-3 h-6 w-6" />
            Mulai Simulasi
          </Button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {['Input Manual', 'Metode Gauss', 'Gauss-Jordan', 'Visualisasi Grafik'].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full text-primary-400 font-medium shadow-md"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}