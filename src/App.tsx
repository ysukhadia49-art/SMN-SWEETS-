import React, { useState, useEffect } from 'react';
import { CustomerPage, AdminTab, Product, Category, BulkEnquiry, ShopSettings, User } from './types';
import { store } from './services/store';
import { authService } from './services/auth';

// Authentication
import { LoginPage } from './pages/auth/LoginPage';

// Customer Components & Pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductModal } from './components/ProductModal';
import { EnquiryTrackerModal } from './components/EnquiryTrackerModal';
import { HomePage } from './pages/customer/HomePage';
import { OurSweetsPage } from './pages/customer/OurSweetsPage';
import { GiftBoxesPage } from './pages/customer/GiftBoxesPage';
import { BulkOrdersPage } from './pages/customer/BulkOrdersPage';
import { AboutUsPage } from './pages/customer/AboutUsPage';
import { ContactPage } from './pages/customer/ContactPage';

// Admin Components & Pages
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminBulkEnquiries } from './pages/admin/AdminBulkEnquiries';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSettings } from './pages/admin/AdminSettings';

import { Phone } from 'lucide-react';
import { generateDirectShopWhatsAppUrl } from './utils/whatsapp';

export function App() {
  // Authentication State (Gmail / Google sign-in required)
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());

  // Navigation State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<CustomerPage>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Shared Store State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [enquiries, setEnquiries] = useState<BulkEnquiry[]>([]);
  const [settings, setSettings] = useState<ShopSettings>(store.getShopSettings());
  const [analytics, setAnalytics] = useState(store.getAnalytics());
  const [contacts, setContacts] = useState(store.getCustomerContacts());

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [trackerOpen, setTrackerOpen] = useState<boolean>(false);
  const [bulkOrderInitialProduct, setBulkOrderInitialProduct] = useState<string>('');

  const refreshData = () => {
    setProducts(store.getProducts());
    setCategories(store.getCategories());
    setEnquiries(store.getEnquiries());
    setSettings(store.getShopSettings());
    setAnalytics(store.getAnalytics());
    setContacts(store.getCustomerContacts());
  };

  useEffect(() => {
    refreshData();

    // Body class for mobile bottom navigation spacing
    if (currentUser && !isAdmin) {
      document.body.classList.add('has-bottom-nav');
    } else {
      document.body.classList.remove('has-bottom-nav');
    }

    // Check hash on load to support clean routing and redirect legacy loyalty routes
    const hash = window.location.hash.toLowerCase();
    if (hash === '#admin') {
      setIsAdmin(true);
    } else if (hash === '#sweets' || hash === '#farsan') {
      setCurrentPage('sweets');
      if (hash === '#farsan') window.location.hash = 'sweets';
    } else if (hash === '#gift-boxes') {
      setCurrentPage('gift-boxes');
    } else if (hash === '#bulk-orders') {
      setCurrentPage('bulk-orders');
    } else if (hash === '#about') {
      setCurrentPage('about');
    } else if (hash === '#contact') {
      setCurrentPage('contact');
    } else if (hash === '#loyalty' || hash === '#rewards' || hash === '#stamps' || hash === '#card') {
      // Legacy loyalty route redirection
      setCurrentPage('sweets');
      window.location.hash = '';
    }
  }, [isAdmin, currentUser]);

  const handleNavigateCustomer = (page: CustomerPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  const handleToggleAdmin = () => {
    const next = !isAdmin;
    setIsAdmin(next);
    window.location.hash = next ? 'admin' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBulkEnquireFromProduct = (productName: string) => {
    setBulkOrderInitialProduct(productName);
    setCurrentPage('bulk-orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAdmin(false);
    window.location.hash = '';
  };

  /* ================= GMAIL AUTHENTICATION GATE ================= */
  if (!currentUser) {
    return (
      <LoginPage
        settings={settings}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          refreshData();
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFF8ED' }}>
      {isAdmin ? (
        /* ================= ADMIN VIEW ================= */
        <div className="admin-root-layout">
          <AdminSidebar
            activeTab={adminTab}
            onSelectTab={setAdminTab}
            onExitAdmin={handleToggleAdmin}
            newEnquiriesCount={analytics.newEnquiries}
            totalProductsCount={analytics.totalProducts}
          />

          <main style={{ flexGrow: 1, backgroundColor: '#FFF8ED', overflowY: 'auto', minHeight: '100vh', width: '100%' }}>
            {adminTab === 'overview' && (
              <AdminOverview
                analytics={analytics}
                enquiries={enquiries}
                products={products}
                settings={settings}
                onNavigateTab={setAdminTab}
                onUpdateEnquiryStatus={(id, status) => {
                  store.updateEnquiryStatus(id, status);
                  refreshData();
                }}
              />
            )}
            {adminTab === 'products' && (
              <AdminProducts
                products={products}
                categories={categories}
                onRefresh={refreshData}
              />
            )}
            {adminTab === 'categories' && (
              <AdminCategories
                categories={categories}
                onRefresh={refreshData}
              />
            )}
            {adminTab === 'bulk-enquiries' && (
              <AdminBulkEnquiries
                enquiries={enquiries}
                settings={settings}
                onRefresh={refreshData}
              />
            )}
            {adminTab === 'customers' && (
              <AdminCustomers
                contacts={contacts}
                settings={settings}
              />
            )}
            {adminTab === 'analytics' && (
              <AdminAnalytics
                analytics={analytics}
                enquiries={enquiries}
              />
            )}
            {adminTab === 'settings' && (
              <AdminSettings
                settings={settings}
                onRefresh={refreshData}
              />
            )}
          </main>
        </div>
      ) : (
        /* ================= CUSTOMER STOREFRONT ================= */
        <>
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigateCustomer}
            settings={settings}
            isAdmin={isAdmin}
            onToggleAdmin={handleToggleAdmin}
            onOpenTracker={() => setTrackerOpen(true)}
            currentUser={currentUser}
            onLogout={handleLogout}
          />

          <main style={{ flexGrow: 1 }}>
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigateCustomer}
                products={products}
                onSelectProduct={setSelectedProduct}
                settings={settings}
              />
            )}
            {currentPage === 'sweets' && (
              <OurSweetsPage
                products={products}
                categories={categories}
                onSelectProduct={setSelectedProduct}
                settings={settings}
              />
            )}
            {currentPage === 'gift-boxes' && (
              <GiftBoxesPage
                products={products}
                onSelectProduct={setSelectedProduct}
                onNavigate={handleNavigateCustomer}
                settings={settings}
              />
            )}
            {currentPage === 'bulk-orders' && (
              <BulkOrdersPage
                initialProductName={bulkOrderInitialProduct}
                settings={settings}
                onOpenTracker={() => setTrackerOpen(true)}
                currentUser={currentUser}
              />
            )}
            {currentPage === 'about' && (
              <AboutUsPage
                onNavigate={handleNavigateCustomer}
                settings={settings}
              />
            )}
            {currentPage === 'contact' && (
              <ContactPage
                settings={settings}
              />
            )}
          </main>

          <Footer
            onNavigate={handleNavigateCustomer}
            settings={settings}
            onToggleAdmin={handleToggleAdmin}
          />

          {/* Mobile Bottom Navigation Bar (Handy for one-thumb smartphone usage) */}
          <MobileBottomNav
            currentPage={currentPage}
            onNavigate={handleNavigateCustomer}
            settings={settings}
            onToggleAdmin={handleToggleAdmin}
            onOpenTracker={() => setTrackerOpen(true)}
            currentUser={currentUser}
            onLogout={handleLogout}
          />

          {/* Floating WhatsApp Action Button */}
          <a
            href={generateDirectShopWhatsAppUrl(settings.verifiedWhatsAppNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp-btn"
            title="Chat directly with Sukhadiya Manilal Nathalal on WhatsApp"
            aria-label="WhatsApp Chat"
          >
            <Phone size={24} />
          </a>

          {/* Product Specifications Modal */}
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            verifiedWhatsAppNumber={settings.verifiedWhatsAppNumber}
            onBulkEnquire={handleBulkEnquireFromProduct}
          />

          {/* Enquiry Status Tracker Modal */}
          <EnquiryTrackerModal
            isOpen={trackerOpen}
            onClose={() => setTrackerOpen(false)}
            settings={settings}
          />
        </>
      )}

      <style>{`
        .admin-root-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }
        @media (min-width: 900px) {
          .admin-root-layout {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
