import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Samples from './pages/Samples';
import Stickers from './pages/Stickers';
import Labels from './pages/Labels';
import Magnets from './pages/Magnets';
import Buttons from './pages/Buttons';
import Packaging from './pages/Packaging';
import Apparel from './pages/Apparel';
import Acrylics from './pages/Acrylics';
import MoreProducts from './pages/MoreProducts';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/samples" element={<Samples />} />
              <Route path="/stickers" element={<Stickers />} />
              <Route path="/labels" element={<Labels />} />
              <Route path="/magnets" element={<Magnets />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/packaging" element={<Packaging />} />
              <Route path="/apparel" element={<Apparel />} />
              <Route path="/acrylics" element={<Acrylics />} />
              <Route path="/more-products" element={<MoreProducts />} />
              
              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
