import React, { useEffect, useState } from 'react';
import { 
  User, 
  Lock, 
  Truck, 
  DollarSign, 
  CreditCard, 
  Globe, 
  Bell, 
  Shield, 
  Save, 
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ChevronRight,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', name: 'Admin Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'shipping', name: 'Shipping & Tax', icon: Truck },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your admin profile and global store settings</p>
        </div>
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4" /> Settings updated successfully!
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 shrink-0">
          <nav className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#f37021] text-white shadow-lg shadow-orange-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          {activeTab === 'profile' && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Admin Profile</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative group overflow-hidden">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="text-xs font-bold text-white">Change</button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">{user?.fullName || 'Admin User'}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p className="text-xs font-bold text-[#f37021] uppercase tracking-widest mt-2">{user?.role || 'Administrator'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.fullName}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#f37021] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#f37021] outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#f37021] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#e56a17] transition-all disabled:opacity-50 shadow-lg shadow-orange-100"
                >
                  {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </section>
          )}

          {activeTab === 'security' && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4 max-w-md">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#f37021] outline-none pr-10"
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#f37021] outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#f37021] outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-700">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Enable 2FA</p>
                        <p className="text-xs text-gray-500">Secure your account with an extra layer of protection.</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-[#f37021] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#e56a17] transition-all shadow-lg shadow-orange-100"
                >
                  Update Password
                </button>
              </div>
            </section>
          )}

          {activeTab === 'shipping' && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Shipping & Tax Configuration</h2>
              </div>
              <div className="p-6 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-700">Shipping Zones</h3>
                    <button className="text-xs font-bold text-[#f37021] hover:underline flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Zone
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Domestic (USA)', cost: '$5.00', free: 'Over $50' },
                      { name: 'International', cost: '$15.00', free: 'Over $150' },
                    ].map((zone) => (
                      <div key={zone.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{zone.name}</p>
                            <p className="text-xs text-gray-500">Flat Rate: {zone.cost} • Free {zone.free}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-700">Tax Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Default Tax Rate (%)</label>
                      <input 
                        type="number" 
                        defaultValue="8.5"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#f37021] outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input type="checkbox" id="tax-inclusive" className="w-4 h-4 rounded border-gray-300 text-[#f37021] focus:ring-[#f37021]" />
                      <label htmlFor="tax-inclusive" className="text-sm font-medium text-gray-700">Prices include tax</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-[#f37021] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#e56a17] transition-all shadow-lg shadow-orange-100"
                >
                  Save Shipping Settings
                </button>
              </div>
            </section>
          )}

          {activeTab === 'payment' && (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Payment Gateways</h2>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { name: 'Stripe', status: 'Connected', icon: '💳' },
                  { name: 'PayPal', status: 'Connected', icon: '🅿️' },
                  { name: 'Apple Pay', status: 'Disconnected', icon: '🍎' },
                ].map((gateway) => (
                  <div key={gateway.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                        {gateway.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{gateway.name}</p>
                        <p className={`text-xs font-bold ${gateway.status === 'Connected' ? 'text-green-500' : 'text-gray-400'}`}>
                          {gateway.status}
                        </p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                      gateway.status === 'Connected' 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-[#f37021] text-white hover:bg-[#e56a17]'
                    }`}>
                      {gateway.status === 'Connected' ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Edit2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
