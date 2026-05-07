import { FileHeart, User, Calendar, Phone, AlertCircle, Pill, Syringe, Heart, QrCode } from 'lucide-react';
import { useState } from 'react';

export default function MedicalRecord() {
  const [showQR, setShowQR] = useState(false);

  const medicalInfo = {
    name: 'João da Silva',
    age: 68,
    birthDate: '15/03/1958',
    bloodType: 'O+',
    weight: '75 kg',
    height: '1.72 m',
  };

  const conditions = [
    { name: 'Deficiência Visual', severity: 'Alto', icon: AlertCircle },
    { name: 'Hipertensão', severity: 'Médio', icon: Heart },
    { name: 'Diabetes Tipo 2', severity: 'Médio', icon: Pill },
  ];

  const medications = [
    { name: 'Losartana 50mg', dosage: '1x ao dia - Manhã', icon: Pill },
    { name: 'Metformina 850mg', dosage: '2x ao dia - Café e Jantar', icon: Pill },
    { name: 'AAS 100mg', dosage: '1x ao dia - Noite', icon: Pill },
  ];

  const allergies = [
    { name: 'Penicilina', reaction: 'Grave' },
    { name: 'Dipirona', reaction: 'Moderada' },
  ];

  const emergencyContacts = [
    { name: 'Maria Silva (Filha)', phone: '(11) 98765-4321', relationship: 'Filha' },
    { name: 'Dr. Carlos Santos', phone: '(11) 3456-7890', relationship: 'Médico' },
    { name: 'SAMU', phone: '192', relationship: 'Emergência' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ficha Médica</h1>
        <p className="text-gray-600 text-lg">Informações de saúde e contatos de emergência</p>
      </div>

      {/* QR Code Card */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#FF8A65] rounded-2xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">QR Code de Emergência</h2>
            <p className="text-white/90 mb-4">
              Em caso de emergência, profissionais de saúde podem escanear este código para acessar suas informações médicas
            </p>
            <button
              onClick={() => setShowQR(!showQR)}
              className="px-6 py-3 bg-white text-[#D32F2F] rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              {showQR ? 'Ocultar QR Code' : 'Mostrar QR Code'}
            </button>
          </div>
          {showQR && (
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 grid-rows-8 gap-1 p-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-gray-600 text-sm mt-3 font-medium">
                ID: PF-{medicalInfo.name.slice(0, 4).toUpperCase()}-2026
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <User className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Informações Pessoais</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Nome Completo</p>
            <p className="font-bold text-gray-900 text-lg">{medicalInfo.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Idade</p>
            <p className="font-bold text-gray-900 text-lg">{medicalInfo.age} anos</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Data de Nascimento</p>
            <p className="font-bold text-gray-900 text-lg">{medicalInfo.birthDate}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Tipo Sanguíneo</p>
            <p className="font-bold text-gray-900 text-lg">{medicalInfo.bloodType}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Peso</p>
            <p className="font-bold text-gray-900 text-lg">{medicalInfo.weight}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Altura</p>
            <p className="font-bold text-gray-900 text-lg">{medicalInfo.height}</p>
          </div>
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <FileHeart className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Condições Médicas</h2>
        </div>

        <div className="space-y-3">
          {conditions.map((condition, index) => {
            const Icon = condition.icon;
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#D32F2F]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{condition.name}</p>
                      <p className="text-sm text-gray-600">Gravidade: {condition.severity}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medications */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Medicamentos</h3>
          </div>

          <div className="space-y-3">
            {medications.map((med, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Pill className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Syringe className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Alergias</h3>
          </div>

          <div className="space-y-3">
            {allergies.map((allergy, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">{allergy.name}</p>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {allergy.reaction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <Phone className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Contatos de Emergência</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">{contact.relationship}</p>
              </div>
              <p className="font-bold text-gray-900 mb-1">{contact.name}</p>
              <p className="text-[#D32F2F] font-medium text-lg">{contact.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg font-medium transition-colors">
          Editar Ficha Médica
        </button>
      </div>
    </div>
  );
}
