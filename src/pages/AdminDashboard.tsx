import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, Clock, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stats {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Sales', value: `$${Math.round(stats?.totalSales || 0)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Pending Orders', value: stats?.pendingOrders || 0, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="flex-1 bg-[#f4f4f4] py-12 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-[#333333]">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store and monitor performance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bg}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-[#333333]">{card.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-[#333333] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/admin/orders" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-bold text-[#333333]">Manage Orders</span>
              </Link>
              <Link to="/admin/users" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-bold text-[#333333]">Manage Users</span>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-[#333333] mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Database Connection</span>
                </div>
                <span className="text-xs font-bold text-green-600 uppercase">Online</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">API Server</span>
                </div>
                <span className="text-xs font-bold text-green-600 uppercase">Stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
