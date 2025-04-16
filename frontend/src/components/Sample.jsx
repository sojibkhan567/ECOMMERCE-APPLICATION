import React from 'react'

const Sample = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categories</h4>
            <Link to="" className='btn btn-primary'>Create</Link>
          </div>
          {/** Sidebar */}
          <div className="col-md-3">
            <Sidebar />
          </div>
          {/** card */}
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Sample
