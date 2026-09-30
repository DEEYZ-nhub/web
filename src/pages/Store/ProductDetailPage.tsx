import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryThemes } from '../../data/categoryTheme';
import { products } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { stripLeadingEmoji } from '../../utils/stripLeadingEmoji';
import { ProductBanner } from './ProductBanner';
import { ProductCard } from './ProductCard';
import styles from './ProductDetailPage.module.css';

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BoltIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" fill="currentColor" />
  </svg>
);

const DiscordGlyph = ({ style }: { readonly style?: React.CSSProperties }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={style}>
    <path d="M20.3 5.4A17.6 17.6 0 0015.8 4l-.3.5a13 13 0 013.9 1.5 15.7 15.7 0 00-13.6 0A13 13 0 019.6 4.5L9.3 4a17.6 17.6 0 00-4.5 1.4C1.9 9.4 1.2 13.3 1.5 17.1a17.7 17.7 0 005.4 2.7l.7-1.2a11.5 11.5 0 01-1.9-.9l.4-.3a12.7 12.7 0 0010.8 0l.4.3a11.5 11.5 0 01-1.9.9l.7 1.2a17.6 17.6 0 005.4-2.7c.4-4.4-.6-8.3-2.6-11.7zM8.7 14.6c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm6.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" />
  </svg>
);

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <section className={styles.page}>
        <div className={`shell ${styles.notFound}`}>
          <h1>Producto no encontrado</h1>
          <p>Puede que el enlace sea incorrecto o el producto ya no esté disponible.</p>
          <Link to="/store" className={styles.addBtn}>
            Volver a la tienda
          </Link>
        </div>
      </section>
    );
  }

  const theme = categoryThemes[product.category];
  const price = formatPrice(product.price, product.currency, product.billing);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <section className={styles.page} style={{ '--card-accent': theme.color } as React.CSSProperties}>
      <div className="shell">
        <Link to="/store" className={styles.breadcrumb}>
          <BackIcon /> Volver a la tienda
        </Link>

        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <ProductBanner product={product} size="large" />
          </div>

          <div>
            <span className={styles.tagline}>{product.tagline}</span>
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.priceRow}>
              <span className={styles.priceMain}>{price.main}</span>
              <span className={styles.priceCaption}>{price.caption}</span>
            </div>

            <ul className={styles.list}>
              {product.fullDescription.map((paragraph) => (
                <li key={paragraph}>
                  <CheckIcon />
                  <span>{stripLeadingEmoji(paragraph)}</span>
                </li>
              ))}
            </ul>

            <div className={styles.purchaseRow}>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                >
                  −
                </button>
                <span className={styles.stepperValue}>{quantity}</span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
              <button type="button" className={styles.addBtn} data-cursor-active onClick={handleAdd}>
                {justAdded ? 'Añadido al carrito ✓' : 'Añadir al carrito'}
              </button>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.buyBtn}
                data-cursor-active
              >
                <DiscordGlyph style={{ marginRight: 8 } as React.CSSProperties} />
                Abrir ticket
              </a>
            </div>

            <div className={styles.trust}>
              <div className={styles.trustRow}>
                <BoltIcon />
                Disponible ahora
              </div>
              <div className={styles.trustRow}>
                <CheckIcon />
                Entrega gestionada de forma segura por ticket de Discord
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className={styles.related}>
            <div className={styles.relatedTitle}>También te puede interesar</div>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <ProductCard key={item.id} product={item} onAddToCart={addItem} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
