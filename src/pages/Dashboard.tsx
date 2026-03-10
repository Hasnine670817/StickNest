import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, ChevronRight } from 'lucide-react';

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items_summary: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/api/orders/${user.id}`);
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
  }, [user]);

  return (
    <div className="flex-1 bg-[#f4f4f4] py-12 px-4 sm:px-8">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#333333]">Hi, {user?.fullName || 'there'}!</h1>
            <p className="text-gray-600">Welcome back to your dashboard.</p>
          </div>
          <button 
            onClick={logout}
            className="bg-white border border-gray-300 text-[#333333] px-6 py-2 rounded font-bold hover:bg-gray-50 transition-colors self-start md:self-center"
          >
            Log out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#333333]">Recent Orders</h2>
                <span className="text-sm text-[#0066cc] font-bold cursor-pointer hover:underline">View all</span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  <div className="p-12 text-center text-gray-500">Loading your orders...</div>
                ) : orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                    <button className="bg-[#f37021] text-white px-6 py-2 rounded font-bold hover:bg-[#e0661e] transition-colors">
                      Start shopping
                    </button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <span className="font-bold text-[#333333]">Order #{order.id}</span>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {new Date(order.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-[#333333]">${Math.round(order.total_price)}</div>
                            <div className="flex items-center gap-1 text-[11px] font-bold text-green-600 uppercase tracking-wider">
                              <CheckCircle className="w-3 h-3" />
                              {order.status}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {order.items_summary}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Account Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-[#333333] mb-4">Account Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                  <p className="text-[#333333] font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                  <p className="text-[#333333] font-medium">{user?.email}</p>
                </div>
                <button className="w-full mt-4 text-sm text-[#0066cc] font-bold hover:underline text-left">
                  Edit profile
                </button>
              </div>
            </div>

            <div className="bg-[#333333] rounded-xl shadow-sm p-6 text-white">
              <h3 className="font-bold mb-2">Need help?</h3>
              <p className="text-sm text-gray-300 mb-6">Our support team is available 24/7 to assist you with your orders.</p>
              <button className="w-full bg-white text-[#333333] py-2 rounded font-bold hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
