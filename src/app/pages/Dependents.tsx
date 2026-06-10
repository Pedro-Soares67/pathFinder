import { Users, MapPin, Bell, Battery, Plus, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// 1. Mudamos a interface para bater com os tipos reais do seu MySQL
interface DependentData {
  id: number; // No MySQL o ID é INT (número)
  nome: string;
  data_nascimento: string;
  genero?: string;
  cpf?: string;
  tipo_sanguineo?: string;
  alergias?: string;
  observacoes_medicas?: string;
  
  // Mantemos esses abaixo fixos por enquanto, já que dependem do hardware/GPS do app
  deviceId?: string;
  gpsStatus?: 'online' | 'offline';
  batteryLevel?: number;
  lastAlert?: string | null;
=======
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DependentData {
  id: string;
  name: string;
  relationship: string;
  photo: string;
  deviceId: string;
  gpsStatus: 'online' | 'offline';
  batteryLevel: number;
  lastAlert: string | null;
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
  alertType?: 'warning' | 'critical' | 'info';
}

export default function Dependents() {
  const [showAddModal, setShowAddModal] = useState(false);
<<<<<<< HEAD
  
  // Começa como uma lista vazia para receber os dados do banco
  const [dependents, setDependents] = useState<DependentData[]>([]);

  // Estados para controlar o formulário de cadastro
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [alergias, setAlergias] = useState('');

  // 2. FUNÇÃO QUE BUSCA OS DADOS DO BANCO (Porta 3001)
  const carregarDependentes = () => {
    fetch('http://localhost:3001/dependentes')
      .then((response) => response.json())
      .then((data) => {
        // Injetamos dados falsos de GPS/Bateria temporários nos dados vindos do banco 
        // apenas para não quebrar os indicadores visuais do seu layout atual
        const dadosFormatados = data.map((d: any, index: number) => ({
          ...d,
          deviceId: d.cpf ? `PF-${d.id}026` : 'Sem Dispositivo',
          gpsStatus: index % 2 === 0 ? 'online' : 'offline',
          batteryLevel: Math.floor(Math.random() * 80) + 20,
          lastAlert: d.alergias ? `Alergia registrada: ${d.alergias}` : null,
          alertType: 'warning'
        }));
        setDependents(dadosFormatados);
      })
      .catch((error) => console.error('Erro ao buscar dependentes:', error));
  };

  // Dispara a busca assim que a tela abre
  useEffect(() => {
    carregarDependentes();
  }, []);

  // 3. FUNÇÃO PARA SALVAR UM NOVO DEPENDENTE NO BANCO
  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();

    const novoDependente = {
      nome: nome,
      data_nascimento: dataNascimento,
      genero: genero,
      cpf: cpf,
      tipo_sanguineo: 'O+', // Fixo ou adicione um input se quiser
      alergias: alergias,
      observacoes_medicas: 'Nenhuma'
    };

    fetch('http://localhost:3001/dependentes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoDependente),
    })
      .then((res) => res.json())
      .then(() => {
        setShowAddModal(false); // Fecha o modal
        carregarDependentes();  // Recarrega a lista trazendo o novo dado do banco!
        // Limpa o formulário
        setNome('');
        setDataNascimento('');
        setGenero('');
        setCpf('');
        setAlergias('');
      })
      .catch((err) => console.error('Erro ao cadastrar:', err));
  };

  const getBatteryColor = (level: number = 100) => {
=======
  const [dependents] = useState<DependentData[]>([
    {
      id: '1',
      name: 'João Silva',
      relationship: 'Eu',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      deviceId: 'PF-2026',
      gpsStatus: 'online',
      batteryLevel: 87,
      lastAlert: null,
    },
    {
      id: '2',
      name: 'Maria Silva',
      relationship: 'Mãe',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      deviceId: 'PF-2025',
      gpsStatus: 'online',
      batteryLevel: 45,
      lastAlert: 'Medicamento atrasado',
      alertType: 'critical',
    },
    {
      id: '3',
      name: 'Pedro Silva',
      relationship: 'Pai',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      deviceId: 'PF-2024',
      gpsStatus: 'offline',
      batteryLevel: 12,
      lastAlert: 'GPS desconectado',
      alertType: 'warning',
    },
  ]);

  const getBatteryColor = (level: number) => {
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
    if (level > 50) return 'text-green-600 bg-green-50';
    if (level > 20) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getAlertColor = (type?: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Dependentes</h1>
          <p className="text-gray-600 text-lg">Gerencie e monitore todos os seus dependentes</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Adicionar Dependente
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <p className="text-gray-600">Total de Dependentes</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{dependents.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <p className="text-gray-600">Dispositivos Ativos</p>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {dependents.filter((d) => d.gpsStatus === 'online').length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <p className="text-gray-600">Alertas Pendentes</p>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {dependents.filter((d) => d.lastAlert).length}
          </p>
        </div>
      </div>

      {/* Dependents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dependents.map((dependent) => (
          <div
            key={dependent.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-100 hover:border-[#FF8A65] transition-all hover:shadow-lg"
          >
<<<<<<< HEAD
            {/* Header with Background Gradient */}
            <div className="relative h-32 bg-gradient-to-br from-[#D32F2F] to-[#FF8A65]">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                {/* Fallback de imagem caso não tenha link real */}
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center text-gray-500 font-bold text-2xl">
                  {dependent.nome.charAt(0)}
                </div>
=======
            {/* Header with Photo */}
            <div className="relative h-32 bg-gradient-to-br from-[#D32F2F] to-[#FF8A65]">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <img
                  src={dependent.photo}
                  alt={dependent.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
              </div>
            </div>

            {/* Content */}
            <div className="pt-14 p-6">
              <div className="text-center mb-4">
<<<<<<< HEAD
                <h3 className="text-xl font-bold text-gray-900 mb-1">{dependent.nome}</h3>
                <p className="text-gray-600">Gênero: {dependent.genero || 'Não inf.'}</p>
                <p className="text-sm text-gray-500 mt-1">CPF: {dependent.cpf || 'Sem CPF'}</p>
=======
                <h3 className="text-xl font-bold text-gray-900 mb-1">{dependent.name}</h3>
                <p className="text-gray-600">{dependent.relationship}</p>
                <p className="text-sm text-gray-500 mt-1">{dependent.deviceId}</p>
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
              </div>

              {/* Status Indicators */}
              <div className="space-y-3 mb-4">
                {/* GPS Status */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">GPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        dependent.gpsStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        dependent.gpsStatus === 'online' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {dependent.gpsStatus === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Battery */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Bateria</span>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${getBatteryColor(dependent.batteryLevel)}`}>
                    {dependent.batteryLevel}%
                  </span>
                </div>

                {/* Last Alert */}
                {dependent.lastAlert && (
                  <div className={`p-3 rounded-lg border-2 ${getAlertColor(dependent.alertType)}`}>
                    <div className="flex items-start gap-2">
                      <Bell className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Último Alerta</p>
                        <p className="text-sm">{dependent.lastAlert}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 font-medium transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-[#D32F2F] hover:bg-gray-50 transition-all min-h-[400px] flex flex-col items-center justify-center gap-4 p-6"
        >
          <div className="w-20 h-20 bg-[#D32F2F] rounded-full flex items-center justify-center">
            <Plus className="w-10 h-10 text-white" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 mb-1">Adicionar Novo Dependente</p>
            <p className="text-gray-600">Cadastre um novo dependente para monitoramento</p>
          </div>
        </button>
      </div>

      {/* Add Dependent Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowAddModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg"
            >
<<<<<<< HEAD
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-h-[85vh] overflow-y-auto">
=======
              <div className="bg-white rounded-2xl shadow-2xl p-8">
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Cadastrar Novo Dependente</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-600 rotate-45" />
                  </button>
                </div>

<<<<<<< HEAD
                {/* Ligamos a função handleCadastrar ao formulário */}
                <form onSubmit={handleCadastrar} className="space-y-4">
=======
                <form className="space-y-4">
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
<<<<<<< HEAD
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
=======
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                      placeholder="Ex: Maria Silva"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      required
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
=======
                      Parentesco
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Mãe, Pai, Avó"
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                      Gênero
                    </label>
                    <input
                      type="text"
                      value={genero}
                      onChange={(e) => setGenero(e.target.value)}
                      placeholder="Ex: Feminino, Masculino"
=======
                      Idade
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 65"
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                      CPF
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="Ex: 000.000.000-00"
=======
                      ID do Dispositivo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: PF-2027"
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                      Alergias a Medicamentos
                    </label>
                    <input
                      type="text"
                      value={alergias}
                      onChange={(e) => setAlergias(e.target.value)}
                      placeholder="Ex: Dipirona, Penicilina"
=======
                      URL da Foto
                    </label>
                    <input
                      type="url"
                      placeholder="https://exemplo.com/foto.jpg"
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg font-medium transition-colors"
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> eec4164bfe7b1d30c11735ac71610c68f0eabfdb
