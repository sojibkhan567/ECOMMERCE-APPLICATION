import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom';
import ProductImg from '../assets/images/product/ten.jpg';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  }
  return (
    <Layout>
      <div className="container billing py-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-level="breadcrumb" className='py-4'>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="shop">Checkout</li>
              </ol>
            </nav>
          </div>
        </div>
        {/** Billing form start */}
        <div className="row">
          <div className="col-md-7">
            <h3 className="pb-3 border-bottom"><strong>Billing Address</strong></h3>
            <form action="">
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Name' />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Name' />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea className='form-control' name="" id="" rows={3} placeholder='Address'></textarea>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className='form-control' placeholder='City' />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className='form-control' placeholder='State' />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Zip' />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Mobile' />
                  </div>
                </div>

              </div>
            </form>
          </div>
          {/* product list */}
          <div className="col-md-5">
            <h3 className="border-bottom pb-3">Items</h3>
            <table className="table table-borderless">
              <tbody>
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
                    <input disabled style={{ width: '100px' }} type="number" value={12} className='form-control' />
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
                    <input disabled style={{ width: '100px' }} type="number" value={1} className='form-control' />
                  </td>
                  <td valign='middle'>

                  </td>
                </tr>
              </tbody>
            </table>
            {/** subtotal & payment method */}
            <div className="row">
              <div className="col-md-12">
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
              </div>
            </div>
            {/** payment method */}
            <h3 className="pt-4 border-bottom pb-2"><strong>Payment Method</strong></h3>
            <div className='pt-3'>
              <input type="radio"
                onClick={handlePaymentMethod}
                checked={paymentMethod == 'stripe'} value={'stripe'} />
              <label htmlFor="stripe" className='form-label ps-2'>Stripe</label>

              <input className='ms-3' type="radio"
                onClick={handlePaymentMethod}
                checked={paymentMethod == 'cod'} value={'cod'} />
              <label htmlFor="cash" className='form-label ps-2'>Cash & Delivery</label>
            </div>
            <div className="d-flex justify-content-end py-3">
              <Link to="/checkout">
                <button className="btn-primary btn">Pay Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Checkout
