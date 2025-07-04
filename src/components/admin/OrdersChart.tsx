import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function OrdersChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/dashboard/weekly')
      .then(res => res.json())
      .then(data => {
        // Ajusta para o formato esperado pelo gráfico
        setData(data.map((d: any) => ({ day: d.day, orders: d.totalOrders })));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="h-64 flex items-center justify-center">Carregando gráfico...</div>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            className="text-sm text-gray-600"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-sm text-gray-600"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="orders" 
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
