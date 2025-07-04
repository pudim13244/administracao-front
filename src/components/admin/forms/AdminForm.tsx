
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

interface AdminFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function AdminForm({ onSubmit, onCancel }: AdminFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    department: '',
    isActive: true,
    permissions: {
      dashboard: false,
      orders: false,
      restaurants: false,
      users: false,
      deliverers: false,
      ads: false,
      promotions: false,
      financial: false,
      settings: false,
      admins: false
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const selectAllPermissions = () => {
    const allSelected = Object.values(formData.permissions).every(p => p);
    const newPermissions = Object.keys(formData.permissions).reduce((acc, key) => {
      acc[key] = !allSelected;
      return acc;
    }, {} as any);
    
    setFormData(prev => ({ ...prev, permissions: newPermissions }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Administrador</CardTitle>
        <CardDescription>
          Adicione um novo administrador à plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: João Silva"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="joao@empresa.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Repita a senha"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Nível de Acesso</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="moderator">Moderador</SelectItem>
                  <SelectItem value="analyst">Analista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <Label>Departamento</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operações</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                  <SelectItem value="support">Suporte</SelectItem>
                  <SelectItem value="tech">Tecnologia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Permissões de Acesso</Label>
              <Button type="button" variant="outline" size="sm" onClick={selectAllPermissions}>
                Selecionar Todas
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => handlePermissionChange(key, checked as boolean)}
                  />
                  <Label htmlFor={key} className="text-sm font-normal capitalize">
                    {key === 'dashboard' ? 'Dashboard' :
                     key === 'orders' ? 'Pedidos' :
                     key === 'restaurants' ? 'Restaurantes' :
                     key === 'users' ? 'Usuários' :
                     key === 'deliverers' ? 'Entregadores' :
                     key === 'ads' ? 'Anúncios' :
                     key === 'promotions' ? 'Promoções' :
                     key === 'financial' ? 'Financeiro' :
                     key === 'settings' ? 'Configurações' :
                     key === 'admins' ? 'Administradores' : key}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Conta Ativa</Label>
              <p className="text-sm text-gray-500">O administrador poderá fazer login</p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Administrador
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
