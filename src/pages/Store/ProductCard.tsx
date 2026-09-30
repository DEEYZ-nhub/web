import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryThemes } from '../../data/categoryTheme';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { ProductBanner } from './ProductBanner';
import styles from './StorePage.module.css';

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart: (productId: string) => void;
  readonly onQuickView?: (product: Product) => void;
}

const InfoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 11v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7.7" r="1.05" fill="currentColor" />
  </svg>
);

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const price = formatPrice(product.price, product.currency, product.billing);
  const theme = categoryThemes[product.category];

  const handleAdd = () => {
    onAddToCart(product.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className={styles.card} style={{ '--card-accent': theme.color } as React.CSSProperties}>
      <Link to={`/store/${product.id}`} className={styles.bannerLink} data-cursor-active>
        <ProductBanner product={product} />
      </Link>
      <div className={styles.body}>
        <span className={styles.tagline}>{product.tagline}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.shortDescription}</p>
        <div className={styles.priceRow}>
          <span className={styles.priceMain}>{price.main}</span>
          <span className={styles.priceCaption}>{price.caption}</span>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.addBtn} ${justAdded ? styles.added : ''}`}
            data-cursor-active
            onClick={handleAdd}
          >
            {justAdded ? 'Añadido ✓' : 'Comprar'}
          </button>
          {onQuickView && (
            <button
              type="button"
              className={styles.infoBtn}
              data-cursor-active
              aria-label={`Ver detalles de ${product.name}`}
              onClick={() => onQuickView(product)}
            >
              <InfoIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
