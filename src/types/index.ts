export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly isLive?: boolean;
}

export interface NavDropdown {
  readonly label: string;
  readonly items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}

export interface StoreItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly glyph: string;
  readonly colorFrom: string;
  readonly colorTo: string;
  readonly badge?: string;
}

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly hue: number;
}

export interface StatItem {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
}

export type ProductCategoryId = 'tokens' | 'membership' | 'clans' | 'clothing' | 'battle-pass' | 'unban';

export interface ProductCategory {
  readonly id: ProductCategoryId;
  readonly label: string;
}

export type BillingPeriod = 'once' | 'month';

export interface Product {
  readonly id: string;
  readonly category: ProductCategoryId;
  readonly tagline: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly fullDescription: readonly string[];
  readonly price: number;
  readonly currency: 'EUR' | 'TOKENS';
  readonly billing: BillingPeriod;
  readonly icon: string;
  readonly colorFrom: string;
  readonly colorTo: string;
  readonly badge?: string;
  readonly image?: string;
}

export interface CartLine {
  readonly productId: string;
  readonly quantity: number;
}
