import { Hono } from 'hono'
import { AuthController } from '../controllers/auth.controller.js'

export const authRoutes = new Hono()

authRoutes.post('/api/auth/send-otp', AuthController.handleSendOTP)
authRoutes.post('/api/auth/verify-otp', AuthController.handleVerifyOTP)
