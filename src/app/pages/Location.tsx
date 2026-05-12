import { MapPin, Navigation, Clock, CheckCircle, Circle } from 'lucide-react';

export default function Location() {
  const locationHistory = [
    { address: 'Rua das Flores, 123 - Centro', time: '14:30', date: 'Hoje' },
    { address: 'Av. Principal, 456 - Jardim', time: '12:15', date: 'Hoje' },
    { address: 'Praça da Paz, 789 - Vila Nova', time: '09:45', date: 'Hoje' },
    { address: 'Rua do Comércio, 321 - Centro', time: '18:20', date: 'Ontem' },
    { address: 'Shopping Center - Zona Sul', time: '15:00', date: 'Ontem' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Localização</h1>
        <p className="text-gray-600 text-lg">Monitoramento de posição GPS em tempo real</p>
      </div>

      {/* Current Location Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <MapPin className="w-7 h-7 text-[#cc0000]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Posição Atual</h2>
            <p className="text-gray-600">Última atualização há 2 minutos</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-red-50 rounded-xl mb-4 relative overflow-hidden border-2 border-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#D32F2F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(204,0,0,0.4)] animate-pulse">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-700 font-medium text-lg">Visualização do Mapa</p>
              <p className="text-gray-600">GPS ativo e rastreando</p>
            </div>
          </div>
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600 text-sm mb-1">Endereço Atual</p>
            <p className="font-bold text-gray-900 text-lg">Rua das Flores, 123 - Centro</p>
            <p className="text-gray-600 text-sm mt-1">São Paulo, SP</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600 text-sm mb-1">Coordenadas GPS</p>
            <p className="font-bold text-gray-900 text-lg">-23.5505° S, -46.6333° W</p>
            <p className="text-gray-600 text-sm mt-1">Precisão: Alta (±5m)</p>
          </div>
        </div>
      </div>

      {/* GPS Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="font-bold text-gray-900">Status do GPS</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">Online</p>
          <p className="text-sm text-gray-600 mt-1">Sinal forte</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Navigation className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-gray-900">Precisão</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">Alta</p>
          <p className="text-sm text-gray-600 mt-1">Margem de ±5 metros</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-[#ff914d]" />
            <h3 className="font-bold text-gray-900">Atualização</h3>
          </div>
          <p className="text-2xl font-bold text-[#ff914d]">2 min</p>
          <p className="text-sm text-gray-600 mt-1">Última atualização</p>
        </div>
      </div>

      {/* Location History */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#FF8A65]/10 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#D32F2F]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Histórico de Localização</h2>
        </div>

        <div className="space-y-3">
          {locationHistory.map((location, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="pt-1">
                {index === 0 ? (
                  <div className="w-3 h-3 bg-[#D32F2F] rounded-full animate-pulse" />
                ) : (
                  <Circle className="w-3 h-3 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{location.address}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                  <span>{location.date}</span>
                  <span>•</span>
                  <span>{location.time}</span>
                </div>
              </div>
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors">
          Ver Histórico Completo
        </button>
      </div>
    </div>
  );
}
