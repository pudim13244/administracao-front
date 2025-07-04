
import { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Calendar, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

export function FinancialManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'Comissão Pedido',
      orderId: '#ORD-1847',
      restaurant: 'Burger King Centro',
      amount: 'R$ 4.50',
      status: 'Processado',
      date: '2024-02-15 14:30',
      paymentMethod: 'PIX'
    },
    {
      id: 2,
      type: 'Taxa Entrega',
      orderId: '#ORD-1846',
      restaurant: 'Pizzaria Bella',
      amount: 'R$ 6.90',
      status: 'Pendente',
      date: '2024-02-15 14:15',
      paymentMethod: 'Cartão'
    },
    {
      id: 3,
      type: 'Publicidade',
      orderId: '#AD-234',
      restaurant: 'Sushi House',
      amount: 'R$ 125.00',
      status: 'Processado',
      date: '2024-02-15 13:45',
      paymentMethod: 'Transferência'
    }
  ];

  const columns = [
    { key: 'transaction', label: 'Transação', width: 'w-64' },
    { key: 'restaurant', label: 'Restaurante', width: 'w-48' },
    { key: 'amount', label: 'Valor', width: 'w-32' },
    { key: 'method', label: 'Método', width: 'w-32' },
    { key: 'date', label: 'Data', width: 'w-40' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'actions', label: 'Ações', width: 'w-32' }
  ];

  const renderCell = (transaction: any, column: any) => {
    switch (column.key) {
      case 'transaction':
        return (
          <div>
            <div className="font-medium text-gray-900">{transaction.type}</div>
            <div className="text-sm text-gray-500">{transaction.orderId}</div>
          </div>
        );
      case 'restaurant':
        return (
          <div className="text-sm text-gray-900">{transaction.restaurant}</div>
        );
      case 'amount':
        return (
          <div className="flex items-center gap-1 text-sm font-medium text-green-600">
            <DollarSign className="w-3 h-3" />
            {transaction.amount}
          </div>
        );
      case 'method':
        return (
          <Badge variant="outline" className="text-xs">
            {transaction.paymentMethod}
          </Badge>
        );
      case 'date':
        return (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="w-3 h-3" />
            {transaction.date}
          </div>
        );
      case 'status':
        return (
          <Badge 
            variant={transaction.status === 'Processado' ? 'default' : 'secondary'}
            className={`text-xs ${
              transaction.status === 'Processado' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`}
          >
            {transaction.status}
          </Badge>
        );
      case 'actions':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Ver
            </Button>
          </div>
        );
      default:
        return transaction[column.key];
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-1">Controle financeiro e relatórios</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar transações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">R$ 45.2k</div>
              <p className="text-sm text-gray-600">Receita do Mês</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">R$ 12.8k</div>
              <p className="text-sm text-gray-600">Comissões</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">R$ 8.9k</div>
              <p className="text-sm text-gray-600">Taxas de Entrega</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">R$ 23.5k</div>
              <p className="text-sm text-gray-600">Publicidade</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita dos Últimos 7 Dias</h3>
        <div className="h-64 flex items-end justify-between gap-4">
          {[45, 52, 48, 61, 55, 67, 58].map((height, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div 
                className="bg-blue-500 rounded-t w-8 transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${height * 2}px` }}
              ></div>
              <span className="text-xs text-gray-500">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transações Recentes ({filteredTransactions.length})
          </h3>
          <DataTable
            data={filteredTransactions}
            columns={columns}
            renderCell={renderCell}
          />
        </div>
      </div>
    </div>
  );
}
