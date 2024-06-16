import type { AccessTokenResponse } from '@/types/main'

class Paypal {
  #clientId: string
  #clientSecret: string
  #api: string
  #accessToken: string | null
  constructor(
    readonly clientId: string,
    readonly clientSecret: string,
    readonly sandbox?: boolean
  ) {
    if (!clientId) throw new Error('Missing clientId')
    if (!clientSecret) throw new Error('Missing clientSecret')

    this.#clientId = clientId
    this.#clientSecret = clientSecret
    this.#accessToken = null
    // Determinar endpoint API
    this.#api = sandbox ? 'https://api.sandbox.paypal.com' : 'https://api.paypal.com'
  }

  async #getAccessToken() {
    const authString = `${this.#clientId}:${this.#clientSecret}`
    const response = await fetch(`${this.#api}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(authString)}`
      },
      body: 'grant_type=client_credentials'
    })
    const result: AccessTokenResponse = await response.json()
    return result.access_token
  }
  public async initialize() {
    const accessToken = await this.#getAccessToken()
    this.#accessToken = accessToken
  }
  async fetch(endpoint: string, options: RequestInit = {}) {
    if (this.#accessToken === null) await this.initialize()
    const response = await fetch(`${this.#api}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.#accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    if (!response.ok) throw new Error('API request failed')
    return result
  }
}
export const createPayPalClient = async () => {
  if (!process.env.PAYPAL_ACCESS_ID || !process.env.PAYPAL_SECRET_KEY) {
    throw new Error('Missing PayPal credentials')
  }
  const client = new Paypal(process.env.PAYPAL_ACCESS_ID, process.env.PAYPAL_SECRET_KEY, process.env.NODE_ENV !== 'production')
  return client
}
