# Cloud Hospital Dashboard – QA Test Matrix

**Test Environment**
- Browser: Google Chrome
- Frontend: React + Vite
- API: Node.js Mock API
- Mobile viewport: 390 × 780

| ID | Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| QA-01 | Search transaction | Matching records displayed | Verified | PASS |
| QA-02 | Status filter | Records filtered by status | Verified | PASS |
| QA-03 | Region filter | Records filtered by region | Verified | PASS |
| QA-04 | Sorting | Records sorted correctly | Verified | PASS |
| QA-05 | Pagination | Page navigation works | Verified | PASS |
| QA-06 | Clear filters | Filters reset | Verified | PASS |
| QA-07 | Mobile layout | Responsive card layout | Verified | PASS |
| QA-08 | Hamburger menu | Open and close navigation | Verified | PASS |
| QA-09 | Empty state | No matching transactions displayed | Verified | PASS |
| QA-10 | Loading state | Loading message displayed | Verified | PASS |
| QA-11 | HTTP 400 | Invalid parameter error returned | Verified | PASS |
| QA-12 | HTTP 404 | Not found error returned | Verified | PASS |
| QA-13 | HTTP 500 | Internal server error returned | Verified | PASS |
| QA-14 | Production build | Build completes successfully | Verified | PASS |

## Outstanding Tests

- Firefox browser testing
- Live HTTPS deployment testing
- Production API configuration verification

## Evidence

Manual testing was performed during development. Screenshots shared during the testing process provide supporting visual evidence.