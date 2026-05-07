import { AlertTriangle, Bell, Zap, Heart, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      type: 'Emergência',
      title: 'Botão SOS Ativado',
      description: 'Alerta de emergência enviado aos contatos',
      time: '14:32',
      date: 'Hoje',
      status: 'ativo',
      priority: 'high',
      icon: Bell,
    },
    {
      id: 2,
      type: 'Obstáculo',
      title: 'Obstáculo Detectado',
      description: 'Objeto identificado à frente',
      time: '10:45',
      date: 'Hoje',
      status: 'resolvido',
      priority: 'medium',
      icon: AlertTriangle,
    },
    {
      id: 3,
      type: 'Bateria',
      title: 'Baixa Bateria',
      description: 'Nível de bateria em 15%',
      time: '09:20',
      date: 'Hoje',
      status: 'resolvido',
      priority: 'medium',
      icon: Zap,
    },
    {
      id: 4,
      type: 'Saúde',
      title: 'Frequência Cardíaca Elevada',
      description: 'BPM acima do normal detectado',
      time: '19:15',
      date: 'Ontem',
      status: 'resolvido',
      priority: 'medium',
      icon: Heart,
    },
    {
      id: 5,
      type: 'Localização',
      title: 'Zona de Segurança',
      description: 'Usuário saiu da área segura',
      time: '16:30',
      date: 'Ontem',
      status: 'resolvido',
      priority: 'low',
      icon: MapPin,
    },
  ];

  const stats = [
    { label: 'Total Hoje', value: '3', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Ativos', value: '1', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Resolvidos', value: '2', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-orange-500 bg-orange-50';
      case 'low':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'ativo') {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          <XCircle className="w-4 h-4" />
          Ativo
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
        <CheckCircle className="w-4 h-4" />
        Resolvido
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alertas</h1>
        <p className="text-gray-600 text-lg">Histórico e notificações do sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <p className="text-gray-600 mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-medium">
            Todos
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
            Ativos
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
            Resolvidos
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
            Alta Prioridade
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Lista de Alertas</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`p-6 border-l-4 ${getPriorityColor(alert.priority)} hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-6 h-6 text-[#D32F2F]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{alert.title}</h3>
                        <p className="text-gray-600">{alert.description}</p>
                      </div>
                      {getStatusBadge(alert.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-gray-600 text-sm">
                        <Clock className="w-4 h-4" />
                        {alert.date} às {alert.time}
                      </span>
                      <span className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                        {alert.type}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex-shrink-0">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button className="w-full py-3 bg-white hover:bg-gray-100 border-2 border-gray-300 rounded-lg font-medium text-gray-700 transition-colors">
            Carregar Mais Alertas
          </button>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#FF8A65] rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Precisa de Ajuda Imediata?</h3>
            <p className="text-white/90 mb-4">
              Em caso de emergência, acione o botão SOS no Dashboard
            </p>
          </div>
          <Bell className="w-12 h-12 text-white/80" />
        </div>
        <button className="px-6 py-3 bg-white text-[#D32F2F] rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Ir para Dashboard
        </button>
      </div>
    </div>
  );
}
