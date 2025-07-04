
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';

interface DelivererFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function DelivererForm({ onSubmit, onCancel }: DelivererFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    vehicleType: '',
    vehiclePlate: '',
    cnh: '',
    bankAccount: '',
    bankAgency: '',
    bankName: '',
    pixKey: '',
    address: '',
    city: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    isActive: true,
    hasOwnVehicle: true,
    documents: {
      cpfDocument: null,
      cnhDocument: null,
      vehicleDocument: null,
      profilePhoto: null
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Entregador</CardTitle>
        <CardDescription>
          Cadastre um novo entregador na plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: João Silva Santos"
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
                  placeholder="joao@email.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações do Veículo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações do Veículo</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="hasOwnVehicle"
                checked={formData.hasOwnVehicle}
                onCheckedChange={(checked) => handleInputChange('hasOwnVehicle', checked)}
              />
              <Label htmlFor="hasOwnVehicle">Possui veículo próprio</Label>
            </div>
            {formData.hasOwnVehicle && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Veículo</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bike">Bicicleta</SelectItem>
                      <SelectItem value="motorcycle">Moto</SelectItem>
                      <SelectItem value="car">Carro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate">Placa do Veículo</Label>
                  <Input
                    id="vehiclePlate"
                    value={formData.vehiclePlate}
                    onChange={(e) => handleInputChange('vehiclePlate', e.target.value)}
                    placeholder="ABC-1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnh">CNH</Label>
                  <Input
                    id="cnh"
                    value={formData.cnh}
                    onChange={(e) => handleInputChange('cnh', e.target.value)}
                    placeholder="12345678901"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Informações Bancárias */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Bancárias</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Banco</Label>
                <Select value={formData.bankName} onValueChange={(value) => handleInputChange('bankName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bradesco">Bradesco</SelectItem>
                    <SelectItem value="itau">Itaú</SelectItem>
                    <SelectItem value="bb">Banco do Brasil</SelectItem>
                    <SelectItem value="santander">Santander</SelectItem>
                    <SelectItem value="caixa">Caixa</SelectItem>
                    <SelectItem value="nubank">Nubank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAgency">Agência</Label>
                <Input
                  id="bankAgency"
                  value={formData.bankAgency}
                  onChange={(e) => handleInputChange('bankAgency', e.target.value)}
                  placeholder="1234"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Conta</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  placeholder="12345-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pixKey">Chave PIX</Label>
                <Input
                  id="pixKey"
                  value={formData.pixKey}
                  onChange={(e) => handleInputChange('pixKey', e.target.value)}
                  placeholder="CPF, email ou telefone"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Endereço</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Rua, número, bairro"
                  rows={2}
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contato de Emergência */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contato de Emergência</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Nome do Contato</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Maria Silva Santos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Telefone do Contato</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Upload de Documentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documentos</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'profilePhoto', label: 'Foto de Perfil' },
                { key: 'cpfDocument', label: 'Documento CPF' },
                { key: 'cnhDocument', label: 'CNH' },
                { key: 'vehicleDocument', label: 'Documento do Veículo' }
              ].map((doc) => (
                <div key={doc.key} className="space-y-2">
                  <Label>{doc.label}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                      className="hidden"
                      id={`${doc.key}-upload`}
                    />
                    <label htmlFor={`${doc.key}-upload`} className="cursor-pointer">
                      <FileText className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        Upload {doc.label}
                      </p>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Entregador Ativo</Label>
              <p className="text-sm text-gray-500">O entregador poderá receber pedidos</p>
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
              Cadastrar Entregador
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
