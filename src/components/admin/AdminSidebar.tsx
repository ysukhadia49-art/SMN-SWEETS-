import React, { useState } from 'react';
import { AdminTab } from '../../types';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings, 
  Store,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  newEnquiriesCount: number;
  totalProductsCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onExitAdmin,
  newEnquiriesCount,
  totalProductsCount
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} />, badge: totalProductsCount },
    { id: 'categories', label: 'Categories', icon: <FolderTree size={18} /> },
    { id: 'bulk-enquiries', label: 'Bulk Enquiries', icon: <ClipboardList size={18} />, badge: newEnquiriesCount > 0 ? newEnquiriesCount : undefined },
    { id: 'customers', label: 'Customers / Contacts', icon: <Users size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'settings', label: 'Shop Settings', icon: <Settings size={18} /> }
  ];

  const handleSelectTab = (tab: AdminTab) => {
    onSelectTab(tab);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTabObj = tabs.find(t => t.id === activeTab);

  return (
    <>
      {/* Mobile Admin Top Navigation Bar (< 900px) */}
      <div 
        className="admin-mobile-topbar"
        style={{
          backgroundColor: '#332218',
          color: '#FFF8ED',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #4A3325',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          width: '100%'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => setMobileDrawerOpen(true)}
            style={{
              background: '#4A3325',
              border: 'none',
              color: '#FFF1DC',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Open Admin Menu"
          >
            <Menu size={20} />
          </button>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFF8ED', lineHeight: 1.2 }}>
              Sukhadiya Admin
            </div>
            <div style={{ fontSize: '0.75rem', color: '#F97316', fontWeight: 600 }}>
              {activeTabObj?.label || 'Dashboard'}
            </div>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="btn btn-secondary btn-sm"
          style={{
            backgroundColor: '#4A3325',
            color: '#FFF8ED',
            borderColor: '#5C4130',
            fontSize: '0.78rem',
            padding: '0.35rem 0.65rem',
            minHeight: '34px'
          }}
        >
          <Store size={13} /> Exit
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 90,
            backdropFilter: 'blur(3px)'
          }}
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Admin Sidebar Navigation Container (Desktop Static / Mobile Off-canvas Drawer) */}
      <aside 
        className={`admin-sidebar-container ${mobileDrawerOpen ? 'drawer-open' : ''}`}
        style={{ 
          backgroundColor: '#332218', 
          color: '#FFF8ED',
          display: 'flex', 
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid #4A3325',
          zIndex: 95
        }}
      >
        {/* Brand Header */}
        <div 
          style={{ 
            padding: '1.25rem', 
            borderBottom: '1px solid #4A3325',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div 
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '50%', 
                backgroundColor: '#EA580C', 
                color: '#FFFFFF',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                fontFamily: 'var(--font-serif)'
              }}
            >
              SMN
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFF8ED', lineHeight: 1.2 }}>
                Sukhadiya Manilal
              </div>
              <div style={{ fontSize: '0.72rem', color: '#F97316', fontWeight: 600, letterSpacing: '0.04em' }}>
                Shop Admin Portal
              </div>
            </div>
          </div>

          {/* Close button visible inside mobile drawer */}
          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="mobile-close-btn"
            style={{
              background: '#4A3325',
              border: 'none',
              color: '#FFF8ED',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation List */}
        <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flexGrow: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '0.7rem', color: '#A38B7C', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.75rem 0.5rem' }}>
            Store Management
          </div>

          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? '#EA580C' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#FFF1DC',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  minHeight: '44px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span 
                    style={{ 
                      fontSize: '0.72rem', 
                      padding: '0.15rem 0.5rem', 
                      borderRadius: 'var(--radius-full)', 
                      backgroundColor: isActive ? '#FFFFFF' : '#EA580C', 
                      color: isActive ? '#EA580C' : '#FFFFFF',
                      fontWeight: 700
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Exit to Public Storefront */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid #4A3325' }}>
          <button
            onClick={onExitAdmin}
            className="btn btn-secondary"
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              fontSize: '0.88rem',
              backgroundColor: '#4A3325',
              color: '#FFF8ED',
              borderColor: '#5C4130',
              minHeight: '44px'
            }}
          >
            <Store size={16} /> Back to Storefront
          </button>
        </div>
      </aside>

      <style>{`
        /* Desktop Layout */
        @media (min-width: 900px) {
          .admin-mobile-topbar {
            display: none !important;
          }
          .admin-sidebar-container {
            width: 260px;
            min-height: 100vh;
            position: sticky;
            top: 0;
          }
          .mobile-close-btn {
            display: none !important;
          }
        }

        /* Mobile Layout */
        @media (max-width: 899px) {
          .admin-sidebar-container {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 280px;
            max-width: 85vw;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 10px 0 30px rgba(0,0,0,0.3);
          }
          .admin-sidebar-container.drawer-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
