# 💰 FinanceFlow — Smart Money Tracker

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-purple.svg?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-black.svg?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Recharts-3-ff69b4.svg?style=for-the-badge" alt="Recharts" />
</div>

<br />

**FinanceFlow** is a modern, responsive, full-stack Personal Finance & Expense Analytics Web App.
Built with a focus on premium aesthetics and usability, this app helps students and young professionals track their income, manage categories, set monthly limits, and visualize financial trends dynamically.

---

## ✨ Key Features

- **Transaction Management:** Add, edit, and delete income/expenses. 
- **Dynamic Dashboard:** Get a quick overview of your current Net Balance, Total Earnings, and Spent Amounts.
- **Budget Tracking:** Set a monthly budget and visually track how much of it is consumed via animated progress bars.
- **Advanced Analytics:** Data visualized simply using Donut styling for Categories, Bar Charts for Inflow vs Outflow, and Line Charts for tracking monthly spending history.
- **Lightning Search & Filters:** Debounced fast search by title or notes, and complex filtering by transaction type (income/expense), date ranges, or category.
- **100% Client-Side Privacy:** Your financial data is securely maintained using local-storage state. No data leaves your machine.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (Functional Components + Hooks), Vite
- **Routing:** React Router v7
- **Data Visualization:** Recharts
- **Forms & Validation:** `react-hook-form` & `yup`
- **Animations:** Framer Motion
- **Icons & Notifications:** `react-icons`, `react-toastify`
- **State Persistence:** Context API + LocalStorage
- **Styling:** Custom Vanilla CSS with a polished CSS Variables design system.

---

## 🚀 Getting Started
To get direct access
```
https://finance-flow-smart-money-tracker.vercel.app/
```
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/financeflow.git
   cd financeflow
   ```

2. **Install NPM packages:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   > The app will usually open at `http://localhost:5173`. Seed data is included to immediately demonstrate analytics capabilities!

---

## 🌍 Deployment

FinanceFlow is a Single Page Application (SPA), which means it requires client-side routing setups when deployed. We have pre-configured three major deployment environments for you:

### 1. Vercel (Recommended)
You do not need to do anything. The repository already contains a `vercel.json` file which defines the rewrite rules (`/*` to `/index.html`) required by React Router.
- Log into Vercel and import this GitHub repository. Vercel will automatically configure the build command (`npm run build`) and output directory (`dist`).

### 2. Netlify
The repository contains a `netlify.toml` file with predefined routing redirects.
- Log into Netlify, click "Add new site", and choose "Import an existing project". Your site will deploy gracefully.

### 3. GitHub Pages
We've included a ready-to-use GitHub Actions workflow file: `.github/workflows/deploy.yml`.
- If you push to the `main` branch, the workflow will automatically trigger, build the `/dist` bundle, and upload it to GitHub Pages.
- *Note:* For GitHub pages, ensure you update `base: '/repo-name/'` inside your `vite.config.js` if it isn't deployed at the root domain.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
