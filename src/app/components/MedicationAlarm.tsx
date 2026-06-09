import { Clock, Check, Timer as Snooze, Pill, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MedicationAlarmProps {
  isOpen: boolean;
  onClose: () => void;
  medication: {
    name: string;
    dosage: string;
    time: string;
  };
  onConfirm: () => void;
  onSnooze: () => void;
}

export function MedicationAlarm({ isOpen, onClose, medication, onConfirm, onSnooze }: MedicationAlarmProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />

          {/* Alarm Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#D32F2F] relative">
              {/* Pulsing Border Animation */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(211, 47, 47, 0.7)',
                    '0 0 0 20px rgba(211, 47, 47, 0)',
                    '0 0 0 0 rgba(211, 47, 47, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8 text-center">
                {/* Animated Clock Icon */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="w-24 h-24 bg-[#D32F2F] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <Clock className="w-14 h-14 text-white" />
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-[#D32F2F] mb-2">
                  HORA DA MEDICAÇÃO
                </h2>

                {/* Medication Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-gray-200">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Pill className="w-8 h-8 text-[#FF8A65]" />
                    <p className="text-2xl font-bold text-gray-900">{medication.name}</p>
                  </div>
                  <p className="text-xl text-gray-600 mb-2">{medication.dosage}</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Clock className="w-5 h-5" />
                    <p className="text-lg">{medication.time}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onConfirm}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 min-h-[60px]"
                  >
                    <Check className="w-7 h-7" />
                    Confirmar Ingestão
                  </button>

                  <button
                    onClick={onSnooze}
                    className="w-full bg-[#FF8A65] hover:bg-[#FF7043] text-white py-5 rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 min-h-[60px]"
                  >
                    <Snooze className="w-7 h-7" />
                    Adiar 10 minutos
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
