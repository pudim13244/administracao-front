import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const mockNotifications = [
  { id: 1, title: 'Promoção Especial', message: 'Aproveite 20% de desconto hoje!', date: '2024-06-01' },
  { id: 2, title: 'Atualização', message: 'Novo recurso disponível no app.', date: '2024-05-28' },
  { id: 3, title: 'Aviso', message: 'Manutenção programada para amanhã.', date: '2024-05-25' },
];

const destinatarios = [
  { value: 'ALL', label: 'Todos os usuários' },
  { value: 'ESTABLISHMENT', label: 'Apenas estabelecimentos' },
  { value: 'DELIVERY', label: 'Apenas entregadores' },
  { value: 'CUSTOMER', label: 'Apenas clientes' },
  { value: 'CUSTOM', label: 'IDs específicos' },
];

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s atrás`;
  if (diff < 3600) return `${Math.floor(diff/60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h atrás`;
  return date.toLocaleString('pt-BR');
}

export function NotificationsManagement() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetType, setTargetType] = useState('ALL');
  const [customIds, setCustomIds] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewNotif, setViewNotif] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchNotifications = async () => {
    const notifs = await fetch('http://localhost:3001/notifications').then(r => r.json());
    setNotifications(notifs.map(n => ({ id: n.id, title: n.title, message: n.content, date: n.created_at, target: n.target_type })));
  };

  useEffect(() => { fetchNotifications(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          target_type: targetType,
          custom_user_ids: targetType === 'CUSTOM' ? customIds.split(',').map(id => parseInt(id.trim())).filter(Boolean) : undefined,
        })
      });
      if (res.ok) {
        setShowModal(false);
        setTitle('');
        setContent('');
        setTargetType('ALL');
        setCustomIds('');
        await fetchNotifications();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    setViewLoading(true);
    try {
      const notif = await fetch(`http://localhost:3001/notifications/${id}`).then(r => r.json());
      setViewNotif(notif);
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta notificação?')) return;
    setDeleteLoading(true);
    try {
      await fetch(`http://localhost:3001/notifications/${id}`, { method: 'DELETE' });
      setViewNotif(null);
      await fetchNotifications();
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredNotifications = notifications.filter(n =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Notificações</h1>
          <p className="text-gray-500 text-base">Gerencie e envie notificações para os usuários</p>
        </div>
        <Button className="h-10 px-6" onClick={() => setShowModal(true)}>Nova Notificação</Button>
      </div>
      {/* Busca */}
      <div className="mb-6 flex justify-between items-center">
        <Input
          className="w-full max-w-md"
          placeholder="Buscar notificação..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Tabela */}
      <div className="bg-white rounded-lg shadow p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="py-3 px-4 font-semibold">Título</th>
              <th className="py-3 px-4 font-semibold">Mensagem</th>
              <th className="py-3 px-4 font-semibold">Destinatário</th>
              <th className="py-3 px-4 font-semibold">Data</th>
              <th className="py-3 px-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">Nenhuma notificação encontrada.</td>
              </tr>
            )}
            {filteredNotifications.map((n) => (
              <tr key={n.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="py-2 px-4 font-medium max-w-xs truncate" title={n.title}>{n.title}</td>
                <td className="py-2 px-4 max-w-md truncate" title={n.message}>{n.message}</td>
                <td className="py-2 px-4 text-gray-500">{destinatarios.find(d => d.value === n.target)?.label || n.target}</td>
                <td className="py-2 px-4 text-gray-500">{new Date(n.date).toLocaleString('pt-BR')}</td>
                <td className="py-2 px-4">
                  <Button size="sm" variant="outline" onClick={() => handleView(n.id)} disabled={viewLoading}>Ver</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal Nova Notificação */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4" onSubmit={handleCreate}>
            <h2 className="text-xl font-bold mb-2">Nova Notificação</h2>
            <Input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
            <Textarea placeholder="Conteúdo da notificação" value={content} onChange={e => setContent(e.target.value)} required />
            <div>
              <label className="block mb-1 font-medium">Destinatário</label>
              <select className="w-full border rounded px-2 py-2" value={targetType} onChange={e => setTargetType(e.target.value)}>
                {destinatarios.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            {targetType === 'CUSTOM' && (
              <Input placeholder="IDs separados por vírgula" value={customIds} onChange={e => setCustomIds(e.target.value)} />
            )}
            <div className="flex gap-2 justify-end mt-4">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</Button>
            </div>
          </form>
        </div>
      )}
      {/* Modal Visualização */}
      {viewNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-6 relative animate-fade-in">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setViewNotif(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-1 text-gray-900 text-center">{viewNotif.title}</h2>
            <div className="text-gray-700 text-base whitespace-pre-line mb-2 text-center">{viewNotif.content}</div>
            <div className="text-xs text-gray-500 mb-2 text-center">Enviada: {new Date(viewNotif.created_at).toLocaleString('pt-BR')}</div>
            <div className="text-xs text-gray-500 mb-4 text-center">{timeAgo(viewNotif.created_at)}</div>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex gap-12 justify-center items-end w-full">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-600">{viewNotif.total}</span>
                  <span className="text-xs text-gray-500 mt-1">Destinos</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-green-600">{viewNotif.read}</span>
                  <span className="text-xs text-gray-500 mt-1">Visualizaram</span>
                  <span className="text-xs text-gray-400">{viewNotif.total > 0 ? ((viewNotif.read / viewNotif.total * 100).toFixed(1) + '%') : '0%'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-purple-600">{viewNotif.clicked}</span>
                  <span className="text-xs text-gray-500 mt-1">Clicaram</span>
                  <span className="text-xs text-gray-400">{viewNotif.total > 0 ? ((viewNotif.clicked / viewNotif.total * 100).toFixed(1) + '%') : '0%'}</span>
                </div>
              </div>
              {/* Barras de progresso */}
              <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mt-2">
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-gray-500 w-24 text-right">Visualizações</span>
                  <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden mx-2">
                    <div className="bg-green-500 h-2" style={{ width: `${viewNotif.total > 0 ? (viewNotif.read / viewNotif.total * 100) : 0}%` }} />
                  </div>
                  <span className="text-xs text-gray-700 w-8 text-left">{viewNotif.total > 0 ? ((viewNotif.read / viewNotif.total * 100).toFixed(1) + '%') : '0%'}</span>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-gray-500 w-24 text-right">Cliques</span>
                  <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden mx-2">
                    <div className="bg-purple-500 h-2" style={{ width: `${viewNotif.total > 0 ? (viewNotif.clicked / viewNotif.total * 100) : 0}%` }} />
                  </div>
                  <span className="text-xs text-gray-700 w-8 text-left">{viewNotif.total > 0 ? ((viewNotif.clicked / viewNotif.total * 100).toFixed(1) + '%') : '0%'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button variant="destructive" onClick={() => handleDelete(viewNotif.id)} disabled={deleteLoading}>{deleteLoading ? 'Excluindo...' : 'Excluir'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 