import { AlertTriangle, MapPin, Bell, Activity, Zap, Clock } from 'lucide-react';
import { useState } from 'react';
import { MedicationAlarm } from '../components/MedicationAlarm';
import { NextMedicationWidget } from '../components/NextMedicationWidget';

export default function Dashboard() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [showMedicationAlarm, setShowMedicationAlarm] = useState(false);

  const handleEmergency = () => {
    setEmergencyActive(true);
    setTimeout(() => setEmergencyActive(false), 3000);
  };

  const nextMedication = {
    name: 'Losartana 50mg',
    time: '14:00',
    minutesUntil: 45,
  };

  const currentMedication = {
    name: 'Metformina 850mg',
    dosage: '1 comprimido',
    time: '13:00',
  };

  const handleConfirmMedication = () => {
    setShowMedicationAlarm(false);
    // Lógica para registrar a ingestão
  };

  const handleSnoozeMedication = () => {
    setShowMedicationAlarm(false);
    // Lógica para adiar por 10 minutos
  };

  const stats = [
    { label: 'Dispositivo', value: 'Ativo', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Bateria', value: '87%', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Alertas Hoje', value: '2', icon: Bell, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'GPS', value: 'Online', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentAlerts = [
    { type: 'Obstáculo Detectado', time: '10:45', status: 'resolvido', icon: AlertTriangle },
    { type: 'Baixa Bateria', time: '09:20', status: 'ativo', icon: Zap },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">Bem-vindo ao sistema PathFinder</p>
      </div>

      {/* Emergency Button */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Botão de Emergência</h2>
          <p className="text-gray-600 mb-6 text-lg">Pressione em caso de emergência</p>
          <button
            onClick={handleEmergency}
            className={`
              w-48 h-48 mx-auto rounded-full font-bold text-2xl
              transition-all duration-300 shadow-2xl
              ${emergencyActive
                ? 'bg-[#990000] scale-95 shadow-inner'
                : 'bg-[#cc0000] hover:bg-[#b30000] hover:scale-105 active:scale-95'
              }
              text-white flex flex-col items-center justify-center gap-3
            `}
          >
            <Bell className="w-16 h-16" />
            <span>SOS</span>
          </button>
          {emergencyActive && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-[#cc0000] rounded-r-xl animate-pulse">
              <p className="text-[#cc0000] font-bold text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5"/>
                🚨 Alerta de emergência enviado!
              </p>
              <p className="text-gray-600 ml-7">Contatos de emergência foram notificados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border-none">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Medication Alarm Overlay */}
      <MedicationAlarm
        isOpen={showMedicationAlarm}
        onClose={() => setShowMedicationAlarm(false)}
        medication={currentMedication}
        onConfirm={handleConfirmMedication}
        onSnooze={handleSnoozeMedication}
      />

      {/* Next Medication Widget */}
      <NextMedicationWidget nextMedication={nextMedication} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last Location */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border-none">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Última Localização</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Endereço</p>
              <p className="font-medium text-gray-900">Rua das Flores, 123 - Centro</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Atualizado há 2 minutos</span>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border-none">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Alertas Recentes</h3>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#ff914d]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#ff914d]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{alert.type}</p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${alert.status === 'resolvido'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                        }
                      `}
                    >
                      {alert.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border-none">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Atalhos Rápidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center">
            <MapPin className="w-8 h-8 text-[#cc0000] mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Ver Mapa</span>
          </button>
          <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center">
            <Bell className="w-8 h-8 text-[#cc0000] mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Alertas</span>
          </button>
          <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center">
            <Activity className="w-8 h-8 text-[#cc0000] mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Atividade</span>
          </button>
          <button
            onClick={() => setShowMedicationAlarm(true)}
            className="p-4 bg-[#ff914d] hover:bg-[#e68245] rounded-lg transition-colors text-center"
          >
            <Clock className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-sm font-medium text-white">Testar Alarme</span>
          </button>
        </div>
      </div>
    </div>
  );
}
