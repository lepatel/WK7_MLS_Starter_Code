# ThreadHive — GitHub Copilot Custom Instructions

These instructions describe the conventions and architectural patterns used in the ThreadHive frontend codebase. Follow them when generating or suggesting code.

---

## Project Overview

ThreadHive is a React + Vite application structured as:

```
threadhive-frontend/src/
  api/          # fetchAPI utility (single fetch wrapper)
  config/       # API endpoint constants
  context/      # AuthContext (auth state management)
  services/     # Service functions (one per domain)
  components/   # Reusable UI components
  pages/        # Route-level page components
  utils/        # Utility helpers
```

---

## Auth State Management

- Auth state (`token`, `user`) is managed via **React Context API** in `src/context/AuthContext.jsx`.
- Always consume auth state using the `useAuth()` hook — **never read auth state directly from props or other sources**.
- Available values and functions from `useAuth()`:
  - `token` — current JWT token (null if unauthenticated)
  - `user` — current user object (null if unauthenticated)
  - `loginUser(data)` — call after a successful login; stores token and user in state + localStorage
  - `logout()` — clears token and user from state and localStorage
  - `updateUser(updatedUser)` — updates user state and persists to localStorage

```jsx
// Correct pattern
const { token, user, loginUser, logout } = useAuth();
```

- The `AuthProvider` wraps the entire app in `App.jsx`; all components can access `useAuth()`.
- Token and user are persisted to `localStorage` — the context re-hydrates from localStorage on app load.

---

## Making API Calls — Service Layer

- All API calls must go through the **`fetchAPI` utility** in `src/api/apiClient.js`. Do **not** call `fetch()` directly in components or services.
- Import pattern:

```javascript
import { fetchAPI } from "../api/apiClient";
import { SOME_API } from "../config/apiConfig";
```

- `fetchAPI` automatically attaches the `Authorization: Bearer <token>` header using the token from localStorage.
- All API responses follow the shape `{ data: ... }`. Always return `res.data` from service functions.
- Add new API endpoint constants to `src/config/apiConfig.js`. Use parameterized arrow functions for dynamic segments:

```javascript
export const THREAD_API = {
  GET_ALL: '/threads',
  GET_BY_ID: (id) => `/threads/${id}`,
};
```

### Service Function Pattern

```javascript
// GET request
export async function fetchRecentThreads() {
  const res = await fetchAPI(THREAD_API.GET_ALL);
  return res.data;
}

// POST request
export const createThread = async (data) => {
  const res = await fetchAPI(THREAD_API.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
};
```

- Service functions are **async/await** only — no `.then()` chains.
- Group all functions for a domain into one service file (e.g., `threadService.js`, `commentService.js`).

---

## Route Protection

- Use `<PrivateRoute>` from `src/components/PrivateRoute/PrivateRoute.jsx` to protect authenticated routes.
- Wrap protected route elements directly in JSX:

```jsx
<Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
```

- `PrivateRoute` checks `localStorage` for a token and redirects to `/login` if absent.

---

## Component Conventions

- All components are **functional components** using React hooks.
- Use `useState` for local state, `useEffect` for data fetching on mount.
- Use `useNavigate` for programmatic navigation and `useLocation` for reading route state.
- UI components use **React Bootstrap** — use its components (`Container`, `Card`, `Button`, `Form`, `Spinner`, etc.) instead of plain HTML equivalents.
- Each component has its own co-located CSS file with the same name (e.g., `ThreadCard.jsx` + `ThreadCard.css`).

### Standard Data-Fetching Pattern in Components

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await someServiceFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);
```

- Always handle loading and error states and reflect them in the UI.

---

## Error Handling

- Wrap all async service calls in `try/catch/finally` blocks.
- Store the error message in a `useState` variable and display it conditionally in the JSX.
- Use `err.message || "Fallback message"` to extract a human-readable error.
- Always clear loading in `finally` — never in `try` or `catch` alone.

---

## File & Folder Naming

| Type | Convention | Example |
|---|---|---|
| Component folders | PascalCase | `ThreadList/`, `PrivateRoute/` |
| Component files | PascalCase `.jsx` | `ThreadCard.jsx` |
| Service files | camelCase `.js` | `threadService.js` |
| Config/util files | camelCase `.js` | `apiConfig.js` |
| CSS files | Match component name | `ThreadCard.css` |

---

## Key Rules Summary

1. **Auth state → always use `useAuth()`** from `AuthContext`, not raw localStorage reads (except in `PrivateRoute`).
2. **API calls → always use `fetchAPI()`** from `apiClient.js`, never bare `fetch()`.
3. **Endpoint URLs → always defined in `apiConfig.js`**, never hardcoded in service files.
4. **Service functions → always return `res.data`**, not the full response.
5. **Protected routes → always wrap with `<PrivateRoute>`**.
6. **Async operations → always use `try/catch/finally`** with loading and error states.
