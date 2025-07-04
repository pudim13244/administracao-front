
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PromotionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function PromotionForm({ onSubmit, onCancel }: PromotionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    discountType: '',
    discountValue: '',
    code: '',
    usageLimit: '',
    minOrderValue: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    restaurants: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nova Promoção</CardTitle>
        <CardDescription>
          Crie uma nova promoção para a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Promoção</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Primeira Compra"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Código do Cupom</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Ex: FIRST30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva os detalhes da promoção"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Promoção</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Desconto</SelectItem>
                  <SelectItem value="free-delivery">Frete Grátis</SelectItem>
                  <SelectItem value="cashback">Cashback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Desconto</Label>
              <Select value={formData.discountType} onValueChange={(value) => handleInputChange('discountType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Porcentagem</SelectItem>
                  <SelectItem value="fixed">Valor Fixo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountValue">Valor do Desconto</Label>
              <Input
                id="discountValue"
                value={formData.discountValue}
                onChange={(e) => handleInputChange('discountValue', e.target.value)}
                placeholder="30 ou 15.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usageLimit">Limite de Uso</Label>
              <Input
                id="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => handleInputChange('usageLimit', e.target.value)}
                placeholder="1000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minOrderValue">Pedido Mínimo (R$)</Label>
              <Input
                id="minOrderValue"
                value={formData.minOrderValue}
                onChange={(e) => handleInputChange('minOrderValue', e.target.value)}
                placeholder="25.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {/* Calendar component would go here */}
                  <div className="p-4">Data será implementada com Calendar component</div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Data de Fim</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {/* Calendar component would go here */}
                  <div className="p-4">Data será implementada com Calendar component</div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Restaurantes</Label>
            <Select value={formData.restaurants} onValueChange={(value) => handleInputChange('restaurants', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione os restaurantes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Restaurantes</SelectItem>
                <SelectItem value="selected">Restaurantes Selecionados</SelectItem>
                <SelectItem value="category">Por Categoria</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Promoção
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
