import React from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom';
import ProductImg from "../assets/images/product/seven.jpg"

const Cart = () => {
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          {/** navbar link */}
          <div className="col-md-12">
            <nav aria-level="breadcrumb" className='py-4'>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="shop">Cart</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-12">
            <div className="pb-3">
              <h2>Cart</h2>
              <table className="table">
                <tbody>
                  {/* product list */}
                  <tr className='mt-3'>
                    <td width={100}>
                      <img src={ProductImg} width={80} alt="" />
                    </td>
                    <td width={600}>
                      <h4>Dummy product title</h4>
                      <div className="d-flex align-items-center pt-3">
                        <span>$200</span>
                        <div className='ps-3'>
                          <button className="btn btn-size">ADD</button>
                        </div>
                      </div>
                    </td>
                    <td valign='middle'>
                      <input style={{ width: '100px' }} type="number" value={1} className='form-control' />
                    </td>
                    <td valign='middle'>
                      <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td width={100}>
                      <img src={ProductImg} width={80} alt="" />
                    </td>
                    <td width={600}>
                      <h4>Dummy product title</h4>
                      <div className="d-flex align-items-center pt-3">
                        <span>$200</span>
                        <div className='ps-3'>
                          <button className="btn btn-size">ADD</button>
                        </div>
                      </div>
                    </td>
                    <td valign='middle'>
                      <input style={{ width: '100px' }} type="number" value={1} className='form-control' />
                    </td>
                    <td valign='middle'>
                      <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/** subtota & check out btn section */}
        <div className="row justify-content-end">
          <div className="col-md-3">
            <div className="d-flex justify-content-between">
              <div><strong>Subtotal :</strong></div>
              <span>$20</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <div><strong>Shipping :</strong></div>
              <span>$20</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <div><strong>Grand total :</strong></div>
              <span>$25</span>
            </div>

            <div className="d-flex justify-content-end py-3">
              <Link to="/checkout">
                <button className="btn-primary btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
