import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Image as ImageIcon, 
  Star, 
  Ticket, 
  Mail, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  Bell,
  Search,
  User,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { 
    name: 'Products', 
    icon: Package, 
    path: '/admin/products',
    children: [
      { name: 'Stickers', path: '/admin/products?category=stickers' },
      { name: 'Labels', path: '/admin/products?category=labels' },
      { name: 'Magnets', path: '/admin/products?category=magnets' },
      { name: 'Buttons', path: '/admin/products?category=buttons' },
      { name: 'Packaging', path: '/admin/products?category=packaging' },
      { name: 'Apparel', path: '/admin/products?category=apparel' },
      { name: 'Acrylics', path: '/admin/products?category=acrylics' },
      { name: 'Samples', path: '/admin/products?category=samples' },
    ]
  },
  { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Artwork Uploads', icon: ImageIcon, path: '/admin/artworks' },
  { name: 'Reviews', icon: Star, path: '/admin/reviews' },
  { name: 'Discounts / Coupons', icon: Ticket, path: '/admin/coupons' },
  { name: 'Sample Requests', icon: Mail, path: '/admin/samples' },
  { name: 'Content Management', icon: FileText, path: '/admin/content' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className={`bg-[#1a1a1a] text-white w-64 flex flex-col transition-all duration-300 z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${!isSidebarOpen && 'md:w-20'}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800 shrink-0">
          <Link to="/admin" className={`flex items-center gap-2 font-bold text-xl ${!isSidebarOpen && 'md:hidden'}`}>
            <div className="w-8 h-8 bg-[#f37021] rounded flex items-center justify-center text-white">S</div>
            <span>Admin Panel</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-gray-800 rounded hidden md:block">
            <Menu className="w-5 h-5" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-1 hover:bg-gray-800 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-900/20 text-blue-400 mb-4"
          >
            <Home className="w-5 h-5" />
            <span className={`${!isSidebarOpen && 'md:hidden'}`}>Back to Home</span>
          </Link>

          {sidebarItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div>
                  <button 
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-gray-800 ${location.pathname.startsWith(item.path) ? 'bg-[#f37021] text-white' : 'text-gray-400'}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className={`${!isSidebarOpen && 'md:hidden'}`}>{item.name}</span>
                    </div>
                    {isSidebarOpen && <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />}
                  </button>
                  {isProductsOpen && isSidebarOpen && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-800 ${location.pathname === item.path ? 'bg-[#f37021] text-white' : 'text-gray-400'}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className={`${!isSidebarOpen && 'md:hidden'}`}>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-red-900/20 text-red-400 mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${!isSidebarOpen && 'md:hidden'}`}>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#f37021] w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user?.fullName || 'Admin'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className="bg-[#1a1a1a] text-white w-64 h-full" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <Link to="/admin" className="flex items-center gap-2 font-bold text-xl">
                <div className="w-8 h-8 bg-[#f37021] rounded flex items-center justify-center text-white">S</div>
                <span>Admin Panel</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-gray-800 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="mt-4 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button 
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-gray-800 ${location.pathname.startsWith(item.path) ? 'bg-[#f37021] text-white' : 'text-gray-400'}`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isProductsOpen && (
                        <div className="ml-9 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-800 ${location.pathname === item.path ? 'bg-[#f37021] text-white' : 'text-gray-400'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-red-900/20 text-red-400 mt-8"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
