import React, { useState, useEffect } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import { Link } from 'react-router-dom'

const Employee = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newJoiners: 0
  })

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/employees`)
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const result = await response.json()
          const data = result.data || []
        setEmployees(data)
        
        // Calculate stats
        const total = data.length
        const active = data.filter(emp => emp.isActive === true).length
        const inactive = data.filter(emp => emp.isActive === false).length
        const newJoiners = data.filter(emp => {
          const joinDate = new Date(emp.joinedDate)
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return joinDate >= thirtyDaysAgo
        }).length
        
        setStats({ total, active, inactive, newJoiners })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">
      Error: {error}
    </div>
  }

  return (
    <>
			<div className="page-wrapper">
				<div className="content">
					<div className="page-header">
						<div className="add-item d-flex">
							<div className="page-title">
								<h4>Employee</h4>
								<h6>Manage your Employee</h6>
							</div>
						</div>
						{/* <ul className="table-top-head">
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Print"><i data-feather="printer" className="feather-rotate-ccw"></i></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i data-feather="rotate-ccw" className="feather-rotate-ccw"></i></a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i data-feather="chevron-up" className="feather-chevron-up"></i></a>
							</li>
						</ul> */}
						<div className="page-btn">
							<Link to={"/add-employee"} className="btn btn-added"><i data-feather="plus-circle" className="me-2"></i>Add Employee</Link>
						</div>
					</div>
					<div className="row">
						<div className="col-xl-3 col-sm-6 col-12 d-flex">
							<div className="dash-count">
								<div className="dash-counts">
									<h4>{stats.total}</h4>
									<h5>Total Employee</h5>
								</div>
								<div className="dash-imgs">
									<i data-feather="user"></i>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6 col-12 d-flex">
							<div className="dash-count das1">
								<div className="dash-counts">
									<h4>{stats.active}</h4>
									<h5>Active</h5>
								</div>
								<div className="dash-imgs">
									<i data-feather="user-check"></i>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6 col-12 d-flex">
							<div className="dash-count das2">
								<div className="dash-counts">
									<h4>{stats.inactive}</h4>
									<h5>Inactive</h5>
								</div>
								<div className="dash-imgs">
									<i data-feather="user-x"></i>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6 col-12 d-flex">
							<div className="dash-count das3">
								<div className="dash-counts">
									<h4>{stats.newJoiners}</h4>
									<h5>New Joiners</h5>
								</div>
								<div className="dash-imgs">
									<i data-feather="user-plus"></i>
								</div>
							</div>
						</div>
					</div>
					<div className="card table-list-card">
						<div className="card-header">
							<div className="row">
								<div className="col-sm-9 col-12">
									<div className="d-flex align-items-center">
										<div className="input-blocks me-2">
											<div className="position-relative">
												<input type="text" className="form-control ps-5" placeholder="Search Employee" />
												<div className="layout-hide-box search-form">
													<span className="me-3"><i data-feather="search" className="feather-search"></i></span>
												</div>
											</div>
										</div>
										{/* <div className="input-blocks me-2">
											<div className="position-relative">
												<select className="select">
													<option>Choose Employee</option>
													<option>Macbook pro</option>
													<option>Orange</option>
												</select>
											</div>
										</div> */}
										{/* <div className="input-blocks">
											<div className="position-relative">
												<select className="select">
													<option>Choose Designation</option>
													<option>Computers</option>
													<option>Fruits</option>
												</select>
											</div>
										</div> */}
									</div>
								</div>
								<div className="col-sm-3 col-12">
									<div className="d-flex align-items-center justify-content-sm-end">
										<div className="input-blocks">
											<a className="btn btn-filters ms-auto"> <i data-feather="filter" className="feather-filter"></i> Filter </a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card-body">
							<div className="table-top">
								<div className="search-set">
									<div className="search-input">
										<a href="" className="btn btn-searchset"><i data-feather="search" className="feather-search"></i></a>
									</div>
								</div>
								<div className="wordset">
									<ul>
										<li>
											<a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
										</li>
										<li>
											<a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
										</li>
										<li>
											<a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><i data-feather="printer" className="feather-rotate-ccw"></i></a>
										</li>
									</ul>
								</div>
							</div>
							<div className="employee-grid-widget">
								<div className="employee-grid">
  {employees.length === 0 ? (
    <div className="col-12">
      <div className="alert alert-warning text-center">
        <h5>No employees found</h5>
        <p>There are currently no employees in the system.</p>
      </div>
    </div>
  ) : (
    employees.map((employee) => (
      <Link key={employee._id} to={`/employee_details/${employee._id}`}>
        <EmployeeCard employee={employee} />
      </Link>
    ))
  )}
</div>

							</div>
						</div>
					</div>
				</div>
				<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
					<p className="mb-0"> 2025 &copy; RichhMindx. All Right Reserved</p>
					<p>Designed &amp; Developed by <a href="http://richhmindx.com/" className="text-primary">RichhMindx</a></p>
				</div>
			</div>
    </>
  )
}

export default Employee