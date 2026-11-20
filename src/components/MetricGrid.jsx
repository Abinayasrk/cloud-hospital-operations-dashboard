import React from 'react';
import styles from '../styles/Dashboard.module.css';

const formatINR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const metricItems = [
  { key: 'totalRevenue', label: 'Settled revenue', format: value => formatINR.format(value) },
  { key: 'transactions', label: 'Transactions', format: value => value.toLocaleString('en-IN') },
  { key: 'settled', label: 'Settled', format: value => value.toLocaleString('en-IN') },
  { key: 'pending', label: 'Pending', format: value => value.toLocaleString('en-IN') }
];

function MetricCard({ label, value, loading }) {
  return (
    <article className={styles.metricCard}>
      <h2>{label}</h2>
      <p aria-live="polite">
        {loading ? 'Loading...' : value}
      </p>
    </article>
  );
}

export function MetricGrid({ metrics, loading }) {
  return (
    <section aria-label="Sales metrics" className={styles.metrics}>
      {metricItems.map(item => (
        <MetricCard
          key={item.key}
          label={item.label}
          loading={loading}
          value={
            metrics && typeof metrics[item.key] === 'number'
              ? item.format(metrics[item.key])
              : '—'
          }
        />
      ))}
    </section>
  );
}