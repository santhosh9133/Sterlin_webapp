import React from 'react';

const Dashboard = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Dashboard</h4>
                <h6>Manage your restaurant operations</h6>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget">
                <div className="dash-widgetimg">
                  <span><img src="assets/img/icons/dash1.svg" alt="img" /></span>
                </div>
                <div className="dash-widgetcontent">
                  <h5><span className="counters">307144</span></h5>
                  <h6>Total Purchase Due</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget">
                <div className="dash-widgetimg">
                  <span><img src="assets/img/icons/dash2.svg" alt="img" /></span>
                </div>
                <div className="dash-widgetcontent">
                  <h5><span className="counters">4385</span></h5>
                  <h6>Total Sales Due</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget">
                <div className="dash-widgetimg">
                  <span><img src="assets/img/icons/dash3.svg" alt="img" /></span>
                </div>
                <div className="dash-widgetcontent">
                  <h5><span className="counters">385656</span></h5>
                  <h6>Total Sale Amount</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget">
                <div className="dash-widgetimg">
                  <span><img src="assets/img/icons/dash4.svg" alt="img" /></span>
                </div>
                <div className="dash-widgetcontent">
                  <h5><span className="counters">40000</span></h5>
                  <h6>Total Sale Return</h6>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Purchase & Sales</h5>
                </div>
                <div className="card-body">
                  <div id="sales_charts"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Recently Added Products</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive dataview">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Sno</th>
                          <th>Products</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="productimgname">
                            <a href="#" className="product-img">
                              <img src="assets/img/product/product22.jpg" alt="product" />
                            </a>
                            <a href="#">Apple Earpods</a>
                          </td>
                          <td>$891.2</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="productimgname">
                            <a href="#" className="product-img">
                              <img src="assets/img/product/product23.jpg" alt="product" />
                            </a>
                            <a href="#">iPhone 11</a>
                          </td>
                          <td>$668.51</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="productimgname">
                            <a href="#" className="product-img">
                              <img src="assets/img/product/product24.jpg" alt="product" />
                            </a>
                            <a href="#">Samsung</a>
                          </td>
                          <td>$522.29</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;