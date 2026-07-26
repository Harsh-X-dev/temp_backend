# ⚡ Deploying GemoStone Hono API on Vercel (100% Free)

This Hono + TypeScript Node.js backend is fully configured for Vercel Serverless deployment.

---

## 🚀 3-Step Vercel Deployment

### Step 1: Push Code to GitHub
Ensure all code changes are pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure Hono serverless backend for Vercel deployment"
git push origin main
```
*(or push to `jay-development` branch)*

---

### Step 2: Import Project on Vercel
1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`GemoStone_Backend_WebApp`).

---

### Step 3: Configure Environment Variables & Deploy
Under **Environment Variables** on Vercel, add your Message Central keys:

| Key | Example Value |
| :--- | :--- |
| `MESSAGE_CENTRAL_CUSTOMER_ID` | `C-8713CA4F93C4432` |
| `MESSAGE_CENTRAL_AUTH_TOKEN` | `your_auth_token_here` |
| `MESSAGE_CENTRAL_BASE_URL` | `https://cpaas.messagecentral.com/verification/v3` |
| `MESSAGE_CENTRAL_COUNTRY_CODE` | `91` |

Click **Deploy**!

---

## 📡 Live Vercel API Endpoints

Once deployed, your live Vercel base URL will be:
`https://your-project-name.vercel.app`

### Endpoints:
- `GET /` — Status check (`{"status": "online", "message": "GemoStone Auth API"}`)
- `POST /api/auth/send-otp` — Send OTP
- `POST /api/auth/verify-otp` — Verify OTP
