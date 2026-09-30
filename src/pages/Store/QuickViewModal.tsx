import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryThemes } from '../../data/categoryTheme';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { stripLeadingEmoji } from '../../utils/stripLeadingEmoji';
import { ProductBanner } from './ProductBanner';
import styles from './QuickViewModal.module.css';

interface QuickViewModalProps {
  readonly product: Product;
  readonly onClose: () => void;
  readonly onAddToCart: (productId: string) => void;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const theme = categoryThemes[product.category];
  const price = formatPrice(product.price, product.currency, product.billing);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={{ '--card-accent': theme.color } as React.CSSProperties}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} aria-label="Cerrar" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className={styles.imageWrap}>
          <ProductBanner product={product} size="large" />
        </div>

        <div className={styles.content}>
          <span className={styles.tagline}>{product.tagline}</span>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.priceRow}>
            <span className={styles.priceMain}>{price.main}</span>
            <span className={styles.priceCaption}>{price.caption}</span>
          </div>

          <ul className={styles.list}>
            {product.fullDescription.map((paragraph) => (
              <li key={paragraph}>{stripLeadingEmoji(paragraph)}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.buyBtn}
              data-cursor-active
              onClick={() => {
                onAddToCart(product.id);
                onClose();
              }}
            >
              Comprar
            </button>
            <Link to={`/store/${product.id}`} className={styles.detailLink} data-cursor-active onClick={onClose}>
              Ver detalles completos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
