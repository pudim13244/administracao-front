import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Dashboard } from '@/components/admin/Dashboard';
import { OrdersManagement } from '@/components/admin/OrdersManagement';
import { RestaurantsManagement } from '@/components/admin/RestaurantsManagement';
import { UsersManagement } from '@/components/admin/UsersManagement';
import { DeliverersManagement } from '@/components/admin/DeliverersManagement';
import { AdsManagement } from '@/components/admin/AdsManagement';
import { PromotionsManagement } from '@/components/admin/PromotionsManagement';
import { FinancialManagement } from '@/components/admin/FinancialManagement';
import { SettingsManagement } from '@/components/admin/SettingsManagement';
import { AdminsManagement } from '@/components/admin/AdminsManagement';
import { NotificationsManagement } from '@/components/admin/NotificationsManagement';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <OrdersManagement />;
      case 'restaurants':
        return <RestaurantsManagement />;
      case 'users':
        return <UsersManagement />;
      case 'deliverers':
        return <DeliverersManagement />;
      case 'ads':
        return <AdsManagement />;
      case 'promotions':
        return <PromotionsManagement />;
      case 'financial':
        return <FinancialManagement />;
      case 'settings':
        return <SettingsManagement />;
      case 'admins':
        return <AdminsManagement />;
      case 'notifications':
        return <NotificationsManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
