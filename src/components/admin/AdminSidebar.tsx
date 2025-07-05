import { 
  LayoutDashboard, 
  ShoppingBag, 
  Store, 
  Users, 
  Car,
  Megaphone,
  Gift,
  DollarSign,
  Settings,
  UserCog,
  Bell
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    title: "Pedidos",
    icon: ShoppingBag,
    key: "orders",
  },
  {
    title: "Restaurantes",
    icon: Store,
    key: "restaurants",
  },
  {
    title: "Usuários",
    icon: Users,
    key: "users",
  },
  {
    title: "Entregadores",
    icon: Car,
    key: "deliverers",
  },
  {
    title: "Anúncios",
    icon: Megaphone,
    key: "ads",
  },
  {
    title: "Promoções",
    icon: Gift,
    key: "promotions",
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    key: "financial",
  },
  {
    title: "Configurações",
    icon: Settings,
    key: "settings",
  },
  {
    title: "Administradores",
    icon: UserCog,
    key: "admins",
  },
  {
    title: "Notificações",
    icon: Bell,
    key: "notifications",
  },
];

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Store className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">DeliveryAdmin</h2>
            <p className="text-xs text-gray-500">Painel de Controle</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.key)}
                    className={`
                      w-full justify-start gap-3 p-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${activeSection === item.key 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <item.icon className={`w-4 h-4 ${activeSection === item.key ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
