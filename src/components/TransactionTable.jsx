import React from 'react';
import styles from '../styles/Dashboard.module.css';

const formatINR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const formatDate = (value) => {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const statusClass = (status) => {
  switch (String(status).toLowerCase()) {
    case 'settled':
      return styles.statusSettled;
    case 'pending':
      return styles.statusPending;
    case 'refunded':
      return styles.statusRefunded;
    case 'failed':
      return styles.statusFailed;
    default:
      return '';
  }
};

const sortableColumns = [
  { label: 'Transaction ID', key: 'transaction_id' },
  { label: 'Date', key: 'date' },
  { label: 'Service', key: 'service' },
  { label: 'Region', key: 'region' },
  { label: 'Channel', key: 'channel' },
  { label: 'Status', key: 'status' },
  { label: 'Amount', key: 'amount_inr' }
];

export function TransactionTable({
  transactions = [],
  loading = false,
  search = '',
  status = '',
  region = '',
  sort = 'amount_inr',
  direction = 'desc',
  page = 1,
  total = 0,
  limit = 10,
  onSearch,
  onStatus,
  onRegion,
  onSort,
  onPage,
  onClear
}) {
  const safeLimit = Math.max(1, Number(limit) || 10);
  const safeTotal = Math.max(0, Number(total) || 0);

  const totalPages = Math.max(
    1,
    Math.ceil(safeTotal / safeLimit)
  );

  const sortIndicator = (field) => {
    if (sort !== field) return '';

    return direction === 'asc' ? ' ▲' : ' ▼';
  };

  const handleSort = (field) => {
    if (typeof onSort === 'function') {
      onSort(field);
    }
  };

  const renderTransaction = (item) => (
    <article
      key={item.transaction_id}
      className={styles.transactionCard}
    >
      <div className={styles.transactionCardHeader}>
        <strong>{item.transaction_id}</strong>

        <span className={statusClass(item.status)}>
          {item.status}
        </span>
      </div>

      <div className={styles.transactionDetails}>
        <div>
          <span>Service</span>
          <strong>{item.service || '—'}</strong>
        </div>

        <div>
          <span>Date</span>
          <strong>{formatDate(item.date)}</strong>
        </div>

        <div>
          <span>Region</span>
          <strong>{item.region || '—'}</strong>
        </div>

        <div>
          <span>Channel</span>
          <strong>{item.channel || '—'}</strong>
        </div>

        <div>
          <span>Amount</span>
          <strong>
            {formatINR.format(Number(item.amount_inr) || 0)}
          </strong>
        </div>
      </div>
    </article>
  );

  return (
    <section
      className={styles.transactionSection}
      aria-labelledby="transactions-heading"
    >
      {/* Section Heading */}

      <div className={styles.sectionHeading}>
        <div>
          <h2 id="transactions-heading">
            Transaction history
          </h2>

          <p>
            View and manage service transactions.
          </p>
        </div>

        <span
          className={styles.resultCount}
          aria-live="polite"
        >
          {safeTotal} transactions
        </span>
      </div>

      {/* Search and Filters */}

      <div className={styles.filters}>

        <label className={styles.searchBox}>
          <span className={styles.visuallyHidden}>
            Search ID or service
          </span>

          <input
            type="search"
            placeholder="Search ID or service"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            aria-label="Search ID or service"
          />
        </label>

        <label>
          <span className={styles.visuallyHidden}>
            Filter by status
          </span>

          <select
            value={status}
            onChange={(event) => onStatus(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            <option value="Settled">Settled</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>
        </label>

        <label>
          <span className={styles.visuallyHidden}>
            Filter by region
          </span>

          <select
            value={region}
            onChange={(event) => onRegion(event.target.value)}
            aria-label="Filter by region"
          >
            <option value="">All regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </label>

        {/* Mobile-friendly sorting control */}

        <label>
          <span className={styles.visuallyHidden}>
            Sort transactions by
          </span>

          <select
            value={sort}
            onChange={(event) => handleSort(event.target.value)}
            aria-label="Sort transactions by"
          >
            {sortableColumns.map((column) => (
              <option
                key={column.key}
                value={column.key}
              >
                Sort by {column.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          disabled={!search && !status && !region}
        >
          Clear filters
        </button>

      </div>

      {/* Loading State */}

      {loading ? (

        <div
          className={styles.loadingState}
          role="status"
          aria-live="polite"
        >
          Loading transactions...
        </div>

      ) : transactions.length === 0 ? (

        /* Empty State */

        <div
          className={styles.emptyState}
          role="status"
        >
          <h3>No matching transactions</h3>

          <p>
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={onClear}
          >
            Clear filters
          </button>
        </div>

      ) : (

        <>

          {/* Desktop Transaction Table */}

          <div className={styles.tableWrapper}>
            <table className={styles.transactionTable}>

              <thead>
                <tr>

                  {sortableColumns.map((column) => (

                    <th
                      key={column.key}
                      scope="col"
                      aria-sort={
                        sort === column.key
                          ? direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                    >
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => handleSort(column.key)}
                        aria-label={
                          `Sort by ${column.label}. ${
                            sort === column.key
                              ? direction === 'asc'
                                ? 'Currently ascending'
                                : 'Currently descending'
                              : 'Not currently sorted'
                          }`
                        }
                      >
                        {column.label}
                        {sortIndicator(column.key)}
                      </button>
                    </th>

                  ))}

                </tr>
              </thead>

              <tbody>

                {transactions.map((item) => (

                  <tr key={item.transaction_id}>

                    <td>{item.transaction_id}</td>

                    <td>{formatDate(item.date)}</td>

                    <td>{item.service || '—'}</td>

                    <td>{item.region || '—'}</td>

                    <td>{item.channel || '—'}</td>

                    <td>
                      <span className={statusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {formatINR.format(
                          Number(item.amount_inr) || 0
                        )}
                      </strong>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

          {/* Mobile Transaction Cards */}

          <div className={styles.mobileTransactions}>
            {transactions.map(renderTransaction)}
          </div>

          {/* Pagination */}

          <nav
            className={styles.pagination}
            aria-label="Transaction pages"
          >

            <span aria-live="polite">
              Page {page} of {totalPages}
            </span>

            <div>

              <button
                type="button"
                onClick={() => onPage(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => onPage(page + 1)}
                disabled={page >= totalPages}
                aria-label="Next page"
              >
                Next
              </button>

            </div>

          </nav>

        </>

      )}

    </section>
  );
}
