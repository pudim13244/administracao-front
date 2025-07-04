import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'bg-green-100 text-green-800';
      case 'em_preparo':
        return 'bg-yellow-100 text-yellow-800';
      case 'pendente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'Entregue';
      case 'em_preparo':
        return 'Em Preparo';
      case 'pendente':
        return 'Pendente';
      default:
        return status;
    }
  };

  const columns = [
    { key: 'id', label: 'ID', width: 'w-20' },
    { key: 'customer', label: 'Cliente', width: 'w-32' },
    { key: 'restaurant', label: 'Restaurante', width: 'w-32' },
    { key: 'deliverer', label: 'Entregador', width: 'w-32' },
    { key: 'value', label: 'Valor', width: 'w-24' },
    { key: 'status', label: 'Status', width: 'w-28' },
    { key: 'payment', label: 'Pagamento', width: 'w-24' },
    { key: 'time', label: 'Horário', width: 'w-20' },
    { key: 'actions', label: 'Ações', width: 'w-32' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
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
            <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
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
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Pedidos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os pedidos da plataforma</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Novo Pedido
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente, restaurante ou ID..."
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
              <option value="all">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="em_preparo">Em Preparo</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">Carregando pedidos...</div>
        ) : (
          <DataTable
            data={filteredOrders}
            columns={columns}
            renderCell={renderCell}
          />
        )}
      </div>
    </div>
  );
}
