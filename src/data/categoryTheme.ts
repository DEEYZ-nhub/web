import type { ProductCategoryId } from '../types';

export interface CategoryTheme {
  readonly color: string;
  readonly colorDim: string;
}

export const categoryThemes: Record<ProductCategoryId, CategoryTheme> = {
  tokens: { color: '#f2b93b', colorDim: '#5c4110' },
  membership: { color: '#e8c766', colorDim: '#4a3a10' },
  clans: { color: '#4da3ff', colorDim: '#0f2a52' },
  clothing: { color: '#ff6fb0', colorDim: '#521a38' },
  'battle-pass': { color: '#4ade80', colorDim: '#134a2a' },
  unban: { color: '#9aa3af', colorDim: '#2a2e35' },
};
