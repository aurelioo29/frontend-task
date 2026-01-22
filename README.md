# Frontend Developer Hiring Task

A small frontend application built as a hiring assignment to demonstrate
authentication flow, protected routes, API integration, and clean UI.

---

## 🚀 Live Demo

https://frontend-task-virid-kappa.vercel.app/login

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **Vitest** (basic unit tests)
- **SweetAlert2** (logout confirmation)
- **Lucide React** (icons)
- **JSONPlaceholder API** (mock data source)

---

## ✨ Features

- Mock authentication (frontend-only)
- Protected routes
- Dashboard with API data
- Pagination (10 items per page)
- Search / filter posts
- Loading skeletons
- Dark / light mode toggle
- Detail page per post
- Logout confirmation modal
- Basic unit tests (auth & filter logic)

---

## 🔐 Mock Login Credentials

```bash
Email: admin@test.com
Password: password123
```

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/aurelioo29/frontend-task.git
cd frontend-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

App will be available at:

```bash
http://localhost:3000
```

---

## 🧪 Run Unit Tests

```bash
npm run test
```

---

## 📌 Assumptions

- Authentication is mocked and handled entirely on the frontend using localStorage.
- No backend or real authentication service is used.
- API data is fetched from JSONPlaceholder as required by the task.
- Focus is on UI quality, state management, and code cleanliness rather than production security.
- Dark mode is implemented using Tailwind CSS v4 with class-based theming.

---
