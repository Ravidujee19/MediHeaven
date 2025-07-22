import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <div className="card border-0">
      {/* Custom CSS for hover scale */}
      <style>{`
        .img-hover-zoom {
          transition: transform 0.3s ease-in-out;
        }
        .img-hover-zoom:hover {
          transform: scale(1.1);
        }
        .no-underline {
          text-decoration: none;
        }
      `}</style>

      <Link to={`/product/${id}`} className="no-underline text-dark">
        <div className="overflow-hidden rounded">
          <img src={image[0]} alt={name} className="card-img-top img-hover-zoom" />
        </div>
        <div className="card-body p-2">
          <p className="card-title small fw-semibold mb-1">{name}</p>
          <p className="card-text small">{currency}{price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
