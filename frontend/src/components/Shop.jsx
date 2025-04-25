import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import ProductImg from '../assets/images/product/eleven.jpg';
import { Link, useSearchParams } from 'react-router-dom';
import { adminToken, apiUrl } from './common/http';
import Loader from './common/Loader';
import Nostate from './common/Nostate';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const [catChecked, setCatChecked] = useState(() => {
    const category = searchParams.get('category');
    return category ? category.split(',') : [];
  });

  const [brandChecked, setBrandChecked] = useState(() => {
    const brand = searchParams.get('brand');
    return brand ? brand.split(',') : [];
  });


  const [loader, setLoader] = useState(false);

  // fetch lastest products
  const fetchCategories = async () => {
    setLoader(true);
    await fetch(apiUrl + '/categories', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        //console.log(result.data)
        setCategories(result.data);
        setLoader(false);
      });
  }

  // fetch lastest products brnad
  const fetchBrands = async () => {
    setLoader(true);
    await fetch(apiUrl + '/brands', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        //console.log(result.data)
        setBrands(result.data);
        setLoader(false);
      });
  };

  // fetch lastest products data by brnad & category
  const fetchProducts = async () => {
    let search = [];
    let params = '';

    if (catChecked.length > 0) {
      search.push(['category', catChecked]);
    }
    if (brandChecked.length > 0) {
      search.push(['brand', brandChecked]);
    }

    if (search.length > 0) {
      params = new URLSearchParams(search);
      setSearchParams(params);
    } else {
      setSearchParams([]);
    }

    setLoader(true);
    fetch(`${apiUrl}/get-products?${params}`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        //console.log(result.data)
        setProducts(result.data);
        setLoader(false);
      });
  }

  // filter by category
  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCatChecked(pre => [...pre, value]);
    } else {
      setCatChecked(catChecked.filter(id => id != value));
    }
  }
  // filter by brand
  const handleBrand = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setBrandChecked(pre => [...pre, value]);
    } else {
      setBrandChecked(brandChecked.filter(id => id != value));
    }
  }


  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [catChecked, brandChecked]);

  return (
    <Layout>
      <div className="container">
        <nav aria-level="breadcrumb" className='py-4'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="shop"><a href="">Shop</a></li>
          </ol>
        </nav>
        <div className="row">
          {/* product filter */}
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className='mb-3'>Categories</h3>
                <ul>
                  {
                    categories && categories.map((category, index) => {
                      return (
                        <li className='mb-2' key={`category-id-${index}`}>
                          <input type="checkbox"
                            defaultChecked={searchParams.get('category') ? searchParams.get('category').includes(category.id) : false}
                            value={category.id}
                            onClick={handleCategory}
                          />
                          <label htmlFor="" className='ps-2'>{category.name}</label>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className='mb-3'>Brands</h3>
                <ul>
                  {
                    brands && brands.map((brand, index) => {
                      return (
                        <li className='mb-2' key={`brand-id-${index}`}>
                          <input type="checkbox"
                            defaultChecked={searchParams.get('brand') ? searchParams.get('brand').includes(brand.id) : false}
                            value={brand.id}
                            onClick={handleBrand}
                          />
                          <label htmlFor="" className='ps-2'>{brand.name}</label>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
          {/* shop product list */}
          <div className="col-md-9">
            <div className="row pb-5">
              {/* product card */}

              {
                products && products.map((product, index) => {
                  return (
                    <div className="col-md-4 col-6" key={index} >
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to="/product">
                            <img src={product.image_url} alt="" className='w-100' />
                          </Link>
                        </div>
                        <div className="card-body pt-3">
                          <Link to="/product">{product.title}</Link>
                          <div className="price">
                            ${product.price}
                            {product.compare_price && <span className="text-decoration-line-through">${product.compare_price}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }

            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Shop
