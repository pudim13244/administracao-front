
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Bell, Shield, CreditCard, Globe, Truck } from 'lucide-react';

export function SettingsManagement() {
  const [settings, setSettings] = useState({
    siteName: 'DeliveryApp',
    siteDescription: 'O melhor app de delivery da cidade',
    deliveryFee: '5.90',
    minOrderValue: '15.00',
    maxDeliveryDistance: '10',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    autoApproveRestaurants: false,
    autoApproveDeliverers: false,
    maintenanceMode: false
  });

  const handleSave = () => {
    // Função para salvar configurações
    console.log('Configurações salvas:', settings);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie as configurações da plataforma</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Settings className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="delivery">Entrega</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Informações Gerais
              </CardTitle>
              <CardDescription>
                Configure as informações básicas da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome da Plataforma</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Valor Mínimo do Pedido</Label>
                  <Input
                    id="minOrderValue"
                    value={settings.minOrderValue}
                    onChange={(e) => setSettings({...settings, minOrderValue: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modo de Manutenção</CardTitle>
              <CardDescription>
                Ative para colocar a plataforma em manutenção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
                <Label htmlFor="maintenanceMode">Ativar modo de manutenção</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Configurações de Entrega
              </CardTitle>
              <CardDescription>
                Configure as regras de entrega da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Taxa de Entrega Padrão (R$)</Label>
                  <Input
                    id="deliveryFee"
                    value={settings.deliveryFee}
                    onChange={(e) => setSettings({...settings, deliveryFee: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDeliveryDistance">Distância Máxima (km)</Label>
                  <Input
                    id="maxDeliveryDistance"
                    value={settings.maxDeliveryDistance}
                    onChange={(e) => setSettings({...settings, maxDeliveryDistance: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure as notificações da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-gray-500">Enviar notificações por email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-gray-500">Enviar notificações por SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-gray-500">Enviar notificações push</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança e Aprovações
              </CardTitle>
              <CardDescription>
                Configure as políticas de segurança da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aprovação Automática de Restaurantes</Label>
                  <p className="text-sm text-gray-500">Aprovar restaurantes automaticamente</p>
                </div>
                <Switch
                  checked={settings.autoApproveRestaurants}
                  onCheckedChange={(checked) => setSettings({...settings, autoApproveRestaurants: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aprovação Automática de Entregadores</Label>
                  <p className="text-sm text-gray-500">Aprovar entregadores automaticamente</p>
                </div>
                <Switch
                  checked={settings.autoApproveDeliverers}
                  onCheckedChange={(checked) => setSettings({...settings, autoApproveDeliverers: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Métodos de Pagamento
              </CardTitle>
              <CardDescription>
                Configure os métodos de pagamento aceitos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="pix" defaultChecked />
                  <Label htmlFor="pix">PIX</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="credit" defaultChecked />
                  <Label htmlFor="credit">Cartão de Crédito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="debit" defaultChecked />
                  <Label htmlFor="debit">Cartão de Débito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="cash" />
                  <Label htmlFor="cash">Dinheiro</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
