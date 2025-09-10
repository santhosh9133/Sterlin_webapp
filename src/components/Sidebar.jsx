import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
     <>
      <div className="sidebar" id="sidebar">
				{/* <!-- Logo --> */}
				<div className="sidebar-logo">
					<a href="/" className="logo logo-normal">
						<img src="assets/img/image.png" alt="Img" style={{height:"50px", width:"60px"}}/>
					</a>
					<Link to="/" className="logo logo-white">
						<img src="assets/img/logo-white.svg" alt="Img" />
					</Link>
					<Link to="/" className="logo-small">
						<img src="assets/img/image.png" alt="Img" />
					</Link>
					<a id="toggle_btn" href="javascript:void(0);">
						<i data-feather="chevrons-left" className="feather-16"></i>
					</a>
				</div>
				{/* <!-- /Logo --> */}
				<div className="modern-profile p-3 pb-0">
					<div className="text-center rounded bg-light p-3 mb-4 user-profile">
						<div className="avatar avatar-lg online mb-3">
							<img src="assets/img/customer/customer15.jpg" alt="Img" className="img-fluid rounded-circle" />
						</div>
						<h6 className="fs-14 fw-bold mb-1">Adrian Herman</h6>
						<p className="fs-12 mb-0">System Admin</p>
					</div>
					<div className="sidebar-nav mb-3">
						<ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified bg-transparent" role="tablist">
							<li className="nav-item"><a className="nav-link active border-0" href="#">Menu</a></li>
							<li className="nav-item"><a className="nav-link border-0" href="chat.html">Chats</a></li>
							<li className="nav-item"><a className="nav-link border-0" href="email.html">Inbox</a></li>
						</ul>
					</div>
				</div>
				<div className="sidebar-header p-3 pb-0 pt-2">
					<div className="text-center rounded bg-light p-2 mb-4 sidebar-profile d-flex align-items-center">
						<div className="avatar avatar-md online">
							<img src="assets/img/customer/customer15.jpg" alt="Img" className="img-fluid rounded-circle" />
						</div>
						<div className="text-start sidebar-profile-info ms-2">
							<h6 className="fs-14 fw-bold mb-1">Adrian Herman</h6>
							<p className="fs-12">System Admin</p>
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-between menu-item mb-3">
						<div>
							<Link to="/" className="btn btn-sm btn-icon bg-light">
							<i className="ti ti-layout-grid-remove"></i>
						</Link>
						</div>
						<div>
						<Link to="/" className="btn btn-sm btn-icon bg-light">
							<i className="ti ti-brand-hipchat"></i>
						</Link>
					</div>
					<div>
						<Link to="/" className="btn btn-sm btn-icon bg-light position-relative">
							<i className="ti ti-message"></i>
						</Link>
					</div>
					<div className="notification-item">
						<Link to="/" className="btn btn-sm btn-icon bg-light position-relative">
							<i className="ti ti-bell"></i>
							<span className="notification-status-dot"></span>
						</Link>
					</div>
					<div className="me-0">
						<Link to="/" className="btn btn-sm btn-icon bg-light">
							<i className="ti ti-settings"></i>
						</Link>
					</div>
					</div>
				</div>
				<div className="sidebar-inner slimscroll">
					<div id="sidebar-menu" className="sidebar-menu">
						<ul>
							<li className="submenu-open">
								{/* <h6 className="submenu-hdr">Main</h6> */}
								<h6 className="submenu-hdr text-start">Menu</h6>
								<ul>
									<li className="submenu">
										<Link to={"/dashboard"}><i className="ti ti-layout-grid fs-16 me-2"></i><span>Dashboard</span></Link>
									<li className="active"><Link to={"/employee"}><i className="ti ti-user fs-16 me-2"></i><span>Employees</span></Link></li>
									<li><Link to={"/department"}><i className="ti ti-compass fs-16 me-2"></i><span>Department</span></Link></li>
									</li>
								</ul>
							</li>
							{/* <li className="submenu-open">
								<h6 className="submenu-hdr">HRM</h6>
								<ul>
									<li><Link to="/"><i className="ti ti-compass fs-16 me-2"></i><span>Departments</span></Link></li>
									<li><Link to="/"><i className="ti ti-git-merge fs-16 me-2"></i><span>Designation</span></Link></li>
                                    <li><Link to="/"><i className="ti ti-arrows-shuffle fs-16 me-2"></i><span>Shifts</span></Link></li>
									<li className="submenu">
										<a href="javascript:void(0);"><i className="ti ti-user-cog fs-16 me-2"></i><span>Attendence</span><span className="menu-arrow"></span></a>
										<ul>
		                                    <li><a href="attendance-employee.html">Employee</a></li>
											<li><a href="attendance-admin.html">Admin</a></li>
										</ul>
									</li>
									<li className="submenu">
										<a href="javascript:void(0);"><i className="ti ti-calendar fs-16 me-2"></i><span>Leaves</span><span className="menu-arrow"></span></a>
										<ul>
											<li><a href="leaves-admin.html">Admin Leaves</a></li>
											<li><a href="leaves-employee.html">Employee Leaves</a></li>
											<li><a href="leave-types.html">Leave Types</a></li>
										</ul>
									</li>
									<li><a href="holidays.html"><i className="ti ti-calendar-share fs-16 me-2"></i><span>Holidays</span></a>
									</li>
									<li className="submenu">
										<a href="employee-salary.html"><i className="ti ti-file-dollar fs-16 me-2"></i><span>Payroll</span><span className="menu-arrow"></span></a>
										<ul>
											<li><a href="employee-salary.html">Employee Salary</a></li>
											<li><a href="payslip.html">Payslip</a></li>
										</ul>
									</li>
								</ul>
							</li> */}
						</ul>
					</div>
				</div>
			</div>
     </>
  )
}

export default Sidebar