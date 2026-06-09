import { Clock, Pill } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NextMedicationWidgetProps {
  nextMedication: {
    name: string;
    time: string;
    minutesUntil: number;
  };
}

export function NextMedicationWidget({ nextMedication }: NextMedicationWidgetProps) {
  const [timeLeft, setTimeLeft] = useState(nextMedication.minutesUntil * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const getUrgencyColor = () => {
    if (timeLeft < 300) return 'border-[#cc0000] bg-red-50'; // < 5 min
    if (timeLeft < 1800) return 'border-[#ff914d] bg-orange-50'; // < 30 min
    return 'border-blue-400 bg-blue-50';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border-l-4 ${getUrgencyColor()} transition-all`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
          <Clock className="w-7 h-7 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Próximo Medicamento</h3>
      </div>

      <div className="space-y-4">
        {/* Countdown Display */}
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-2">Tempo restante</p>
          <p className="text-4xl font-bold text-[#cc0000] font-mono">{formatTime()}</p>
        </div>

        {/* Medication Info */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <Pill className="w-6 h-6 text-[#ff914d] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">{nextMedication.name}</p>
            <p className="text-sm text-gray-600">Horário: {nextMedication.time}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[#cc0000] transition-all duration-1000 ease-linear"
            style={{
              width: `${Math.max(0, 100 - (timeLeft / (nextMedication.minutesUntil * 60)) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
