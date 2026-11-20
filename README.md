# Cloud Hospital Operations Dashboard

A responsive React dashboard for monitoring hospital service revenue, transaction activity, payment status and regional performance.

## 1. Technology Stack

- React
- Vite
- JavaScript
- CSS Modules
- Node.js
- REST API
- Intl.NumberFormat for INR currency formatting

## 2. Requirements

- Node.js 18 or later
- npm
- Modern web browser

## 3. Project Installation

### Step 1: Start the API Server

Open a terminal in the `MOCK_API` directory:

```bash
npm install
npm start
```

The API server runs at:

`http://localhost:8787`

### Step 2: Install Frontend Dependencies

Open another terminal in `FRONTEND_STARTER`:

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the frontend root directory.

```env
VITE_API_BASE_URL=http://localhost:8787
```

The API host is configured through an environment variable rather than being hardcoded in application components.

### Step 4: Start the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite, normally:

`http://localhost:5173`

### Step 5: Production Build

```bash
npm run build
```

The production files are generated in the `dist` directory.

## 4. Component Structure

```text
FRONTEND_STARTER/
│
├── src/
│   ├── components/
│   │   ├── DashboardHeader.jsx
│   │   ├── MetricGrid.jsx
│   │   └── TransactionTable.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── styles/
│   │   └── Dashboard.module.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── index.html
├── package.json
└── README.md
```

## 5. Main Features

- Dashboard KPI cards
- Settled revenue and transaction metrics
- Transaction search
- Status and region filters
- Sorting by transaction fields
- Pagination
- Clear filters functionality
- Desktop, tablet and mobile responsive layouts
- Mobile-friendly transaction cards
- Loading and empty states
- API error and retry handling
- Accessible labels and controls

## 6. API Integration

Base URL:

`http://localhost:8787`

### Available Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | API health check |
| `/api/metrics` | GET | Dashboard KPI metrics |
| `/api/transactions` | GET | Transaction records |

### Transaction Query Parameters

- `search`
- `status`
- `region`
- `page`
- `limit`
- `sort`
- `direction`

### Error Handling

The application handles API failures and provides a retry option.

Supported API responses include:

- 400 – Invalid request parameters
- 404 – Unknown endpoint
- 500 – Internal server error

## 7. KPI Metrics

The dashboard displays:

- Settled revenue
- Total transactions
- Settled transactions
- Pending transactions

Revenue is calculated from settled transactions.

Currency values are formatted using the Indian Rupee locale.

## 8. Quality Assurance

The following tests were performed during development:

| Test Case | Result |
|---|---|
| Search functionality | PASS |
| Status filtering | PASS |
| Region filtering | PASS |
| Sorting | PASS |
| Pagination | PASS |
| Clear filters | PASS |
| Mobile responsive layout | PASS |
| Hamburger navigation | PASS |
| Loading state | PASS |
| Empty state | PASS |
| HTTP 400 handling | PASS |
| HTTP 404 handling | PASS |
| HTTP 500 handling | PASS |
| Production build | PASS |

Browser testing: Chrome.

Mobile layout was checked using responsive device emulation.

## 9. Data Privacy

This dashboard uses transaction data for operational analytics.

No patient personal information or medical records are included in this workflow.

## 10. Deployment

The production build is generated using:

```bash
npm run build
```

The `dist` directory can be deployed to a supported static hosting provider such as Vercel or Netlify.

Live Preview URL: To be added after deployment.

GitHub Repository URL: To be added after repository creation.

## 11. Limitations

- The dashboard uses the provided mock API.
- The API server must be available for live transaction data.
- Production API configuration must be updated before deployment.
- GitHub repository and live preview URLs will be added after deployment.