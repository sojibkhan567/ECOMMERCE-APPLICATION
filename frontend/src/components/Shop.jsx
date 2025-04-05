import React from 'react'
import Layout from './common/Layout'
import ProductImg from '../assets/images/product/eleven.jpg';

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav aria-level="breadcrumb" className='py-4'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="">Home</a></li>
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
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className='mb-3'>Brands</h3>
                <ul>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" />
                    <label htmlFor="" className='ps-2'>Flying Machine</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* shop product list */}
          <div className="col-md-9">
            <div className="row pb-5">
              {/* product card */}
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body pt-3">
                    <a href="">Red Check Shirt for men</a>
                    <div className="price">
                      $120 <span className="text-decoration-line-through">$100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body pt-3">
                    <a href="">Red Check Shirt for men</a>
                    <div className="price">
                      $120 <span className="text-decoration-line-through">$100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body pt-3">
                    <a href="">Red Check Shirt for men</a>
                    <div className="price">
                      $120 <span className="text-decoration-line-through">$100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body pt-3">
                    <a href="">Red Check Shirt for men</a>
                    <div className="price">
                      $120 <span className="text-decoration-line-through">$100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={ProductImg} alt="" className='w-100' />
                  </div>
                  <div className="card-body pt-3">
                    <a href="">Red Check Shirt for men</a>
                    <div className="price">
                      $120 <span className="text-decoration-line-through">$100</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop
