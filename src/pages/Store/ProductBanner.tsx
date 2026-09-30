import { categoryThemes } from '../../data/categoryTheme';
import { CategoryIcon } from '../../components/CategoryIcon';
import type { Product } from '../../types';
import styles from './ProductBanner.module.css';

interface ProductBannerProps {
  readonly product: Product;
  readonly size?: 'card' | 'large';
}

export function ProductBanner({ product, size = 'card' }: ProductBannerProps) {
  const theme = categoryThemes[product.category];
  const badgeSize = size === 'large' ? 68 : 44;
  const iconSize = size === 'large' ? 30 : 20;
  const watermarkSize = size === 'large' ? 220 : 130;

  const bannerStyle = {
    '--line-color': `${theme.color}22`,
    '--glow-color': `${theme.color}33`,
    '--icon-color': theme.color,
    '--frame-color': `${theme.color}40`,
    '--tag-bg': `${theme.color}1f`,
    '--tag-fg': theme.color,
  } as React.CSSProperties;

  if (product.image) {
    return (
      <div className={styles.banner} style={bannerStyle}>
        <img src={product.image} alt={product.name} className={styles.photo} loading="lazy" />
        <div className={styles.scrim} />
        {product.badge && <span className={styles.tag}>{product.badge}</span>}
      </div>
    );
  }

  return (
    <div className={styles.banner} style={bannerStyle}>
      <div className={styles.texture} />
      <div className={styles.glow} />
      <CategoryIcon category={product.category} size={watermarkSize} className={styles.watermark} />
      <div className={styles.frame} />
      <div className={styles.badgeIcon} style={{ width: badgeSize, height: badgeSize }}>
        <CategoryIcon category={product.category} size={iconSize} />
      </div>
      {product.badge && <span className={styles.tag}>{product.badge}</span>}
    </div>
  );
}
