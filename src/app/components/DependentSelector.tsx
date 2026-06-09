import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Dependent {
  id: string;
  name: string;
  photo: string;
  relationship: string;
  hasAlert?: boolean;
}

interface DependentSelectorProps {
  dependents: Dependent[];
  currentDependent: Dependent;
  onSelectDependent: (dependent: Dependent) => void;
}

export function DependentSelector({ dependents, currentDependent, onSelectDependent }: DependentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const hasAnyAlert = dependents.some((dep) => dep.hasAlert && dep.id !== currentDependent.id);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Dependent Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border-2 border-gray-200"
      >
        <div className="flex items-center gap-3">
          {/* Photo with Badge */}
          <div className="relative flex-shrink-0">
            <img
              src={currentDependent.photo}
              alt={currentDependent.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            {hasAnyAlert && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#D32F2F] rounded-full border-2 border-white flex items-center justify-center">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-left min-w-0">
            <p className="font-bold text-gray-900 truncate">{currentDependent.name}</p>
            <p className="text-sm text-gray-600 truncate">{currentDependent.relationship}</p>
          </div>

          {/* Arrow */}
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {dependents.map((dependent) => {
              const isSelected = dependent.id === currentDependent.id;

              return (
                <button
                  key={dependent.id}
                  onClick={() => {
                    onSelectDependent(dependent);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 flex items-center gap-3 transition-colors ${
                    isSelected ? 'bg-[#D32F2F]/5' : 'hover:bg-gray-50'
                  } border-b border-gray-100 last:border-b-0`}
                >
                  {/* Photo with Badge */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={dependent.photo}
                      alt={dependent.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                    {dependent.hasAlert && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D32F2F] rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium text-gray-900 truncate">{dependent.name}</p>
                    <p className="text-sm text-gray-600 truncate">{dependent.relationship}</p>
                  </div>

                  {/* Check Mark */}
                  {isSelected && (
                    <Check className="w-5 h-5 text-[#D32F2F] flex-shrink-0" />
                  )}

                  {/* Alert Badge */}
                  {dependent.hasAlert && !isSelected && (
                    <span className="px-2 py-1 bg-[#D32F2F] text-white text-xs font-bold rounded-full flex-shrink-0">
                      ALERTA
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
