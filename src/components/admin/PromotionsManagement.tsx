
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, Percent, Target } from 'lucide-react';

export function PromotionsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const promotions = [
    {
      id: 1,
      name: 'Primeira Compra',
      type: 'Desconto',
      discount: '30%',
      code: 'FIRST30',
      status: 'Ativo',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usageLimit: 1000,
      usedCount: 456,
      restaurants: 'Todos'
    },
    {
      id: 2,
      name: 'Frete Grátis Sexta',
      type: 'Frete Grátis',
      discount: '100% frete',
      code: 'FRETEFRIDAY',
      status: 'Ativo',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      usageLimit: 500,
      usedCount: 234,
      restaurants: 'Selecionados'
    },
    {
      id: 3,
      name: 'Combo Pizza',
      type: 'Cashback',
      discount: 'R$ 10',
      code: 'PIZZABACK',
      status: 'Pausado',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      usageLimit: 200,
      usedCount: 89,
      restaurants: 'Pizzarias'
    }
  ];

  const columns = [
    { key: 'promotion', label: 'Promoção', width: 'w-64' },
    { key: 'type', label: 'Tipo', width: 'w-32' },
    { key: 'discount', label: 'Desconto', width: 'w-32' },
    { key: 'period', label: 'Período', width: 'w-48' },
    { key: 'usage', label: 'Uso', width: 'w-32' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'actions', label: 'Ações', width: 'w-32' }
  ];

  const renderCell = (promotion: any, column: any) => {
    switch (column.key) {
      case 'promotion':
        return (
          <div>
            <div className="font-medium text-gray-900">{promotion.name}</div>
            <div className="text-sm text-gray-500">Código: {promotion.code}</div>
            <div className="text-xs text-gray-400">{promotion.restaurants}</div>
          </div>
        );
      case 'type':
        return (
          <Badge variant="outline" className="text-xs">
            {promotion.type}
          </Badge>
        );
      case 'discount':
        return (
          <div className="flex items-center gap-1 text-sm font-medium text-green-600">
            <Percent className="w-3 h-3" />
            {promotion.discount}
          </div>
        );
      case 'period':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-3 h-3" />
              {promotion.startDate}
            </div>
            <div className="text-sm text-gray-500">até {promotion.endDate}</div>
          </div>
        );
      case 'usage':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <Target className="w-3 h-3" />
              <span className="font-medium">{promotion.usedCount}</span>
              <span className="text-gray-500">/ {promotion.usageLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full" 
                style={{ width: `${(promotion.usedCount / promotion.usageLimit) * 100}%` }}
              ></div>
            </div>
          </div>
        );
      case 'status':
        return (
          <Badge 
            variant={promotion.status === 'Ativo' ? 'default' : 'secondary'}
            className={`text-xs ${
              promotion.status === 'Ativo' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`}
          >
            {promotion.status}
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
        return promotion[column.key];
    }
  };

  const filteredPromotions = promotions.filter(promotion =>
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promotion.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promoções</h1>
          <p className="text-gray-600 mt-1">Gerencie cupons e ofertas especiais</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Promoção
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar promoções..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">12</div>
          <p className="text-sm text-gray-600">Promoções Ativas</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">R$ 12.5k</div>
          <p className="text-sm text-gray-600">Economia Gerada</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">1.847</div>
          <p className="text-sm text-gray-600">Cupons Utilizados</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">67%</div>
          <p className="text-sm text-gray-600">Taxa de Conversão</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lista de Promoções ({filteredPromotions.length})
          </h3>
          <DataTable
            data={filteredPromotions}
            columns={columns}
            renderCell={renderCell}
          />
        </div>
      </div>
    </div>
  );
}
