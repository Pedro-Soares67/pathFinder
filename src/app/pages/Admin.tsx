import { Shield, Users, Activity, AlertTriangle, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Admin() {
  const systemStats = [
    { label: 'Usuários Ativos', value: '234', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Dispositivos Online', value: '187', change: '+8%', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Alertas Hoje', value: '45', change: '-5%', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Taxa de Resposta', value: '98%', change: '+2%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentUsers = [
    { name: 'João Silva', status: 'online', device: 'PF-2026', lastSeen: '2 min atrás', alerts: 2 },
    { name: 'Maria Santos', status: 'online', device: 'PF-2025', lastSeen: '5 min atrás', alerts: 0 },
    { name: 'Pedro Costa', status: 'offline', device: 'PF-2024', lastSeen: '1h atrás', alerts: 1 },
    { name: 'Ana Oliveira', status: 'online', device: 'PF-2023', lastSeen: 'Agora', alerts: 3 },
  ];

  const deviceStatus = [
    { id: 'PF-2026', user: 'João Silva', battery: 87, gps: 'online', connection: 'strong', status: 'active' },
    { id: 'PF-2025', user: 'Maria Santos', battery: 45, gps: 'online', connection: 'medium', status: 'active' },
    { id: 'PF-2024', user: 'Pedro Costa', battery: 12, gps: 'offline', connection: 'weak', status: 'inactive' },
    { id: 'PF-2023', user: 'Ana Oliveira', battery: 92, gps: 'online', connection: 'strong', status: 'active' },
  ];

  const criticalAlerts = [
    { user: 'Ana Oliveira', type: 'Emergência', severity: 'high', time: '2 min atrás' },
    { user: 'Pedro Costa', type: 'Bateria Crítica', severity: 'high', time: '15 min atrás' },
    { user: 'João Silva', type: 'GPS Perdido', severity: 'medium', time: '1h atrás' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600 text-lg">Monitoramento e gerenciamento do sistema PathFinder</p>
        </div>
        <div className="w-14 h-14 bg-[#D32F2F] rounded-xl flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Critical Alerts */}
      <div className="bg-white rounded-xl shadow-md p-6 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Alertas Críticos</h2>
        </div>

        <div className="space-y-3">
          {criticalAlerts.map((alert, index) => (
            <div key={index} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{alert.user}</p>
                  <p className="text-gray-600">{alert.type}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {alert.severity === 'high' ? 'Alta' : 'Média'}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Usuários Ativos</h3>
            <Users className="w-6 h-6 text-gray-400" />
          </div>

          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF8A65] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.device}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm text-gray-600">{user.lastSeen}</span>
                  </div>
                  {user.alerts > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      {user.alerts} alertas
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors">
            Ver Todos os Usuários
          </button>
        </div>

        {/* Device Status */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Status dos Dispositivos</h3>
            <Activity className="w-6 h-6 text-gray-400" />
          </div>

          <div className="space-y-3">
            {deviceStatus.map((device, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{device.id}</p>
                    <p className="text-sm text-gray-600">{device.user}</p>
                  </div>
                  {device.status === 'active' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-600">Bateria</p>
                    <p className={`font-medium ${
                      device.battery > 50 ? 'text-green-600' : device.battery > 20 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {device.battery}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">GPS</p>
                    <p className={`font-medium ${device.gps === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                      {device.gps}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sinal</p>
                    <p className={`font-medium ${
                      device.connection === 'strong' ? 'text-green-600' : device.connection === 'medium' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {device.connection}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors">
            Gerenciar Dispositivos
          </button>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Status Geral do Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Servidor</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">Online</p>
            <p className="text-sm text-gray-600">99.9% uptime</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Banco de Dados</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">Operacional</p>
            <p className="text-sm text-gray-600">Backup em 2h</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">API</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">Ativo</p>
            <p className="text-sm text-gray-600">120ms latência</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-4 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Adicionar Usuário</span>
          </button>
          <button className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-center">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Monitorar Sistema</span>
          </button>
          <button className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Ver Relatórios</span>
          </button>
          <button className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Configurações</span>
          </button>
        </div>
      </div>
    </div>
  );
}
