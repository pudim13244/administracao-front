import { MetricsCard } from './MetricsCard';
import { OrdersChart } from './OrdersChart';
import { TrendingUp, Users, Store, DollarSign, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [weekly, setWeekly] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/dashboard')
      .then(res => res.json())
      .then(data => setMetrics(data));
    fetch('http://localhost:3001/dashboard/weekly')
      .then(res => res.json())
      .then(data => setWeekly(data));
  }, []);

  if (!metrics) {
    return <div>Carregando...</div>;
  }

  const cards = [
    {
      title: "Pedidos Hoje",
      value: metrics.ordersToday,
      change: metrics.ordersTodayPercent,
      icon: ShoppingBag,
      color: "blue"
    },
    {
      title: "Total de Usuários",
      value: metrics.users,
      change: metrics.usersPercent,
      icon: Users,
      color: "green"
    },
    {
      title: "Restaurantes Ativos",
      value: metrics.restaurants,
      change: "+0", // Se quiser implementar variação, adicione no backend
      icon: Store,
      color: "purple"
    },
    {
      title: "Faturamento Hoje",
      value: `R$ ${Number(metrics.revenueToday).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      change: metrics.revenuePercent,
      icon: DollarSign,
      color: "orange"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do seu app de delivery</p>
        </div>
        <div className="text-sm text-gray-500">
          Atualizado agora há pouco
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-auto ${
                card.change !== undefined && card.change !== null && card.change >= 0
                  ? 'text-green-600 bg-green-50'
                  : 'text-red-600 bg-red-50'
              }`}>
                {card.change !== undefined && card.change !== null
                  ? `${card.change > 0 ? '+' : ''}${Number(card.change).toFixed(0)}%`
                  : '...'}
              </span>
            </div>
            <div className="mt-6">
              <div className="text-gray-600 text-sm">{card.title}</div>
              <div className="text-3xl font-bold text-gray-900">
                {card.value !== undefined && card.value !== null ? card.value : '...'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pedidos por Dia</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              Últimos 7 dias
            </div>
          </div>
          <OrdersChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Faturamento</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <DollarSign className="w-4 h-4" />
              Esta semana
            </div>
          </div>
          <div className="space-y-4">
            {weekly.length === 0 ? (
              <div>Carregando...</div>
            ) : (
              <>
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia, idx) => {
                  const d = weekly.find((w) => w.day === dia) || { totalRevenue: 0 };
                  return (
                    <div key={dia} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{dia}</span>
                      <span className="text-sm font-medium">R$ {Number(d.totalRevenue).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {weekly.reduce((acc, d) => acc + Number(d.totalRevenue), 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

     {/*} {/* Recent Activity 
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Novo pedido #1847</p>
              <p className="text-xs text-gray-500">Pizza Margherita - R$ 32,90</p>
            </div>
            <span className="text-xs text-gray-500">há 2 min</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Restaurante aprovado</p>
              <p className="text-xs text-gray-500">Burger King - Centro</p>
            </div>
            <span className="text-xs text-gray-500">há 15 min</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Usuário cadastrado</p>
              <p className="text-xs text-gray-500">Ana Silva - ana@email.com</p>
            </div>
            <span className="text-xs text-gray-500">há 1 hora</span>
          </div>
        </div>
      </div>*/}
    </div>
  );
}
