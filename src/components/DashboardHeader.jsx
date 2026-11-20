import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';

export function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>✚</div>

        <div className={styles.brandText}>
          <strong>Cloud Hospital</strong>
          <span>Operations Console</span>
        </div>

        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
        >
          <span className={styles.menuIcon}>
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      <nav
        className={`${styles.navigation} ${
          menuOpen ? styles.mobileNavigationOpen : ''
        }`}
        aria-label="Main navigation"
      >
        <a href="#dashboard" className={styles.activeLink}>
          ▢ Dashboard
        </a>

        <a href="#transactions">▢ Transactions</a>
        <a href="#reports">▢ Reports</a>
        <a href="#settings">▢ Settings</a>
      </nav>
    </aside>
  );
}