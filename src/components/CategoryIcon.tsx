import type { ProductCategoryId } from '../types';

interface CategoryIconProps {
  readonly category: ProductCategoryId;
  readonly size?: number;
  readonly className?: string;
}

const paths: Record<ProductCategoryId, React.ReactNode> = {
  tokens: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v8M9 12h6" strokeLinecap="round" />
    </>
  ),
  membership: <path d="M4 8l3 3 5-6 5 6 3-3-2 10H6L4 8z" strokeLinejoin="round" />,
  clans: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />,
  clothing: (
    <path
      d="M8 4l4 2 4-2 4 4-3 3v9H7v-9L4 8l4-4z"
      strokeLinejoin="round"
    />
  ),
  'battle-pass': (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M9 7v10M15 7v10" strokeDasharray="1 2.4" />
    </>
  ),
  unban: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 7.6-1.8" strokeLinecap="round" />
    </>
  ),
};

export function CategoryIcon({ category, size = 22, className }: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      {paths[category]}
    </svg>
  );
}
