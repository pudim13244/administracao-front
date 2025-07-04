import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

interface RestaurantFormProps {
  restaurant?: any;
  onClose: () => void;
  onSave: () => void;
}

const paymentOptions = [
  { value: 'CASH', label: 'Dinheiro' },
  { value: 'PIX', label: 'Pix' },
  { value: 'CREDIT', label: 'Cartão de Crédito' },
  { value: 'DEBIT', label: 'Cartão de Débito' }
];

const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function RestaurantForm({ restaurant, onClose, onSave }: RestaurantFormProps) {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    restaurant_name: '',
    cuisine_type: '',
    delivery_fee: '',
    minimum_order: '',
    description: '',
    delivery_radius: '',
    pix_key: '',
    instagram: '',
    whatsapp: '',
    logo_url: '',
    banner_url: '',
    accepted_payment_methods: ["CASH", "PIX", "CREDIT", "DEBIT"],
    only_linked_delivery: false
  });

  const [businessHours, setBusinessHours] = useState<{day_of_week: number, open_time: string, close_time: string}[]>(
    Array.from({length: 7}, (_, i) => ({ day_of_week: i+1, open_time: '', close_time: '' }))
  );

  // Memoizar dados iniciais para evitar re-renderizações
  const initialFormData = useMemo(() => ({
    restaurant_name: '',
    cuisine_type: '',
    delivery_fee: '',
    minimum_order: '',
    description: '',
    delivery_radius: '',
    pix_key: '',
    instagram: '',
    whatsapp: '',
    logo_url: '',
    banner_url: '',
    accepted_payment_methods: ["CASH", "PIX", "CREDIT", "DEBIT"],
    only_linked_delivery: false
  }), []);

  const initialBusinessHours = useMemo(() => 
    Array.from({length: 7}, (_, i) => ({ day_of_week: i+1, open_time: '', close_time: '' })), 
    []
  );

  // Carregar dados do restaurante
  useEffect(() => {
    if (!restaurant?.id) {
      setFormData(initialFormData);
      setBusinessHours(initialBusinessHours);
      return;
    }

    const loadRestaurantData = async () => {
      try {
        const [profileRes, hoursRes] = await Promise.all([
          fetch(`http://localhost:3001/restaurants/${restaurant.id}/profile`),
          fetch(`http://localhost:3001/restaurants/${restaurant.id}/business-hours`)
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setFormData({
            restaurant_name: profileData.restaurant_name || '',
            cuisine_type: profileData.cuisine_type || '',
            delivery_fee: profileData.delivery_fee?.toString() || '',
            minimum_order: profileData.minimum_order?.toString() || '',
            description: profileData.description || '',
            delivery_radius: profileData.delivery_radius?.toString() || '',
            pix_key: profileData.pix_key || '',
            instagram: profileData.instagram || '',
            whatsapp: profileData.whatsapp || '',
            logo_url: profileData.logo_url || '',
            banner_url: profileData.banner_url || '',
            accepted_payment_methods: profileData.accepted_payment_methods ? JSON.parse(profileData.accepted_payment_methods) : ["CASH", "PIX", "CREDIT", "DEBIT"],
            only_linked_delivery: !!profileData.only_linked_delivery
          });
        }

        if (hoursRes.ok) {
          const hoursData = await hoursRes.json();
          setBusinessHours(prev =>
            prev.map(dia => {
              const found = hoursData.find((h: any) => Number(h.day_of_week) === dia.day_of_week);
              return found ? { ...dia, open_time: found.open_time, close_time: found.close_time } : dia;
            })
          );
        }
      } catch (error) {
        console.error('Erro ao carregar dados do restaurante:', error);
        toast.error('Erro ao carregar dados do restaurante');
      }
    };

    loadRestaurantData();
  }, [restaurant?.id, initialFormData, initialBusinessHours]);

  // Handlers memoizados
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  }, []);

  const handlePaymentChange = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      accepted_payment_methods: prev.accepted_payment_methods.includes(value)
        ? prev.accepted_payment_methods.filter((v: string) => v !== value)
        : [...prev.accepted_payment_methods, value]
    }));
  }, []);

  const handleHourChange = useCallback((idx: number, field: 'open_time' | 'close_time', value: string) => {
    setBusinessHours(prev => prev.map((h, i) => i === idx ? { ...h, [field]: value } : h));
  }, []);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      // Atualiza perfil
      const response = await fetch(`http://localhost:3001/restaurants/${restaurant.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant_name: formData.restaurant_name,
          cuisine_type: formData.cuisine_type,
          delivery_fee: parseFloat(formData.delivery_fee) || 0,
          minimum_order: parseFloat(formData.minimum_order) || 0,
          description: formData.description,
          delivery_radius: parseInt(formData.delivery_radius) || 5,
          pix_key: formData.pix_key,
          instagram: formData.instagram,
          whatsapp: formData.whatsapp,
          logo_url: formData.logo_url,
          banner_url: formData.banner_url,
          accepted_payment_methods: formData.accepted_payment_methods,
          only_linked_delivery: formData.only_linked_delivery ? 1 : 0
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar restaurante');
      }

      // Atualiza horários
      const businessHoursToSend = businessHours.filter(
        h => h.open_time && h.close_time
      );
      const hoursResponse = await fetch(`http://localhost:3001/restaurants/${restaurant.id}/business-hours`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessHours: businessHoursToSend }),
      });

      if (!hoursResponse.ok) {
        throw new Error('Erro ao atualizar horários');
      }

      toast.success('Restaurante atualizado com sucesso!');
      
      // Aguarda um pouco antes de fechar para garantir que o toast seja exibido
      setTimeout(() => {
        setLoading(false);
        setIsSubmitting(false);
        onSave();
        onClose();
      }, 1500);

    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao conectar com o servidor');
      setLoading(false);
      setIsSubmitting(false);
    }
  }, [restaurant?.id, formData, businessHours, isSubmitting, onSave, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '64rem',
        maxHeight: '90vh',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            {restaurant ? 'Editar Restaurante' : 'Novo Restaurante'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            style={{
              background: 'none',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              color: '#6b7280'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          flex: 1
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Informações Básicas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Nome do Restaurante *
                </label>
                <input
                  type="text"
                  name="restaurant_name"
                  value={formData.restaurant_name}
                  onChange={handleChange}
                  placeholder="Nome do restaurante"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Tipo de Cozinha *
                </label>
                <input
                  type="text"
                  name="cuisine_type"
                  value={formData.cuisine_type}
                  onChange={handleChange}
                  placeholder="Ex: Italiana, Japonesa, Brasileira"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
            </div>

            {/* Configurações de Entrega */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Taxa de Entrega (R$) *
                </label>
                <input
                  type="number"
                  name="delivery_fee"
                  step="0.01"
                  min="0"
                  value={formData.delivery_fee}
                  onChange={handleChange}
                  placeholder="5.00"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Pedido Mínimo (R$) *
                </label>
                <input
                  type="number"
                  name="minimum_order"
                  step="0.01"
                  min="0"
                  value={formData.minimum_order}
                  onChange={handleChange}
                  placeholder="20.00"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Raio de Entrega (km) *
                </label>
                <input
                  type="number"
                  name="delivery_radius"
                  min="1"
                  max="50"
                  value={formData.delivery_radius}
                  onChange={handleChange}
                  placeholder="5"
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Horário de Funcionamento
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.5rem' }}>
                {businessHours.map((h, idx) => (
                  <div key={`hour-${h.day_of_week}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '5rem', fontSize: '0.875rem' }}>{dias[h.day_of_week - 1]}</span>
                    <input
                      type="time"
                      value={h.open_time}
                      onChange={e => handleHourChange(idx, 'open_time', e.target.value)}
                      disabled={isSubmitting}
                      style={{
                        width: '7rem',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                      }}
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={h.close_time}
                      onChange={e => handleHourChange(idx, 'close_time', e.target.value)}
                      disabled={isSubmitting}
                      style={{
                        width: '7rem',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {(!h.open_time || !h.close_time) && 'Fechado'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva seu restaurante..."
                rows={3}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: isSubmitting ? '#f3f4f6' : 'white',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Informações de Contato */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@restaurante"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
            </div>

            {/* Chave PIX */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Chave PIX *
              </label>
              <input
                type="text"
                name="pix_key"
                value={formData.pix_key}
                onChange={handleChange}
                placeholder="Chave PIX para pagamentos"
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                }}
              />
            </div>

            {/* URLs de Imagens */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  URL do Logo
                </label>
                <input
                  type="text"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleChange}
                  placeholder="URL da imagem do logo"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  URL do Banner
                </label>
                <input
                  type="text"
                  name="banner_url"
                  value={formData.banner_url}
                  onChange={handleChange}
                  placeholder="URL da imagem do banner"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: isSubmitting ? '#f3f4f6' : 'white'
                  }}
                />
              </div>
            </div>

            {/* Métodos de Pagamento */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                Métodos de Pagamento Aceitos
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {paymentOptions.map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.accepted_payment_methods.includes(opt.value)}
                      onChange={() => handlePaymentChange(opt.value)}
                      disabled={isSubmitting}
                      style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Só entregadores vinculados */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                <input
                  type="checkbox"
                  name="only_linked_delivery"
                  checked={formData.only_linked_delivery}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                />
                Permitir apenas entregadores vinculados
              </label>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  backgroundColor: loading ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 