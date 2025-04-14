import React from 'react'
import Layout from '../common/Layout';
import Sidebar from '../common/Sidebar';
import { FaRegUser } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa6";

const Dashboard = () => {

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Dashboard</h4>
          </div>
          {/** Sidebar */}
          <div className="col-md-3">
            <Sidebar />
          </div>
          {/** Analytic card */}
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow analytic-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2>1</h2>
                        <span>Users</span>
                      </div>
                      <FaRegUser />
                    </div>
                  </div>
                  <div className="card-footer">
                    <a href="">View Users</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow analytic-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2>132</h2>
                        <span>Products</span>
                      </div>
                      <BsShop />
                    </div>
                  </div>
                  <div className="card-footer">
                    <a href="">View Products</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow analytic-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2>14</h2>
                        <span>Orders</span>
                      </div>
                      <FaCartArrowDown />
                    </div>
                  </div>
                  <div className="card-footer">
                    <a href="">View Orders</a>
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

export default Dashboard
