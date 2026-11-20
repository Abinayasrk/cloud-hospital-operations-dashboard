import React, { useCallback, useEffect, useState } from 'react';

import { DashboardHeader } from './components/DashboardHeader.jsx';
import { MetricGrid } from './components/MetricGrid.jsx';
import { TransactionTable } from './components/TransactionTable.jsx';

import styles from './styles/Dashboard.module.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function App() {

  // Dashboard data
  const [metrics, setMetrics] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Shared filter states
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [region, setRegion] = useState('');

  // Sorting states
  const [sort, setSort] = useState('date');
  const [direction, setDirection] = useState('desc');

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {

    setLoading(true);
    setError('');

    try {

      const params = new URLSearchParams({
        search,
        page: String(page),
        limit: String(limit),
        sort,
        direction
      });

      if (status) {
        params.set('status', status);
      }

      if (region) {
        params.set('region', region);
      }

      const [metricResponse, transactionResponse] =
        await Promise.all([
          fetch(`${API_BASE}/api/metrics`),
          fetch(`${API_BASE}/api/transactions?${params}`)
        ]);

      if (!metricResponse.ok) {
        throw new Error(
          `Metrics request failed (${metricResponse.status})`
        );
      }

      if (!transactionResponse.ok) {
        throw new Error(
          `Transactions request failed (${transactionResponse.status})`
        );
      }

      const metricData = await metricResponse.json();
      const transactionData = await transactionResponse.json();

      setMetrics(metricData);

      setTransactions(
        Array.isArray(transactionData.items)
          ? transactionData.items
          : []
      );

      setTotal(transactionData.total || 0);

    } catch (err) {

      console.error('Dashboard API error:', err);

      setError(
        err.message || 'Unable to load dashboard data.'
      );

    } finally {

      setLoading(false);

    }

  }, [search, status, region, sort, direction, page]);

  // Initial loading and filter updates
  useEffect(() => {

    fetchDashboard();

  }, [fetchDashboard]);

  // Search handler
  const handleSearch = (value) => {

    setSearch(value);
    setPage(1);

  };

  // Status handler
  const handleStatus = (value) => {

    setStatus(value);
    setPage(1);

  };

  // Region handler
  const handleRegion = (value) => {

    setRegion(value);
    setPage(1);

  };

  // Sorting handler
  const handleSort = (field) => {

    if (sort === field) {

      setDirection(
        current => current === 'asc' ? 'desc' : 'asc'
      );

    } else {

      setSort(field);
      setDirection('desc');

    }

    setPage(1);

  };

  // Clear filters
  const clearFilters = () => {

    setSearch('');
    setStatus('');
    setRegion('');

    setSort('date');
    setDirection('desc');

    setPage(1);

  };

  // Main dashboard layout
  return (

    <div className={styles.shell}>

      {/* Sidebar and navigation */}
      <DashboardHeader />

      {/* Main workspace */}
      <div className={styles.workspace}>
<header className={styles.topbar}>
  <h2>Operations overview</h2>

  <span>
    {new Intl.DateTimeFormat('en-IN', {
      month: 'long',
      year: 'numeric'
    }).format(new Date())}
  </span>
</header>
        <main
          id="dashboard"
          className={styles.content}
        >

          {/* Dashboard heading */}
          <section className={styles.dashboardIntro}>

            <h1>
              Sales &amp; transaction analytics
            </h1>

            <p>
              Monitor service revenue, status and payment activity
            </p>

          </section>

          {/* KPI metric cards */}
          <MetricGrid
            metrics={metrics}
            loading={loading}
          />

          {/* Transaction section */}
          {error ? (

            <section
              role="alert"
              className={styles.errorState}
            >

              <p>
                Unable to load transactions.
              </p>

              <button
                type="button"
                onClick={fetchDashboard}
              >
                Retry
              </button>

            </section>

          ) : (

            <TransactionTable

              transactions={transactions}
              loading={loading}

              search={search}
              status={status}
              region={region}

              sort={sort}
              direction={direction}

              page={page}
              total={total}
              limit={limit}

              onSearch={handleSearch}
              onStatus={handleStatus}
              onRegion={handleRegion}

              onSort={handleSort}
              onPage={setPage}

              onClear={clearFilters}

            />

          )}

        </main>

      </div>

    </div>

  );

}