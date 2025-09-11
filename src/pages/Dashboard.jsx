import React from 'react';

const Dashboard = () => {
  return (
   <>
   <div className="page-wrapper">
				<div className="content">
					<div className="d-lg-flex align-items-center justify-content-between mb-4">
						<div>
							<h3 className="mb-1">Welcome, Admin</h3>
							<p>You have <span className="text-primary fw-bold">200+</span> Orders, Today</p>
						</div>
						<ul className="table-top-head">
							<li>
								<div className="input-icon-start position-relative">
									<span className="input-icon-addon fs-16 text-gray-9">
										<i className="ti ti-calendar"></i>
									</span>
									<input type="text" className="form-control date-range bookingrange" placeholder="Search Product" />
								</div>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" id="collapse-header" aria-label="Collapse" data-bs-original-title="Collapse" className=""><i data-feather="chevron-up" className="feather-16"></i></a>
							</li>
						</ul>
					</div>
					{/* <!-- Welcome Wrap --> */}
				<div className="welcome-wrap mb-4">
					<div className=" d-flex align-items-center justify-content-between flex-wrap">
						<div className="mb-3">
							<h2 className="mb-1 text-white">Welcome Back</h2>
							<p className="text-light">14 New customers Subscribed Today !!!</p>
						</div>
						<div className="d-flex align-items-center flex-wrap mb-1">
							<a href="#" className="btn btn-dark btn-md me-2 mb-2">customers</a>
                        <a href="#" className="btn btn-light btn-md mb-2">All Packages</a>
						</div>
					</div>
					<div className="welcome-bg">
						<img src="assets/img/bg/welcome-bg-02.svg" alt="img" className="welcome-bg-01" />
						<img src="assets/img/bg/welcome-bg-01.svg" alt="img" className="welcome-bg-03" />
					</div>
				</div>	
				{/* <!-- /Welcome Wrap --> */}

				<div className="row">

					{/* <!-- Total customers --> */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-building fs-16"></i>
									</span>
									<span className="badge bg-success fw-normal mb-3">
										+19.01%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">5468</h2>
										<p className="fs-13">Total customers</p>
									</div>
									<div className="company-bar1">5,10,7,5,10,7,5</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Total customers --> */}

					{/* <!-- Active customers --> */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-carousel-vertical fs-16"></i>
									</span>
									<span className="badge bg-danger fw-normal mb-3">
										-12%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">4598</h2>
										<p className="fs-13">Active customers</p>
									</div>
									<div className="company-bar2">5,3,7,6,3,10,5</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Active customers --> */}

					{/* <!-- Total Subscribers --> */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-chalkboard-off fs-16"></i>
									</span>
									<span className="badge bg-success fw-normal mb-3">
										+6%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">3698</h2>
										<p className="fs-13">Total Subscribers</p>
									</div>
									<div className="company-bar3">8,10,10,8,8,10,8</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Total Subscribers --> */}

					{/* <!-- Total Earnings --> */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-businessplan fs-16"></i>
									</span>
									<span className="badge bg-danger fw-normal mb-3">
										-16%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">$89,878,58</h2>
										<p className="fs-13">Total Earnings</p>
									</div>
									<div className="company-bar4">5,10,7,5,10,7,5</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Total Earnings --> */}

				</div>

				<div className="row">

					{/* <!-- customers --> */}
					<div className="col-xxl-3 col-lg-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">customers</h5>								
								<div className="dropdown mb-2">
									<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>This Week
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" className="dropdown-item rounded-1">This Month</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">This Week</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">Today</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div id="company-chart"></div>
								<p className="f-13 d-inline-flex align-items-center"><span className="badge badge-success me-1">+6%</span> 5 customers  from last month</p>
							</div>
						</div>
					</div>
					{/* <!-- /customers --> */}
					
					{/* <!-- Revenue --> */}
					<div className="col-lg-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Revenue</h5>								
								<div className="dropdown mb-2">
									<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>2025
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" className="dropdown-item rounded-1">2024</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">2025</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">2023</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body pb-0">
								<div className="d-flex align-items-center justify-content-between flex-wrap">
									<div className="mb-1">
                                        <h5 className="mb-1">$45787</h5>
                                        <p><span className="text-success fw-bold">+40%</span> increased from last year</p>
									</div>
                                    <p className="fs-13 text-gray-9 d-flex align-items-center mb-1"><i className="ti ti-circle-filled me-1 fs-6 text-primary"></i>Revenue</p>
								</div>
								<div id="revenue-income"></div>
							</div>
						</div>
					</div>
					{/* <!-- /Revenue --> */}

					{/* <!-- Top Plans --> */}
					<div className="col-xxl-3 col-xl-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Top Plans</h5>							
								<div className="dropdown mb-2">
									<a href="#" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>This Month
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" className="dropdown-item rounded-1">This Month</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">This Week</a>
										</li>
										<li>
											<a href="#" className="dropdown-item rounded-1">Today</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div id="plan-overview"></div>
								<div className="d-flex align-items-center justify-content-between mb-2">
									<p className="f-13 mb-0"><i className="ti ti-circle-filled text-primary me-1"></i>Basic </p>
									<p className="f-13 fw-medium text-gray-9">60%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-2">
									<p className="f-13 mb-0"><i className="ti ti-circle-filled text-warning me-1"></i>Premium</p>
									<p className="f-13 fw-medium text-gray-9">20%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-0">
									<p className="f-13 mb-0"><i className="ti ti-circle-filled text-info me-1"></i>Enterprise</p>
									<p className="f-13 fw-medium text-gray-9">20%</p>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Top Plans --> */}

				</div>

				<div className="row">

					{/* <!-- Recent Transactions --> */}
					<div className="col-xxl-4 col-xl-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Recent Transactions</h5>
								<a href="#" className="btn btn-light btn-sm mb-2">View All</a>
							</div>
							<div className="card-body pb-2">
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                         
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/company/company-02.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Stellar Dynamics</a></h6>
                                            <p className="fs-13 d-inline-flex align-items-center"><span className="text-info">#12457</span><i className="ti ti-circle-filled fs-6 text-primary mx-1"></i>14 Jan 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6 className="mb-1">+$245</h6>
                                        <p className="fs-13">Basic</p>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                           
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/company/company-03.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Quantum Nexus</a></h6>
                                            <p className="fs-13 d-inline-flex align-items-center"><span className="text-info">#65974</span><i className="ti ti-circle-filled fs-6 text-primary mx-1"></i>14 Jan 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6 className="mb-1">+$395</h6>
                                        <p className="fs-13">Enterprise</p>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                           
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/company/company-05.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Aurora Technologies</a></h6>
                                            <p className="fs-13 d-inline-flex align-items-center"><span className="text-info">#22457</span><i className="ti ti-circle-filled fs-6 text-primary mx-1"></i>14 Jan 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6 className="mb-1">+$145</h6>
                                        <p className="fs-13">Advanced</p>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                        
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/company/company-07.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">TerraFusion Energy</a></h6>
                                            <p className="fs-13 d-inline-flex align-items-center"><span className="text-info">#43412</span><i className="ti ti-circle-filled fs-6 text-primary mx-1"></i>14 Jan 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6 className="mb-1">+$145</h6>
                                        <p className="fs-13">Enterprise</p>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-1">
                                    <div className="d-flex align-items-center mb-2">                                           
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/company/company-08.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Epicurean Delights</a></h6>
                                            <p className="fs-13 d-inline-flex align-items-center"><span className="text-info">#43567</span><i className="ti ti-circle-filled fs-6 text-primary mx-1"></i>14 Jan 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6 className="mb-1">+$977</h6>
                                        <p className="fs-13">Premium</p>
                                    </div>
                                </div>
							</div>
						</div>
					</div>
					{/* <!-- /Recent Transactions --> */}

					{/* <!-- Recently Registered --> */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Recently Registered</h5>
								<a href="#" className="btn btn-light btn-sm mb-2">View All</a>
							</div>
							<div className="card-body pb-2">
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                            
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/icons/company-icon-11.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Pitch</a></h6>
                                            <p className="fs-13">Basic (Monthly)</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6>150 Users</h6>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                                   
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/icons/company-icon-12.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Initech</a></h6>
                                            <p className="fs-13">Enterprise (Yearly)</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6>200 Users</h6>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                                
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/icons/company-icon-13.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Umbrella Corp</a></h6>
                                            <p className="fs-13">Advanced (Monthly)</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6>129 Users</h6>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
                                    <div className="d-flex align-items-center mb-2">                                                   
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/icons/company-icon-14.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Capital Partners</a></h6>
                                            <p className="fs-13">Enterprise (Monthly)</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6>103 Users</h6>
                                    </div>
                                </div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-1">
                                    <div className="d-flex align-items-center mb-2">                                                    
                                        <a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
                                            <img src="assets/img/icons/company-icon-15.svg" className="img-fluid w-auto h-auto" alt="img" />
                                        </a>
                                        <div className="ms-2 flex-fill">
                                            <h6 className="fs-medium text-truncate mb-1"><a href="#">Massive Dynamic</a></h6>
                                            <p className="fs-13">Premium (Yearly)</p>
                                        </div>
                                    </div>
                                    <div className="text-sm-end mb-2">
                                        <h6>108 Users</h6>
                                    </div>
                                </div>
							</div>
						</div>
					</div>
					{/* <!-- /Recent Registered --> */}

					{/* <!-- Recent Plan Expired --> */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Recent Plan Expired</h5>
								<a href="#" className="btn btn-light btn-sm mb-2">View All</a>      
							</div>
							<div className="card-body pb-2">
                                <div>
									<div className="d-sm-flex align-items-center justify-content-between flex-wrap mb-3">
										<div className="d-flex align-items-center mb-2">                                            
											<a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
												<img src="assets/img/icons/company-icon-16.svg" className="img-fluid w-auto h-auto" alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<h6 className="fs-medium text-truncate mb-1"><a href="#">Silicon Corp</a></h6>
												<p className="fs-13">Expired : 10 Apr 2025</p>
											</div>
										</div>
										<div className="text-sm-end mb-2">
											<a href="#" className="link-info text-decoration-underline d-block mb-1">Send Reminder</a>
										</div>
									</div>
									<div className="d-sm-flex align-items-center justify-content-between flex-wrap mb-3">
										<div className="d-flex align-items-center mb-2">                                        
											<a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
												<img src="assets/img/icons/company-icon-14.svg" className="img-fluid w-auto h-auto" alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<h6 className="fs-medium text-truncate mb-1"><a href="#">Hubspot</a></h6>
												<p className="fs-13">Expired : 12 Jun 2025</p>
											</div>
										</div>
										<div className="text-sm-end mb-2">
											<a href="#" className="link-info text-decoration-underline d-block mb-1">Send Reminder</a>
										</div>
									</div>
									<div className="d-sm-flex align-items-center justify-content-between flex-wrap mb-3">
										<div className="d-flex align-items-center mb-2">                                      
											<a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
												<img src="assets/img/icons/company-icon-18.svg" className="img-fluid w-auto h-auto" alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<h6 className="fs-medium text-truncate mb-1"><a href="#">Licon Industries</a></h6>
												<p className="fs-13">Expired : 16 Jun 2025</p>
											</div>
										</div>
										<div className="text-sm-end mb-2">
											<a href="#" className="link-info text-decoration-underline d-block mb-1">Send Reminder</a>
										</div>
									</div>
									<div className="d-sm-flex align-items-center justify-content-between flex-wrap mb-3">
										<div className="d-flex align-items-center mb-2">                                     
											<a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
												<img src="assets/img/company/company-07.svg" className="img-fluid w-auto h-auto" alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<h6 className="fs-medium text-truncate mb-1"><a href="#">TerraFusion Energy</a></h6>
												<p className="fs-13">Expired : 12 May 2025</p>
											</div>
										</div>
										<div className="text-sm-end mb-2">
											<a href="#" className="link-info text-decoration-underline d-block mb-1">Send Reminder</a>
										</div>
									</div>
									<div className="d-sm-flex align-items-center justify-content-between flex-wrap mb-1">
										<div className="d-flex align-items-center mb-2">                                       
											<a href="#" className="avatar bg-gray-100 rounded-circle flex-shrink-0">
												<img src="assets/img/company/company-08.svg" className="img-fluid w-auto h-auto" alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<h6 className="fs-medium text-truncate mb-1"><a href="#">Epicurean Delights</a></h6>
												<p className="fs-13">Expired : 15 May 2025</p>
											</div>
										</div>
										<div className="text-sm-end mb-2">
											<a href="#" className="link-info text-decoration-underline d-block mb-1">Send Reminder</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Recent Plan Expired --> */}
				</div>
				</div>
				<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
                    <p className="mb-0 text-gray-9">2025 &copy; Richhmindx. All Right Reserved</p>
                    <p>Designed &amp; Developed by <a href="#" className="text-primary">Richhmindx</a></p>
                </div>
			</div>
   </>
  );
};

export default Dashboard;