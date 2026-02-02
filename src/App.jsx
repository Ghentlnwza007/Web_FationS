
import React, { useState } from 'react';
import { 
  ThemeProvider, 
  CurrencyProvider, 
  AuthProvider, 
  CompareProvider, 
  CartProvider, 
  WishlistProvider,
  OrderProvider,
  ProductProvider
} from './context/Contexts';

// Components
// Components - Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './components/layout/ProtectedRoute.css';

// Components - Common
import ErrorBoundary from './components/common/ErrorBoundary';
import SearchModal from './components/common/SearchModal';
import OrderingGuide from './components/common/OrderingGuide';

// Components - UI
import Toast from './components/ui/Toast';

// Features - Auth
import AuthModal from './features/auth/components/AuthModal';

// Features - Admin
import AdminPanel from './features/admin/dashboard/AdminPanel';

// Features - Shop (Home)
import Hero from './features/shop/home/components/Hero';
import Collections from './features/shop/home/components/Collections';
import NewArrivals from './features/shop/home/components/NewArrivals';
import About from './features/shop/home/components/About';
import FinalSalePage from './features/shop/home/components/FinalSalePage';

// Features - Shop (Product List/Details)
import ProductGallery from './features/shop/product-details/components/ProductGallery';
import ProductModal from './features/shop/product-details/components/ProductModal';
import ProductCompareModal from './features/shop/product-details/components/ProductCompareModal';
import CompareFloatingButton from './features/shop/product-details/components/CompareFloatingButton';

// Features - Shop (Cart & Checkout)
import CartSidebar from './features/shop/cart/CartSidebar';
import CheckoutModal from './features/shop/checkout/CheckoutModal';

// Features - Shop (Wishlist)
import WishlistSidebar from './features/shop/wishlist/WishlistSidebar';

// Features - Support
import UnifiedChatWidget from './features/support/components/UnifiedChatWidget';
import ClientServices from './features/support/components/ClientServices';
import FAQPage from './features/support/components/FAQPage';

// =============================================
// MAIN APP COMPONENT
// =============================================
function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [showOrderingGuide, setShowOrderingGuide] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToCategory = (category) => {
    setGalleryCategory(category);
    setGlobalSearchTerm('');
    navigateTo('gallery');
  };

  const handleGlobalSearch = (term) => {
    setGlobalSearchTerm(term);
    setGalleryCategory('all');
    navigateTo('gallery');
  };

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <CompareProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <ProductProvider>
                    <div className="app" id="main-content" role="main">
                      <Navbar
                      currentPage={currentPage}
                      onNavigate={navigateTo}
                      onNavigateCategory={navigateToCategory}
                      onShowSearch={() => setShowSearch(true)}
                    />

                    {currentPage === "home" && (
                      <>
                        <Hero />
                        <Collections onOpenModal={setActiveModal} />
                        <NewArrivals />
                        <FinalSalePage />
                        <About />
                      </>
                    )}

                    {currentPage === "gallery" && (
                      <ProductGallery 
                        onBack={() => {
                          setGlobalSearchTerm('');
                          setGalleryCategory('all');
                          navigateTo("home");
                        }}
                        initialSearchTerm={globalSearchTerm}
                        initialCategory={galleryCategory}
                      />
                    )}

                    {/* Final Sale Page moved to Home */}

                    {currentPage === "contact" && (
                      <ClientServices />
                    )}

                    {currentPage === "faq" && (
                      <FAQPage />
                    )}

                    {currentPage === "admin" && (
                      <ProtectedRoute requiredRole="admin">
                        <AdminPanel onBack={() => navigateTo("home")} />
                      </ProtectedRoute>
                    )}

                    <Footer 
                      onNavigate={navigateTo} 
                      onNavigateCategory={navigateToCategory}
                      onShowOrderingGuide={() => setShowOrderingGuide(true)}
                    />

                    {activeModal && (
                      <ProductModal
                        collectionKey={activeModal}
                        onClose={() => setActiveModal(null)}
                      />
                    )}

                    {showSearch && (
                      <SearchModal
                        onClose={() => setShowSearch(false)}
                        onSearch={handleGlobalSearch}
                      />
                    )}

                    <CartSidebar />
                    <WishlistSidebar />
                    <AuthModal onNavigate={navigateTo} />
                    <CheckoutModal onGoHome={() => navigateTo('home')} />
                    <ProductCompareModal />
                    <CompareFloatingButton />
                    <UnifiedChatWidget />
                    <Toast />
                    <OrderingGuide 
                      isOpen={showOrderingGuide} 
                      onClose={() => setShowOrderingGuide(false)} 
                    />
                  </div>
                  </ProductProvider>
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </CompareProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
export { ErrorBoundary };
