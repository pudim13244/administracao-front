
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
};

export function MetricsCard({ title, value, change, changeType, icon: Icon, color }: MetricsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg border ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${changeType === 'positive' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
          }
        `}>
          {change}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
