# 🚀 Deployment Guide (GemoStone Backend WebApp)

This document provides complete instructions for deploying the **Node.js + Hono + TypeScript** API backend.

---

## 📌 Important Note on Hugging Face Spaces

On Hugging Face Spaces:
- **Docker & Gradio SDKs**: Require a paid **Hugging Face PRO** account ($9/month) to run backend server compute.
- **Static SDK**: Free for everyone, but **only hosts static HTML/CSS files** (it cannot run Node.js backend server code or handle API endpoints like `POST /api/auth/send-otp`).

If you have a Hugging Face PRO account, follow **Section A** below for Docker deployment on Hugging Face.  
If you want **100% FREE hosting for your Node.js backend**, follow **Section B** (Vercel) or **Section C** (Render).

---

## 🅰️ Section A: Deploy to Hugging Face Spaces (Requires HF PRO)

### 1. Create a Space
1. Go to [Hugging Face Spaces](https://huggingface.co/spaces) -> **Create new Space**.
2. **Space Name**: `gemostone-backend-webapp` *(Must be all lowercase)*
3. **Space SDK**: **Docker** (Select **Blank** template)
4. Click **Create Space**.

### 2. Push Code
```bash
git add .
git commit -m "Deploy Hono backend to Hugging Face"
git remote add hf https://huggingface.co/spaces/YOUR_HF_USERNAME/gemostone-backend-webapp
git push -f hf main
```

---

## 🅱️ Section B: 100% Free Deployment on Vercel (Recommended)

Vercel natively supports Node.js + Hono serverless backend deployment with free HTTPS endpoint URLs.

### 1. Project Setup
The project is already configured with `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

### 2. Deploy via Vercel Dashboard
1. Sign up / Log in to [Vercel.com](https://vercel.com).
2. Push your project to GitHub.
3. Click **Add New Project** -> Import your GitHub repository.
4. Click **Deploy**.

Your live API URL will be: `https://gemostone-backend-webapp.vercel.app`

---

## ℂ️ Section C: 100% Free Deployment on Render.com

Render offers free Node.js Web Services.

### Steps:
1. Sign up at [Render.com](https://render.com).
2. Click **New +** -> **Web Service** -> Connect your GitHub repo.
3. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Click **Create Web Service**.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Base Health Check (`{"status": "online", "message": "GemoStone Auth API"}`) |
| `POST` | `/api/auth/send-otp` | Request Mobile OTP Delivery |
| `POST` | `/api/auth/verify-otp` | Verify OTP Code & Session |
