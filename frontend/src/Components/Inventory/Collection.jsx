import React, { useContext, useState, useEffect } from 'react';
import Title from './Title';
import { ShopContext } from '../../context/ShopContext';
import ProductItem from './ProductItem';

function Collection() {
  const { products } = useContext(ShopContext);
  const [showFilter, setFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = [...products];

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  return (
    <div className="d-flex flex-column flex-sm-row gap-3 border-top pt-4">
      {/* Filter Section */}
      <div style={{ minWidth: '240px' }}>
        <p className="mb-3 h5 d-flex align-items-center cursor-pointer">FILTERS</p>

        {/* Category Filter */}
        <div className={`border p-3 bg-white rounded shadow-sm mb-4 ${showFilter ? '' : 'd-none d-sm-block'}`}>
          <p className="mb-2 fw-medium small">CATEGORIES</p>
          <div className="d-flex flex-column gap-2 text-secondary small">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Medicines" onChange={toggleCategory} />
              <label className="form-check-label">Medicines</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Health & Wellness" onChange={toggleCategory} />
              <label className="form-check-label">Health & Wellness</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Medical Equipment" onChange={toggleCategory} />
              <label className="form-check-label">Medical Equipment</label>
            </div>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border p-3 bg-white rounded shadow-sm mb-4 ${showFilter ? '' : 'd-none d-sm-block'}`}>
          <p className="mb-2 fw-medium small">TYPE</p>
          <div className="d-flex flex-column gap-2 text-secondary small">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Vitamins & Supplements" onChange={toggleSubCategory} />
              <label className="form-check-label">Vitamins & Supplements</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Weight Management" onChange={toggleSubCategory} />
              <label className="form-check-label">Weight Management</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="Prescription Medicines" onChange={toggleSubCategory} />
              <label className="form-check-label">Prescription Medicines</label>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
        </div>

        <div className="row g-3">
          {filterProducts.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
