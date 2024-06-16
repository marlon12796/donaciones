export interface PaypalHook {
  id: string
  event_version: string
  create_time: string
  resource_type: string
  resource_version: string
  event_type: string
  summary: string
  resource: Resource
  links: Link2[]
}

export interface Resource {
  create_time: string
  purchase_units: PurchaseUnit[]
  links: Link[]
  id: string
  payment_source: PaymentSource
  intent: string
  payer: Payer
  status: string
}

export interface PurchaseUnit {
  reference_id: string
  amount: Amount
  payee: Payee
  items: Item[]
}

export interface Amount {
  currency_code: string
  value: string
  breakdown: Breakdown
}

export interface Breakdown {
  item_total: ItemTotal
}

export interface ItemTotal {
  currency_code: string
  value: string
}

export interface Payee {
  email_address: string
  merchant_id: string
  display_data: DisplayData
}

export interface DisplayData {
  brand_name: string
}

export interface Item {
  name: string
  unit_amount: UnitAmount
  quantity: string
  description: string
}

export interface UnitAmount {
  currency_code: string
  value: string
}

export interface Link {
  href: string
  rel: string
  method: string
}

export interface PaymentSource {
  paypal: Paypal
}

export interface Paypal {
  email_address: string
  account_id: string
  account_status: string
  name: Name
  address: Address
}

export interface Name {
  given_name: string
  surname: string
}

export interface Address {
  country_code: string
}

export interface Payer {
  name: Name2
  email_address: string
  payer_id: string
  address: Address2
}

export interface Name2 {
  given_name: string
  surname: string
}

export interface Address2 {
  country_code: string
}

export interface Link2 {
  href: string
  rel: string
  method: string
}
