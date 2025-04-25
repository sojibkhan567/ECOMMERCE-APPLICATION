import React, { useEffect, useState } from 'react'
import { adminToken, apiUrl } from './http'
import ProductImg from '../../assets/images/product/five.jpg';
import Loader from './Loader';

const LatestProducts = () => {

  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  // fetch lastest products
  const latestProducts = async () => {
    setLoader(true);
    await fetch(apiUrl + '/lastest-products', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Accept": 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result.data)
        setProducts(result.data);
        setLoader(false);
      });
  }

  useEffect(() => {
    latestProducts();
  }, []);

  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-4">
          {loader == true && <Loader />}
          {
            products && products.map((product, index) => {
              return (
                <div className="col-md-3 col-6" key={index}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={product.image_url} alt="" className='w-100' />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">{product.title}</a>
                      <div className="price">
                        ${product.price}
                        {product.compare_price && <span className="text-decoration-line-through">${product.compare_price}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </section>
  )
}

export default LatestProducts
