import React, { useContext } from 'react';
import { CurrencyContext } from '../context/Contexts';
import { collections } from '../data/products';
import './Collections.css';

// =============================================
// COLLECTION CARD COMPONENT
// =============================================
function CollectionCard({ collectionKey, data, onClick, t }) {
  // Map collectionKey to translation key
  const translationKey = `collection.${collectionKey}`;
  const title = t(translationKey) !== translationKey ? t(translationKey) : data.title;

  return (
    <div className="collection-card" onClick={onClick}>
      <img 
        src={data.image} 
        alt={title}
        loading="lazy"
        decoding="async"
      />
      <div className="collection-info">
        <h3 className="collection-name">{title}</h3>
        <p className="collection-desc">{data.description}</p>
        <span className="collection-count">
          {data.products.length} Products →
        </span>
      </div>
    </div>
  );
}

// =============================================
// COLLECTIONS SECTION
// =============================================
export default function Collections({ onOpenModal }) {
  const { t } = useContext(CurrencyContext);

  return (
    <section className="collections" id="shop">
      <div className="section-header">
        <span className="section-tag">Discover</span>
        <h2 className="section-title">Featured Collections</h2>
        <div className="section-line" />
      </div>
      <div className="collection-grid">
        {Object.entries(collections)
          .filter(([key]) => key !== 'sports')
          .map(([key, data]) => (
          <CollectionCard
            key={key}
            collectionKey={key}
            data={data}
            onClick={() => onOpenModal(key)}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}
