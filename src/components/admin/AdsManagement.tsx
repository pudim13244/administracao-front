
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Calendar, DollarSign } from 'lucide-react';

export function AdsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const ads = [
    {
      id: 1,
      title: 'Promoção Burger King',
      restaurant: 'Burger King Centro',
      type: 'Banner Principal',
      status: 'Ativo',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 'R$ 2.500',
      clicks: 15670,
      impressions: 89450
    },
    {
      id: 2,
      title: 'Pizza em Dobro',
      restaurant: 'Pizzaria Bella',
      type: 'Destaque Categoria',
      status: 'Pausado',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      budget: 'R$ 1.800',
      clicks: 8920,
      impressions: 45600
    },
    {
      id: 3,
      title: 'Sushi Week',
      restaurant: 'Sushi House',
      type: 'Banner Lateral',
      status: 'Ativo',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      budget: 'R$ 3.200',
      clicks: 12340,
      impressions: 67800
    }
  ];

  const columns = [
    { key: 'campaign', label: 'Campanha', width: 'w-64' },
    { key: 'type', label: 'Tipo', width: 'w-40' },
    { key: 'period', label: 'Período', width: 'w-48' },
    { key: 'budget', label: 'Orçamento', width: 'w-32' },
    { key: 'performance', label: 'Performance', width: 'w-40' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'actions', label: 'Ações', width: 'w-32' }
  ];

  const renderCell = (ad: any, column: any) => {
    switch (column.key) {
      case 'campaign':
        return (
          <div>
            <div className="font-medium text-gray-900">{ad.title}</div>
            <div className="text-sm text-gray-500">{ad.restaurant}</div>
          </div>
        );
      case 'type':
        return (
          <Badge variant="outline" className="text-xs">
            {ad.type}
          </Badge>
        );
      case 'period':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-3 h-3" />
              {ad.startDate}
            </div>
            <div className="text-sm text-gray-500">até {ad.endDate}</div>
          </div>
        );
      case 'budget':
        return (
          <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
            <DollarSign className="w-3 h-3" />
            {ad.budget}
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <Eye className="w-3 h-3" />
              <span className="font-medium">{ad.clicks.toLocaleString()}</span>
              <span className="text-gray-500">cliques</span>
            </div>
            <div className="text-xs text-gray-500">{ad.impressions.toLocaleString()} impressões</div>
          </div>
        );
      case 'status':
        return (
          <Badge 
            variant={ad.status === 'Ativo' ? 'default' : 'secondary'}
            className={`text-xs ${
              ad.status === 'Ativo' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`}
          >
            {ad.status}
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
        return ad[column.key];
    }
  };

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Anúncios</h1>
          <p className="text-gray-600 mt-1">Gerencie campanhas publicitárias da plataforma</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar campanhas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">23</div>
          <p className="text-sm text-gray-600">Campanhas Ativas</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">R$ 45.6k</div>
          <p className="text-sm text-gray-600">Faturamento do Mês</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">156k</div>
          <p className="text-sm text-gray-600">Cliques Totais</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">2.3%</div>
          <p className="text-sm text-gray-600">Taxa de Conversão</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Campanhas Publicitárias ({filteredAds.length})
          </h3>
          <DataTable
            data={filteredAds}
            columns={columns}
            renderCell={renderCell}
          />
        </div>
      </div>
    </div>
  );
}
