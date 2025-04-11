import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import ProductImg1 from '../assets/images/product/ten.jpg';
import ProductImg2 from '../assets/images/product/eleven.jpg';
import ProductImg3 from '../assets/images/product/four.jpg';
import ProductImg4 from '../assets/images/product/two.jpg';
import { Rating } from 'react-simple-star-rating';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(3)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
  }

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-level="breadcrumb" className='py-4'>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item" aria-current="shop"><Link to="/shop">Shop</Link></li>
                <li className="breadcrumb-item active" aria-current="shop">Dummy product title</li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Product details */}
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >

                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImg1}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImg2}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImg3}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImg4}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >

                  <SwiperSlide >
                    <div className='content'>
                      <img
                        src={ProductImg1}
                        alt=""
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide >
                    <div className='content'>
                      <img
                        src={ProductImg2}
                        alt=""
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide >
                    <div className='content'>
                      <img
                        src={ProductImg3}
                        alt=""
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide >
                    <div className='content'>
                      <img
                        src={ProductImg4}
                        alt=""
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>Dummy product title</h2>
            <div className='d-flex align-items-center'>
              <Rating
                onClick={handleRating}
                initialValue={rating}
              />
              <span className='pt-1 ps-3 review'>10 Reviews</span>
            </div>
            <div className="price h3 py-3">
              $20 <span className="text-decoration-line-through">$30</span>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe similique accusantium nemo fugiat suscipit ex reiciendis officia dolores tenetur voluptatem cupiditate nostrum velit, ab culpa dolorum ullam harum quis ipsa molestiae impedit quas repellat esse? Unde ea illo amet ipsa dolores labore voluptate iure officia quo quos sequi, ratione facere aliquid rem odit facilis ipsam.
            </div>
            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes pt-2">
                <button className="btn btn-size ms-1">S</button>
                <button className="btn btn-size ms-1">M</button>
                <button className="btn btn-size ms-1">L</button>
                <button className="btn btn-size ms-1">XL</button>
              </div>
            </div>
            <div className="add-to-cart mt-4">
              <button className="btn btn-primary pt-3 pb-3">Add to Cart</button>
            </div>
            <hr />
            <div>
              <strong>SKU: </strong>
              DXA87787HG
            </div>
          </div>
        </div>
        {/* Product description tab */}
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                Tab content for description
              </Tab>
              <Tab eventKey="review" title="Reviews (10)">
                Tab content for Review
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Product
