import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  MapPin,
  Bell,
  FileHeart,
  Settings as SettingsIcon,
  Shield,
  Menu,
  X,
  LogOut,
  Users
} from 'lucide-react';
import { DependentSelector, type Dependent } from './DependentSelector';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/location', label: 'Localização', icon: MapPin },
  { path: '/alerts', label: 'Alertas', icon: Bell },
  { path: '/medical', label: 'Ficha Médica', icon: FileHeart },
  { path: '/dependents', label: 'Meus Dependentes', icon: Users },
  { path: '/settings', label: 'Configurações', icon: SettingsIcon },
  { path: '/admin', label: 'Administração', icon: Shield },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [dependents] = useState<Dependent[]>([
    {
      id: '1',
      name: 'João Silva',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      relationship: 'Eu',
      hasAlert: false,
    },
    {
      id: '2',
      name: 'Maria Silva',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      relationship: 'Mãe',
      hasAlert: true,
    },
    {
      id: '3',
      name: 'Pedro Silva',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      relationship: 'Pai',
      hasAlert: false,
    },
  ]);

  const [currentDependent, setCurrentDependent] = useState<Dependent>(dependents[0]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D32F2F] rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">PathFinder</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 lg:h-20 flex items-center gap-3 px-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-[#D32F2F] rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PathFinder</h1>
              <p className="text-xs text-gray-500">Sistema de Acessibilidade</p>
            </div>
          </div>

          {/* Dependent Selector */}
          <div className="px-3 pt-4">
            <DependentSelector
              dependents={dependents}
              currentDependent={currentDependent}
              onSelectDependent={setCurrentDependent}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-[#D32F2F] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-10 h-10 bg-[#FF8A65] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">João Silva</p>
                <p className="text-sm text-gray-500">Usuário</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
