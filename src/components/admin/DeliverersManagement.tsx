import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MapPin, Phone, Star } from 'lucide-react';

export function DeliverersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deliverers, setDeliverers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/deliverers')
      .then(res => res.json())
      .then(data => {
        setDeliverers(data);
        setLoading(false);
      });
  }, []);

  const columns = [
    { key: 'name', label: 'Nome', width: 'w-48' },
    { key: 'contact', label: 'Contato', width: 'w-56' },
    { key: 'vehicle', label: 'Veículo', width: 'w-32' },
    { key: 'performance', label: 'Performance', width: 'w-40' },
    { key: 'phone', label: 'Telefone', width: 'w-40' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'actions', label: 'Ações', width: 'w-32' }
  ];

  const renderCell = (deliverer: any, column: any) => {
    switch (column.key) {
      case 'name':
        return (
          <div>
            <div className="font-medium text-gray-900">{deliverer.name}</div>
            <div className="text-sm text-gray-500">ID: {deliverer.id}</div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-1">
            <div className="text-sm text-gray-900">{deliverer.email}</div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Phone className="w-3 h-3" />
              {deliverer.phone}
            </div>
          </div>
        );
      case 'vehicle':
        return (
          <Badge variant="outline" className="text-xs">
            {deliverer.vehicle}
          </Badge>
        );
      case 'performance':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{deliverer.performance}</span>
            </div>
            <div className="text-xs text-gray-500">{deliverer.deliveries} entregas</div>
          </div>
        );
      case 'phone':
        return (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Phone className="w-3 h-3" />
            {deliverer.phone}
          </div>
        );
      case 'status':
        return (
          <Badge 
            variant={deliverer.status === 'Ativo' ? 'default' : 'secondary'}
            className={`text-xs ${
              deliverer.status === 'Ativo' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-red-100 text-red-800 border-red-200'
            }`}
          >
            {deliverer.status}
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
        return deliverer[column.key];
    }
  };

  const filteredDeliverers = deliverers.filter(deliverer =>
    deliverer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deliverer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estatísticas reais
  const total = deliverers.length;
  const active = deliverers.filter(d => d.status === 'Ativo').length;
  const avgPerformance = deliverers.length > 0 ? (
    deliverers.reduce((acc, d) => acc + parseFloat(d.performance), 0) / deliverers.length
  ).toFixed(1) : '0.0';
  const deliveriesToday = deliverers.reduce((acc, d) => acc + (d.deliveries || 0), 0); // mock: soma total

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entregadores</h1>
          <p className="text-gray-600 mt-1">Gerencie os entregadores da plataforma</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Entregador
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar entregadores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <p className="text-sm text-gray-600">Total de Entregadores</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{active}</div>
          <p className="text-sm text-gray-600">Entregadores Ativos</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{avgPerformance}</div>
          <p className="text-sm text-gray-600">Avaliação Média</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{deliveriesToday}</div>
          <p className="text-sm text-gray-600">Entregas Hoje</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lista de Entregadores ({filteredDeliverers.length})
          </h3>
          {loading ? (
            <div className="p-8 text-center">Carregando entregadores...</div>
          ) : (
            <DataTable
              data={filteredDeliverers}
              columns={columns}
              renderCell={renderCell}
            />
          )}
        </div>
      </div>
    </div>
  );
}
