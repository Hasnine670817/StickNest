import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const topProducts = [
  { name: 'Die Cut Stickers', sales: 1240, growth: '+12.5%', image: 'https://picsum.photos/seed/sticker1/100/100' },
  { name: 'Vinyl Lettering', sales: 890, growth: '+8.2%', image: 'https://picsum.photos/seed/sticker2/100/100' },
  { name: 'Clear Stickers', sales: 750, growth: '-2.4%', image: 'https://picsum.photos/seed/sticker3/100/100' },
  { name: 'Holographic Stickers', sales: 620, growth: '+15.1%', image: 'https://picsum.photos/seed/sticker4/100/100' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => setRecentOrders(data.slice(0, 5)))
      .catch(err => console.error(err));

    fetch('/api/admin/chart-data')
      .then(res => res.json())
      .then(data => setChartData(data.map((d: any) => ({
        name: new Date(2026, parseInt(d.month) - 1).toLocaleString('default', { month: 'short' }),
        revenue: d.revenue
      }))))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalSales.toLocaleString()}`} 
          change="+12.5%" 
          isPositive={true} 
          icon={TrendingUp} 
          color="blue"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders.toString()} 
          change="+8.2%" 
          isPositive={true} 
          icon={ShoppingCart} 
          color="orange"
        />
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers.toString()} 
          change="+5.1%" 
          isPositive={true} 
          icon={Users} 
          color="green"
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders.toString()} 
          change="-2.4%" 
          isPositive={false} 
          icon={Clock} 
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Analytics</h2>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f37021" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f37021" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f37021" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-[#f37021] hover:underline">
            View All Orders <ExternalLink className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#ORD-{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]">{order.items_summary}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${(order.total_amount || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}
