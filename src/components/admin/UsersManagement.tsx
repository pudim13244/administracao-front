import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Search, Filter, Eye, Edit, UserX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Banido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'Ativo';
      case 'Banido':
        return 'Banido';
      default:
        return status;
    }
  };

  const columns = [
    { key: 'name', label: 'Nome', width: 'w-32' },
    { key: 'email', label: 'Email', width: 'w-40' },
    { key: 'phone', label: 'Telefone', width: 'w-32' },
    { key: 'orders', label: 'Pedidos', width: 'w-20' },
    { key: 'total_spent', label: 'Gasto Total', width: 'w-28' },
    { key: 'addresses', label: 'Endereços', width: 'w-24' },
    { key: 'last_order', label: 'Último Pedido', width: 'w-32' },
    { key: 'status', label: 'Status', width: 'w-24' },
    { key: 'actions', label: 'Ações', width: 'w-32' },
  ];

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.phone || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || u.status.toLowerCase() === (statusFilter === 'active' ? 'ativo' : 'banido');
    return matchesSearch && matchesStatus;
  });

  const renderCell = (item: any, column: any) => {
    switch (column.key) {
      case 'status':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
            {getStatusText(item.status)}
          </span>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
              <Edit className="w-4 h-4" />
            </Button>
            {item.status === 'Ativo' ? (
              <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-red-600">
                <UserX className="w-4 h-4" />
              </Button>
            ) : (
              <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-green-600">
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      default:
        return item[column.key];
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os usuários da plataforma</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="banned">Banidos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">Carregando usuários...</div>
        ) : (
          <DataTable
            data={filteredUsers}
            columns={columns}
            renderCell={renderCell}
          />
        )}
      </div>
    </div>
  );
}
