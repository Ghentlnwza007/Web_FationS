
import React, { useState } from 'react';
import { 
  ThemeProvider, 
  CurrencyProvider, 
  AuthProvider, 
  CompareProvider, 
  CartProvider, 
  WishlistProvider,
  OrderProvider
} from './context/Contexts';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import NewArrivals from './components/NewArrivals';
import About from './components/About';
import Footer from './components/Footer';

// Pages/Sections
import ProductGallery from './components/ProductGallery';
import FinalSalePage from './components/FinalSalePage';

// Modals/Overlays
import ProductModal from './components/ProductModal';
import SearchModal from './components/SearchModal';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import ProductCompareModal from './components/ProductCompareModal';

// Widgets
import CompareFloatingButton from './components/CompareFloatingButton';
import UnifiedChatWidget from './components/UnifiedChatWidget';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import ClientServices from './components/ClientServices';

// =============================================
// MAIN APP COMPONENT
// =============================================
function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('all');

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

                    {currentPage === "sale" && (
                      <FinalSalePage onBack={() => navigateTo("home")} />
                    )}

                    {currentPage === "contact" && (
                      <ClientServices />
                    )}

                    <Footer 
                      onNavigate={navigateTo} 
                      onNavigateCategory={navigateToCategory}
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
                    <AuthModal />
                    <CheckoutModal onGoHome={() => navigateTo('home')} />
                    <ProductCompareModal />
                    <CompareFloatingButton />
                    <UnifiedChatWidget />
                    <Toast />
                  </div>
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
