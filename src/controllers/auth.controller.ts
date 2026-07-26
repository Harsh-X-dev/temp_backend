import { Context } from 'hono'
import { AuthModel } from '../models/auth.model.js'

export class AuthController {
  /**
<<<<<<< HEAD
=======
   * Health check / Base Endpoint
   */
  static renderAuthPage(c: Context) {
    return c.json({ status: 'online', message: 'GemoStone Auth API' })
  }

  /**
>>>>>>> 1843036f5e4a8b4cbab8903d293ac1e17e5b13a1
   * Handle Send OTP request
   */
  static async handleSendOTP(c: Context) {
    try {
      const body = await c.req.json<{ mobileNumber?: string }>()
      const { mobileNumber } = body || {}

      if (!mobileNumber || typeof mobileNumber !== 'string') {
        return c.json({
          responseCode: 400,
          message: 'Mobile number is required',
          verificationId: null,
        }, 400)
      }

      const result = await AuthModel.sendOTP(mobileNumber)
      return c.json(result, result.responseCode === 200 ? 200 : 400)
    } catch (error: any) {
      return c.json({
        responseCode: 400,
        message: error?.message || 'Invalid request body',
        verificationId: null,
      }, 400)
    }
  }

  /**
   * Handle Verify OTP request
   */
  static async handleVerifyOTP(c: Context) {
    try {
      const body = await c.req.json<{ mobileNumber?: string; code?: string; verificationId?: string }>()
      const { mobileNumber, code, verificationId } = body || {}

      if (!mobileNumber || !code || !verificationId) {
        return c.json({
          responseCode: 400,
          message: 'mobileNumber, code, and verificationId are all required',
          verificationStatus: null,
        }, 400)
      }

      const result = await AuthModel.verifyOTP(mobileNumber, code, verificationId)
      return c.json(result, result.responseCode === 200 ? 200 : 400)
    } catch (error: any) {
      return c.json({
        responseCode: 400,
        message: error?.message || 'Invalid request body',
        verificationStatus: null,
      }, 400)
    }
  }
}
