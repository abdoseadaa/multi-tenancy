import { Request as ExpressRequest, NextFunction } from "express";


interface User {
    tenant_id: string
}

export interface Request extends ExpressRequest  { 
    user: User
}


export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;


import { Document  , ObjectId as ObjId } from "mongoose";
export type ICustomField = {
    DefinitionId: string;
    Name: string;        
    Type: string;        
    StringValue: string; 
}
export type Object_Id = ObjId & {
    equals: (value: string | ObjId) => boolean;
    toHexString: () => string;
  };



export interface Customer {
  account_id?: Object_Id;
  name: string;
  phone: string;
  email?: string;
  country: {
    id: Object_Id;
    name: string;
  } | null;
  city: {
    id: Object_Id;
    name: string;
  } | null;
  orders_count: number;
  gender?: "male" | "female";
  birth_date?: Date;
  has_account: boolean;
  is_cod_allowed: boolean;
  is_blocked: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  quickbooks_id?:string
}

export interface CustomerDocument extends Customer, Document {}

export type CreateCustomerData = Pick<
  Customer,
  "name" | "phone" | "email" | "country" | "city" | "account_id" | "has_account" | "quickbooks_id"
>;

export type UpdateCustomerData = Partial<
  Omit<
    Customer,
    "created_at" | "has_account" | "address" | "account_id" | "updated_at"  | "is_deleted"
  >
> & { updated_at: Date };





export interface CustomAttribute {
  _id?: Object_Id;
  key: string;
  type: "text" | "number" | "boolean" | "date";
  value: string | Record<string, any>;
  is_multi_lang: boolean;
}

interface Notifier {
  email : string;
  is_notified : boolean;
}

export interface Product {
  store_id: Object_Id;
  name: Record<string, string>;
  description: Record<string, string>;
  base_price?: number;
  price: number;
  price_before_discount: number;
  sku: string; // stock keeping unit
  weight: number; // default 0
  weight_unit: string; // default kg
  // weight_unite_exchange_rate: number; // default 1
  // wlh: [number, number, number]; // (width,length,height) default [0,0,0]
  color?: string;
  color_hex?: string;
  quantity: number;
  min_quantity_per_order?: Number;
  max_quantity_per_order?: Number;
  categories: Object_Id[]; // ref to categories
  tags: string[];
  images: string[];
  seo: {
    page_title: string;
    page_description: string;
    page_url: string;
  };
  notify_list?: Notifier[]


  custom_attributes: CustomAttribute[];
  options: { id: Object_Id; values: Object_Id[] }[];
  is_discounted: boolean;
  has_multiple_options: boolean;
  is_endless_quantity: boolean;
  is_tax_exempt: boolean;
  is_visible: boolean;
  is_available: boolean;
  is_require_shipping: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  quickbooks_id?: string;
}

export type CreateProductData = Omit<
  Product,
  "created_at" | "updated_at" | "is_deleted" | "deleted_at"
>;

export interface ProductDocument extends Product, Document {}




export type OrderStatus =
  | "initial"
  | "new"
  | "preparing"
  | "prepared"
  | "in_delivery"
  | "delivered"
  | "canceled";


export interface OrderProduct {
  id: Object_Id;
  sku: string;
  name: string;

  total_vat_percentage: number;

  net_price_before_discount: number;
  price_before_discount: number; // net_price_before_discount + (net_price_before_discount * total_vat_percentage)

  net_price: number;
  price: number; // net_price + (net_price * total_vat_percentage)

  net_additions: number;
  additions: number; // net_additions + (net_additions * total_vat_percentage)

  total_price_before_discount: number; // (price_before_discount + additions) * quantity
  total_price: number; // (price + additions) * quantity
  total_vat: number; // total_price * total_vat_percentage

  quantity: number;
  weight?: number;
  color?: string;
  color_hex?: string;
  is_discounted: boolean;
  is_taxable: boolean;
}

export interface Order {
  code: string;
  cart_id: Object_Id;

  store: {
    id: Object_Id; // ref to store
    name: string;
    url: string;
  };
  invoice_url: string;
  products: OrderProduct[];
  total_price: number;
  products_sum_total: number;
  vats: {

    percentage: number;
    value: number;
  }[];
  customer: {
    name: string;
    id: Object_Id; // ref to customer
    verified: boolean;
  };
  deliver_to: {
    name: string;
    phone: string;
    email?: string;
  };

  local_pickup_warehouse?: Object_Id; // ref to warehouse
  status: OrderStatus;
  status_update_history: {
    status: OrderStatus;
    by: {
      id: Object_Id; // ref to account
      name: string;
      type: "customer" | "merchant" | "3rd_party";
    };
    notes?: string;
    updated_at: Date;
  }[];
  notes?: string;
  total_weight: number;
  weight_cost_details?: {
    additional_price_per_weight: number;
    additional_weight: number;
    base_weight: number;
    cost: number;
    total_weight: number;
    total_weight_price: number;
  };
  created_at: Date;
  updated_at: Date;
  is_local_pickup: boolean;
  is_cod: boolean;
  is_gift: boolean;
  is_canceled: boolean;
  quickbooks_id?:string;
}

export type CreateOrderData = Omit<
  Order,
  | "created_at"
  | "updated_at"
  | "is_canceled"
> & {_id?: Object_Id};

export type UpdateOrderData = Pick<
  Order,
  | "status"
  | "notes"
  | "updated_at"
>;
export interface OrderDocument extends Order, Document {}
