import { useState } from 'react';
import { productService } from '../../services/productService';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/format';

const EMPTY_FORM = { name: '', price: '', category: '', image: '', description: '', available: true, featured: false, badge: '' };
const BADGE_OPTIONS = [
  { value: '',         label: 'Sin badge' },
  { value: 'popular',  label: '🔥 Popular' },
  { value: 'nuevo',    label: '✨ Nuevo' },
  { value: 'oferta',   label: '🏷️ Oferta' },
  { value: 'destacado',label: '⭐ Chef' },
];

const ProductsPage = () => {
  const { showToast } = useApp();
  const [products, setProducts] = useState(() => productService.getProducts());
  const categories = productService.getCategories();
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);

  const refresh = () => setProducts(productService.getProducts());

  const filtered = products.filter(p => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setModal('edit'); };
  const openEdit = (p) => { setForm({ ...p, price: String(p.price) }); setEditId(p.id); setModal('edit'); };

  const handleSave = () => {
    if (!form.name || !form.price || !form.category) {
      showToast('Completa los campos obligatorios', 'error');
      return;
    }
    const data = { ...form, price: parseFloat(form.price) };
    if (editId) {
      productService.updateProduct(editId, data);
      showToast('Producto actualizado');
    } else {
      productService.addProduct(data);
      showToast('Producto agregado');
    }
    refresh();
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    productService.deleteProduct(id);
    refresh();
    showToast('Producto eliminado', 'error');
  };

  const handleToggle = (id) => {
    productService.toggleAvailability(id);
    refresh();
  };

  const handleToggleFeatured = (id) => {
    productService.toggleFeatured(id);
    refresh();
  };

  const handleBadge = (id, badge) => {
    productService.setBadge(id, badge);
    refresh();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Productos</h1>
          <p className="text-gray-500 mt-1">{products.length} productos en la carta</p>
        </div>
        <button onClick={openAdd} className="bg-red-600 text-white font-bold px-5 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 flex items-center gap-2">
          <span className="text-xl">+</span> Nuevo Producto
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500 w-56"
        />
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">Todas las categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Producto</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Categoría</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Precio</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Estado</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Destacar</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Badge</th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => {
              const cat = categories.find(c => c.id === p.category);
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-600">{cat?.icon} {cat?.name}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-bold text-green-600">{formatMoney(p.price)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleToggle(p.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${p.available !== false ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                    >
                      {p.available !== false ? 'Disponible' : 'Agotado'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleToggleFeatured(p.id)}
                      title={p.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${p.featured ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      {p.featured ? '⭐ Sí' : '☆ No'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={p.badge || ''}
                      onChange={e => handleBadge(p.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-xl px-2 py-1.5 outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    >
                      {BADGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">✏️</button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">No se encontraron productos.</p>
        )}
      </div>

      {/* Modal Add/Edit */}
      {modal === 'edit' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-red-500 p-1">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Nombre *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Precio S/. *</label>
                  <input type="number" min="0" step="0.5" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Categoría *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Seleccionar...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">URL de imagen</label>
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Descripción</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Badge / Etiqueta</label>
                  <select value={form.badge || ''} onChange={e => setForm({ ...form, badge: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500">
                    {BADGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-yellow-500" />
                    <span className="text-sm font-bold text-yellow-700">⭐ Mostrar en "Los Más Pedidos"</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all">Cancelar</button>
                <button onClick={handleSave} className="flex-2 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
