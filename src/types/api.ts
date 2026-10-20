export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  color?: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
}

export type Wishlist = WishlistItem[];

export interface ApiError {
  status: number | string;
  message: string;
  available?: number;
}

export interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface AddToCartArgs {
  product: Product;
  quantity: number;
}

export interface AddToWishlistArgs {
  product: Product;
}

export interface UpdateCartItemRequest {
  productId: number;
  quantity: number;
}
