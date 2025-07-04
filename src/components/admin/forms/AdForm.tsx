
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface AdFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function AdForm({ onSubmit, onCancel }: AdFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    position: '',
    targetUrl: '',
    imageUrl: '',
    budget: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    isActive: true,
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aqui seria implementado o upload da imagem
      console.log('Upload da imagem:', file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Anúncio</CardTitle>
        <CardDescription>
          Crie um novo anúncio para a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Anúncio</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: Promoção Especial Pizza"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva o anúncio e sua proposta"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Anúncio</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banner">Banner</SelectItem>
                  <SelectItem value="popup">Pop-up</SelectItem>
                  <SelectItem value="sponsored">Patrocinado</SelectItem>
                  <SelectItem value="native">Nativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Posição</Label>
              <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home-top">Topo da Home</SelectItem>
                  <SelectItem value="home-middle">Meio da Home</SelectItem>
                  <SelectItem value="restaurant-list">Lista de Restaurantes</SelectItem>
                  <SelectItem value="checkout">Checkout</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetUrl">URL de Destino</Label>
            <Input
              id="targetUrl"
              type="url"
              value={formData.targetUrl}
              onChange={(e) => handleInputChange('targetUrl', e.target.value)}
              placeholder="https://exemplo.com/promocao"
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem do Anúncio</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Clique para fazer upload da imagem
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG até 5MB
                </p>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="1000.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Fim</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Público Alvo</Label>
              <Select value={formData.targetAudience} onValueChange={(value) => handleInputChange('targetAudience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o público" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Usuários</SelectItem>
                  <SelectItem value="new">Novos Usuários</SelectItem>
                  <SelectItem value="frequent">Usuários Frequentes</SelectItem>
                  <SelectItem value="inactive">Usuários Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Anúncio Ativo</Label>
              <p className="text-sm text-gray-500">O anúncio será exibido imediatamente</p>
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
              Criar Anúncio
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
