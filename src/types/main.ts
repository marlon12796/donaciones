export interface AccessTokenResponse {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}
interface Link {
  href: string;
  rel: string;
  method: string;
}

interface PaymentSource {
  paypal: Record<string, unknown>
}

export interface OrderResponse {
  id: string;
  status: string;
  payment_source: PaymentSource;
  links: Link[];
}
export interface VerifyPaypalSignature {
  verification_status: 'SUCCESS'
}