
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Mail, Calendar, Shield } from 'lucide-react';

export function AdminsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const admins = [
    {
      id: 1,
      name: 'Carlos Admin',
      email: 'carlos@deliveryapp.com',
      role: 'Super Admin',
      status: 'Ativo',
      lastLogin: '2024-02-15 09:30',
      createdAt: '2023-01-10',
      permissions: ['Todos os módulos']
    },
    {
      id: 2,
      name: 'Ana Gerente',
      email: 'ana@deliveryapp.com',
      role: 'Gerente',
      status: 'Ativo',
      lastLogin: '2024-02-15 08:45',
      createdAt: '2023-03-15',
      permissions: ['Pedidos', 'Restaurantes', 'Relatórios']
    },
    {
      id: 3,
      name: 'Pedro Suporte',
      email: 'pedro@deliveryapp.com',
      role: 'Suporte',
      status: 'Inativo',
      lastLogin: '2024-02-10 16:20',
      createdAt: '2023-06-20',
      permissions: ['Pedidos', 'Usuários']
    }
  ];

  const columns = [
    { key: 'admin', label: 'Administrador', width: 'w-64' },
    { key: 'role', label: 'Função', width: 'w-32' },
    { key: 'permissions', label: 'Permissões', width: 'w-48' },
    { key: 'lastLogin', label: 'Último Acesso', width: 'w-40' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'actions', label: 'Ações', width: 'w-32' }
  ];

  const renderCell = (admin: any, column: any) => {
    switch (column.key) {
      case 'admin':
        return (
          <div>
            <div className="font-medium text-gray-900">{admin.name}</div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Mail className="w-3 h-3" />
              {admin.email}
            </div>
          </div>
        );
      case 'role':
        return (
          <Badge 
            variant="outline" 
            className={`text-xs ${
              admin.role === 'Super Admin' 
                ? 'bg-red-100 text-red-800 border-red-200' 
                : admin.role === 'Gerente'
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : 'bg-green-100 text-green-800 border-green-200'
            }`}
          >
            {admin.role}
          </Badge>
        );
      case 'permissions':
        return (
          <div className="space-y-1">
            {admin.permissions.slice(0, 2).map((permission: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs mr-1">
                {permission}
              </Badge>
            ))}
            {admin.permissions.length > 2 && (
              <span className="text-xs text-gray-500">+{admin.permissions.length - 2} mais</span>
            )}
          </div>
        );
      case 'lastLogin':
        return (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="w-3 h-3" />
            {admin.lastLogin}
          </div>
        );
      case 'status':
        return (
          <Badge 
            variant={admin.status === 'Ativo' ? 'default' : 'secondary'}
            className={`text-xs ${
              admin.status === 'Ativo' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-red-100 text-red-800 border-red-200'
            }`}
          >
            {admin.status}
          </Badge>
        );
      case 'actions':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Editar
            </Button>
          </div>
        );
      default:
        return admin[column.key];
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administradores</h1>
          <p className="text-gray-600 mt-1">Gerencie os administradores da plataforma</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Admin
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar administradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">5</div>
              <p className="text-sm text-gray-600">Total de Admins</p>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">4</div>
              <p className="text-sm text-gray-600">Admins Ativos</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">2</div>
              <p className="text-sm text-gray-600">Super Admins</p>
            </div>
            <Shield className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-sm text-gray-600">Acessos Hoje</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Permissions Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Níveis de Permissão</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">Super Admin</h4>
            <p className="text-sm text-gray-600">Acesso total a todos os módulos e configurações</p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Gerente</h4>
            <p className="text-sm text-gray-600">Acesso a pedidos, restaurantes e relatórios</p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Suporte</h4>
            <p className="text-sm text-gray-600">Acesso limitado a pedidos e usuários</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lista de Administradores ({filteredAdmins.length})
          </h3>
          <DataTable
            data={filteredAdmins}
            columns={columns}
            renderCell={renderCell}
          />
        </div>
      </div>
    </div>
  );
}
