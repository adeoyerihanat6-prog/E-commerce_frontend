import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import { MobileGuestBar } from './components/MobileGuestBar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';

// Protected Route Helper for Admins
const AdminRoute = ({ children }) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return user && user.role === 'Admin' ? children : <Navigate to="/" replace />;
};

// Protected Route Helper for Logged-In Users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('velora_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart with localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle adding items to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#09090B] text-white flex flex-col relative selection:bg-violet-500 selection:text-white">
        
        {/* Toast Container */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#18181B',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }} 
        />

        {/* Global Subtle Ambient Glows */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[160px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 blur-[160px] rounded-full pointer-events-none z-0" />

        {/* Navigation Bar */}
        <Navbar 
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)} 
        />

        {/* Floating Mobile Sign Up Bar (Only renders for guests on mobile) */}
        <MobileGuestBar />

        {/* Page Routes */}
        <main className="flex-grow relative z-10 pt-20">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/collections" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* Admin-only Routes */}
            <Route 
              path="/admin/add-product" 
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />

            {/* Fallback Catch-All MUST be last! */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Cart Side Drawer */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart} 
          setCart={setCart} 
        />
      </div>
    </Router>
  );
}