import { MESSAGE_CENTRAL_CONFIG } from '../config/constants.js'

export interface SendOTPResponse {
  responseCode: number
  message: string
  verificationId: string | null
}

export interface VerifyOTPResponse {
  responseCode: number
  message: string
  verificationStatus: string | null
}

export class AuthModel {
  /**
   * Send OTP via Message Central CPaaS v3 API
   */
  static async sendOTP(mobileNumber: string): Promise<SendOTPResponse> {
    const { BASE_URL, COUNTRY_CODE, CUSTOMER_ID, AUTH_TOKEN } = MESSAGE_CENTRAL_CONFIG

    // Clean mobile number to last 10 digits
    const cleanedMobile = mobileNumber.replace(/\D/g, '').slice(-10)

    const url = `${BASE_URL}/send?countryCode=${COUNTRY_CODE}&customerId=${CUSTOMER_ID}&flowType=SMS&mobileNumber=${encodeURIComponent(cleanedMobile)}&otpLength=6`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'authToken': AUTH_TOKEN,
        },
      })

      const data = await response.json() as any
      console.log('Message Central Send OTP Response:', JSON.stringify(data))

      const isSuccess = String(data?.responseCode) === '200' || 
                        String(data?.data?.responseCode) === '200' || 
                        Boolean(data?.data?.verificationId)

      if (isSuccess && data?.data?.verificationId) {
        return {
          responseCode: 200,
          message: data.message || 'SUCCESS',
          verificationId: String(data.data.verificationId),
        }
      }

      return {
        responseCode: Number(data?.responseCode) || 400,
        message: data?.message || 'Failed to send OTP',
        verificationId: null,
      }
    } catch (error: any) {
      console.error('Error in sendOTP model:', error)
      return {
        responseCode: 500,
        message: error?.message || 'Network error while sending OTP',
        verificationId: null,
      }
    }
  }

  /**
   * Validate / Verify OTP via Message Central CPaaS v3 API
   */
  static async verifyOTP(mobileNumber: string, code: string, verificationId: string): Promise<VerifyOTPResponse> {
    const { BASE_URL, COUNTRY_CODE, CUSTOMER_ID, AUTH_TOKEN } = MESSAGE_CENTRAL_CONFIG

    // Clean mobile number to last 10 digits
    const cleanedMobile = mobileNumber.replace(/\D/g, '').slice(-10)

    const url = `${BASE_URL}/validateOtp?countryCode=${COUNTRY_CODE}&mobileNumber=${encodeURIComponent(cleanedMobile)}&customerId=${CUSTOMER_ID}&code=${encodeURIComponent(code.trim())}&verificationId=${encodeURIComponent(verificationId.trim())}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'authToken': AUTH_TOKEN,
        },
      })

      const data = await response.json() as any
      console.log('Message Central Verify OTP Response:', JSON.stringify(data))

      const status = data?.data?.verificationStatus
      const isSuccess = String(data?.responseCode) === '200' || 
                        String(data?.data?.responseCode) === '200' || 
                        status === 'VERIFICATION_COMPLETED' ||
                        status === 'VERIFIED' || 
                        data?.message === 'OTP VALIDATED SUCCESSFULLY'

      if (isSuccess) {
        return {
          responseCode: 200,
          message: data.message || 'SUCCESS',
          verificationStatus: status || 'VERIFIED',
        }
      }

      return {
        responseCode: Number(data?.responseCode) || 400,
        message: data?.message || 'INVALID OTP',
        verificationStatus: null,
      }
    } catch (error: any) {
      console.error('Error in verifyOTP model:', error)
      return {
        responseCode: 500,
        message: error?.message || 'Network error while verifying OTP',
        verificationStatus: null,
      }
    }
  }
}
