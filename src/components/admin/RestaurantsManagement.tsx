import { useEffect, useState, useCallback, useMemo } from 'react';
import { DataTable } from './DataTable';
import { Search, Filter, Eye, Edit, ToggleLeft, ToggleRight, Building2, Phone, Mail, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RestaurantForm } from './forms/RestaurantForm';
import { toast } from 'sonner';

export function RestaurantsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Memoizar colunas para evitar re-renderizações
  const columns = useMemo(() => [
    { key: 'name', label: 'Restaurante', width: 'w-40' },
    { key: 'city', label: 'Cidade', width: 'w-28' },
    { key: 'category', label: 'Categoria', width: 'w-28' },
    { key: 'rating', label: 'Avaliação', width: 'w-24' },
    { key: 'orders', label: 'Pedidos', width: 'w-20' },
    { key: 'commission', label: 'Comissão', width: 'w-24' },
    { key: 'avg_time', label: 'Tempo Médio', width: 'w-28' },
    { key: 'status', label: 'Status', width: 'w-24' },
    { key: 'actions', label: 'Ações', width: 'w-32' },
  ], []);

  // Memoizar restaurantes filtrados
  const filteredRestaurants = useMemo(() => {
    if (!Array.isArray(restaurants)) return [];
    
    return restaurants.filter(r => {
      const matchesSearch =
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || r.status?.toLowerCase() === (statusFilter === 'active' ? 'ativo' : 'inativo');
      return matchesSearch && matchesStatus;
    });
  }, [restaurants, searchTerm, statusFilter]);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/restaurants');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar restaurantes:', error);
      toast.error('Erro ao carregar restaurantes');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleToggleStatus = useCallback(async (restaurant: any) => {
    try {
      const newStatus = restaurant.status === 'Ativo' ? 'inactive' : 'active';
      const response = await fetch(`http://localhost:3001/restaurants/${restaurant.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        fetchRestaurants(); // Recarregar lista
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erro ao alterar status');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor');
    }
  }, [fetchRestaurants]);

  const handleEdit = useCallback(async (restaurant: any) => {
    try {
      const response = await fetch(`http://localhost:3001/restaurants/${restaurant.id}`);
      if (response.ok) {
        const restaurantData = await response.json();
        setSelectedRestaurant(restaurantData);
        setShowForm(true);
      } else {
        toast.error('Erro ao carregar dados do restaurante');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor');
    }
  }, []);

  const handleViewDetails = useCallback(async (restaurant: any) => {
    try {
      const response = await fetch(`http://localhost:3001/restaurants/${restaurant.id}`);
      if (response.ok) {
        const restaurantData = await response.json();
        setSelectedRestaurant(restaurantData);
        setShowDetails(true);
      } else {
        toast.error('Erro ao carregar dados do restaurante');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor');
    }
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setSelectedRestaurant(null);
  }, []);

  const handleSaveForm = useCallback(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const getStatusColor = useCallback((status: string) => {
    return status === 'Ativo' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }, []);

  const getStatusText = useCallback((status: string) => {
    return status === 'Ativo' ? 'Ativo' : 'Inativo';
  }, []);

  // Memoizar função de renderização de células
  const renderCell = useCallback((item: any, column: any) => {
    switch (column.key) {
      case 'rating':
        return (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{item.rating}</span>
          </div>
        );
      case 'status':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
            {getStatusText(item.status)}
          </span>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-1 h-8 w-8"
              onClick={() => handleViewDetails(item)}
              title="Ver detalhes"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-1 h-8 w-8"
              onClick={() => handleEdit(item)}
              title="Editar"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-1 h-8 w-8"
              onClick={() => handleToggleStatus(item)}
              title={item.status === 'Ativo' ? 'Desativar' : 'Ativar'}
            >
              {item.status === 'Ativo' ? 
                <ToggleRight className="w-4 h-4 text-green-600" /> : 
                <ToggleLeft className="w-4 h-4 text-gray-400" />
              }
            </Button>
          </div>
        );
      default:
        return item[column.key];
    }
  }, [handleViewDetails, handleEdit, handleToggleStatus, getStatusColor, getStatusText]);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Restaurantes</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os restaurantes da plataforma</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Aprovar Restaurante
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar restaurantes..."
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
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">Carregando restaurantes...</div>
        ) : (
          <DataTable
            data={filteredRestaurants}
            columns={columns}
            renderCell={renderCell}
          />
        )}
      </div>

      {/* Restaurant Form Modal */}
      {showForm && selectedRestaurant && (
        <RestaurantForm
          restaurant={selectedRestaurant}
          onClose={handleCloseForm}
          onSave={handleSaveForm}
        />
      )}

      {/* Restaurant Details Modal */}
      {showDetails && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {selectedRestaurant.name}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Cidade</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedRestaurant.city}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Categoria</Label>
                  <Badge variant="secondary">{selectedRestaurant.category}</Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Avaliação</Label>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{selectedRestaurant.rating}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRestaurant.status)}`}>
                    {getStatusText(selectedRestaurant.status)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Total de Pedidos</Label>
                  <span className="text-lg font-semibold">{selectedRestaurant.orders}</span>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Comissão</Label>
                  <span className="text-lg font-semibold">R$ {selectedRestaurant.commission}</span>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Tempo Médio</Label>
                  <span className="text-lg font-semibold">{selectedRestaurant.avg_time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
