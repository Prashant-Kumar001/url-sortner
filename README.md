# 🔗 URL Shortener

A modern, fast, and beautifully designed **URL Shortener Web App** built with **React** and powered by **Supabase** for backend services.

---

## ✨ Overview

This project is a fully functional URL shortener that allows users to:

- 🔐 Authenticate securely  
- 🔗 Shorten long URLs  
- 📊 Manage and track links  
- 🎯 Use a clean and intuitive dashboard  

Instead of building a custom backend, this app leverages **Supabase** for authentication, database, and API handling — making it scalable and production-ready.

---

## 🚀 Tech Stack

### Frontend
- ⚛️ React
- 🎨 Tailwind CSS / Modern UI Components
- 🔄 React Hooks & Context API

### Backend (BaaS)
- 🟢 Supabase
  - Authentication
  - Database
  - API

---

## 🎯 Features

### 🔐 Authentication
- Secure login/signup using Supabase Auth
- Session handling
- Protected routes

### 📊 Dashboard
- Clean and modern UI
- Overview of all shortened links
- Smooth user experience

### 🔗 Link Management
- Create short URLs
- Store and manage links
- Easy access and organization

### 💬 Chat-style UI
- Interactive and engaging interface
- Smooth transitions and UX
- User-friendly layout

---

## 🖼️ UI Highlights

- Minimal and modern design  
- Fully responsive  
- Smooth animations  
- Professional dashboard layout  

---

## 📂 Project Structure


```
src/
│
├── components/ # Reusable UI components
├── pages/ # Main pages (Dashboard, Auth, etc.)
├── hooks/ # Custom hooks (API handling, auth)
├── context/ # Global state management
├── services/ # Supabase integration
└── utils/ # Helper functions

```


---

## ⚙️ How It Works

1. User signs up / logs in using Supabase Auth  
2. User enters a long URL  
3. The app generates and stores a short URL  
4. All links are displayed in the dashboard  
5. User can manage and reuse links anytime  

---

## 🛠️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/url-shortener.git

# Navigate to project folder
cd url-shortener

# Install dependencies
npm install

# Start development server
npm run dev

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
