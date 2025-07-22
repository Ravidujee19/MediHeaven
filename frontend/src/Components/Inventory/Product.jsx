import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { assets } from '../../assets/frontend_assets/assets';
import RelatedProducts from './RelatedProducts';

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="container border-top pt-4 fade-in">
      {/* Custom CSS styles in the same file */}
      <style>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
        .thumb-img {
          max-width: 80px;
          border: 1px solid #dee2e6;
          border-radius: 0.25rem;
        }
        .thumb-img:hover {
          border-color: #0d6efd;
        }
      `}</style>

      {/* Product Display */}
      <div className="d-flex flex-column flex-md-row gap-4">
        {/* Product Images */}
        <div className="d-flex flex-column flex-sm-row gap-3 w-100">
          <div className="d-flex flex-row flex-sm-column overflow-auto gap-2 pe-2" style={{ maxWidth: '20%' }}>
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setImage(item)}
                className="img-fluid thumb-img cursor-pointer"
              />
            ))}
          </div>
          <div className="flex-grow-1 text-center">
            <img src={image} alt="" className="img-fluid" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-grow-1">
          <h1 className="fw-semibold fs-4">{productData.name}</h1>
          <div className="d-flex align-items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" style={{ width: '16px' }} />
            <img src={assets.star_icon} alt="" style={{ width: '16px' }} />
            <img src={assets.star_icon} alt="" style={{ width: '16px' }} />
            <img src={assets.star_dull_icon} alt="" style={{ width: '16px' }} />
            <img src={assets.star_dull_icon} alt="" style={{ width: '16px' }} />
            <p className="ms-2 mb-0">(122)</p>
          </div>
          <p className="mt-4 fs-3 fw-medium">{currency}{productData.price}</p>
          <p className="text-muted mt-3">{productData.description}</p>

          {/* Quantity Selector */}
          <div className="mt-4">
            <label htmlFor="quantity" className="form-label text-muted">Select Quantity:</label>
            <input
              type="number"
              id="quantity"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="form-control w-auto"
              style={{ maxWidth: '100px' }}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, quantity)}
            className="btn btn-success mt-4 px-4"
          >
            ADD TO CART
          </button>

          <hr className="mt-4" />
          <div className="text-muted mt-3 small">
            <p>✅ 100% Original product.</p>
            <p>💰 Cash on delivery is available on the product.</p>
            <p>🔁 Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-5">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
