# Cloud Hospital — Operations Dashboard

A responsive hospital operations dashboard built with React and Vite. It provides an overview of service revenue and transaction activity, with interactive search, filtering, sorting, and pagination.

## Live Demo

- **Frontend:** https://cloud-hospital-operations-dashboard.vercel.app
- **Backend API:** https://cloud-hospital-operations-dashboard.onrender.com

## Features

- Responsive dashboard for desktop and mobile devices.
- KPI cards showing settled revenue, total transactions, settled transactions, and pending transactions.
- Transaction search by ID or service.
- Filter transactions by status and region.
- Sort transactions by date, amount, and supported fields.
- Server-side pagination.
- Clear filters functionality.
- Loading, error, retry, and empty states.
- INR currency formatting.
- Mobile-friendly transaction cards.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS Modules
- Fetch API

**Backend**
- Node.js
- HTTP module
- JSON-based mock data

**Deployment**
- Vercel — Frontend
- Render — Backend API
- GitHub — Source control

## Project Structure

```text
cloud-hospital-operations-dashboard/
├── DATA/
│   └── transactions.json
├── MOCK_API/
│   └── server.js
├── src/
│   ├── components/
│   │   ├── DashboardHeader.jsx
│   │   ├── MetricGrid.jsx
│   │   └── TransactionTable.jsx
│   ├── styles/
│   │   └── Dashboard.module.css
│   └── App.jsx
├── package.json
├── index.html
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Abinayasrk/cloud-hospital-operations-dashboard.git
cd cloud-hospital-operations-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8787
```

For production, configure `VITE_API_BASE_URL` in the frontend hosting environment with the deployed backend API base URL.

### 4. Start the backend

```bash
node MOCK_API/server.js
```

The local API runs on port `8787` by default.

### 5. Start the frontend

Open another terminal:

```bash
npm run dev
```

Open the local URL provided by Vite.

### 6. Build for production

```bash
npm run build
```

The production build is generated in the `dist` directory.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/metrics` | Dashboard KPI metrics |
| GET | `/api/transactions` | Transaction list with filtering, sorting, search, and pagination |

### Transaction Query Parameters

| Parameter | Description |
|---|---|
| `search` | Search by transaction ID, service, region, or channel |
| `status` | Filter by Settled, Pending, Refunded, or Failed |
| `region` | Filter by North, South, East, or West |
| `sort` | Sort field |
| `direction` | `asc` or `desc` |
| `page` | Page number |
| `limit` | Number of records per page |

Example:

```text
/api/transactions?page=1&limit=10&sort=date&direction=desc
```

## Error Handling

The API handles invalid requests and returns appropriate HTTP status codes:

- `400` — Invalid request parameters.
- `404` — Unknown API endpoint.
- `405` — Unsupported HTTP method.
- `500` — Internal server error.

The frontend displays an error message and retry option when API requests fail.

## Responsive Design

The dashboard supports:

- Mobile: 390px
- Tablet: 768px
- Desktop: 1440px

The mobile layout uses stacked KPI cards and transaction cards to avoid horizontal page overflow.

## Testing

The following functionality has been manually checked:

- Dashboard data loading.
- Search functionality.
- Status and region filters.
- Sorting.
- Pagination.
- Clear filters.

## Notes

This project uses mock transaction data for demonstration purposes. It does not display patient medical records or personal health information.
