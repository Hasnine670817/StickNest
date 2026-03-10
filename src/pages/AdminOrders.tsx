import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, ChevronRight, ArrowLeft, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  items_summary: string;
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toString().includes(searchTerm) || 
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-12 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center text-[#0066cc] font-bold hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Admin Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-[32px] font-bold text-[#333333]">Manage Orders</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f37021] bg-white w-[250px]"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-bold text-[#333333] hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Items</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">Loading orders...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6 font-bold text-[#333333]">#{order.id}</td>
                      <td className="p-6">
                        <div className="font-bold text-[#333333]">{order.customer_name}</div>
                        <div className="text-xs text-gray-500">{order.customer_email}</div>
                      </td>
                      <td className="p-6">
                        <p className="text-sm text-gray-600 line-clamp-1 max-w-[200px]">
                          {order.items_summary}
                        </p>
                      </td>
                      <td className="p-6 font-bold text-[#333333]">${Math.round(order.total_price)}</td>
                      <td className="p-6">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                          order.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                          order.status === 'shipped' ? 'bg-purple-50 text-purple-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#f37021]"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
