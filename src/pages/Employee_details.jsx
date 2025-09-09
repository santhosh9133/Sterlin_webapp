import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Employee_details = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/employees/${id}`)
        const data = await response.json()
        
        if (data.success) {
          setEmployee(data.data)
        } else {
          setError(data.message || 'Failed to fetch employee data')
        }
      } catch (err) {
        setError('Error connecting to server')
        console.error('Error fetching employee:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEmployee()
    }
  }, [id])

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="alert alert-danger text-center">
            <h5>Error</h5>
            <p>{error}</p>
            <Link to="/employee" className="btn btn-primary">Back to Employee List</Link>
          </div>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="alert alert-warning text-center">
            <h5>Employee Not Found</h5>
            <p>The requested employee could not be found.</p>
            <Link to="/employee" className="btn btn-primary">Back to Employee List</Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div>
              <Link to="/employee" className="d-inline-flex align-items-center">
                <i className="ti ti-chevron-left me-2"></i>Back to List
              </Link>
            </div>
            <ul className="table-top-head">
              <li className="me-2">
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh" onClick={() => window.location.reload()}>
                  <i className="ti ti-refresh"></i>
                </a>
              </li>
              <li className="me-2">
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header">
                  <i className="ti ti-chevron-up"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-4 theiaStickySidebar">
              <div className="card rounded-0 border-0">
                <div className="card-header rounded-0 bg-primary d-flex align-items-center">
                  <span className="avatar avatar-xl avatar-rounded flex-shrink-0 border border-white border-3 me-3">
                    <img src={employee.profilePhoto ? `http://localhost:5001${employee.profilePhoto}` : "/assets/img/users/user-32.jpg"} alt="Img" />
                  </span>
                  <div className="me-3">
                    <h6 className="text-white mb-1">{employee.firstName} {employee.lastName}</h6>
                    <span className="badge bg-purple-transparent text-purple">{employee.designation || 'N/A'}</span>
                  </div>
                  <div>
                    <a href="#" className="btn btn-white">Edit Profile</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-id me-2"></i>
                      Employee ID
                    </span>
                    <p className="text-dark">{employee.empCode || 'N/A'}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-star me-2"></i>
                      Department
                    </span>
                    <p className="text-dark">{employee.department || 'N/A'}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-calendar-check me-2"></i>
                      Date Of Join
                    </span>
                    <p className="text-dark">{formatDate(employee.joiningDate)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card rounded-0 border-0">
                <div className="card-header border-0 rounded-0 bg-light d-flex align-items-center">
                  <h6>Basic information</h6>
                </div>
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Phone</p>
                        <span className="text-gray-900 fs-13">{employee.contactNumber || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Email</p>
                        <span className="text-gray-900 fs-13">{employee.email || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Gender</p>
                        <span className="text-gray-900 fs-13">{employee.gender || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Birthday</p>
                        <span className="text-gray-900 fs-13">{formatDate(employee.dateOfBirth)}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Address</p>
                        <span className="text-gray-900 fs-13">{employee.address || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Nationality</p>
                        <span className="text-gray-900 fs-13">{employee.nationality || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Blood Group</p>
                        <span className="text-gray-900 fs-13">{employee.bloodGroup || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-13 mb-2">Shift</p>
                        <span className="text-gray-900 fs-13">{employee.shift || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card rounded-0 border-0">
                <div className="card-header border-0 rounded-0 bg-light d-flex align-items-center">
                  <h6>About Employee</h6>
                </div>
                <div className="card-body pb-0">
                  <p>{employee.about || 'No additional information available about this employee.'}</p>
                </div>
              </div>
              <div className="card rounded-0 border-0">
                <div className="card-header border-0 rounded-0 bg-light d-flex align-items-center">
                  <h6>Bank Information</h6>
                </div>
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                       <div className="mb-3">
                         <p className="fs-13 mb-2">Bank Name</p>
                         <span className="text-gray-900 fs-13">{employee.bank?.bankName || 'N/A'}</span>
                       </div>
                     </div>
                     <div className="col-lg-3 col-md-6">
                       <div className="mb-3">
                         <p className="fs-13 mb-2">Bank account No</p>
                         <span className="text-gray-900 fs-13">{employee.bank?.accountNumber || 'N/A'}</span>
                       </div>
                     </div>
                     <div className="col-lg-3 col-md-6">
                       <div className="mb-3">
                         <p className="fs-13 mb-2">IFSC</p>
                         <span className="text-gray-900 fs-13">{employee.bank?.ifsc || 'N/A'}</span>
                       </div>
                     </div>
                     <div className="col-lg-3 col-md-6">
                       <div className="mb-3">
                         <p className="fs-13 mb-2">Branch</p>
                         <span className="text-gray-900 fs-13">{employee.bank?.branch || 'N/A'}</span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
              <div className="card rounded-0 border-0">
                 <div className="card-header border-0 rounded-0 bg-light d-flex align-items-center">
                   <h6>Emergency Contact Numbers</h6>
                 </div>
                 <div className="card-body pb-0">
                   {employee.emergencyContacts && employee.emergencyContacts.length > 0 ? (
                     employee.emergencyContacts.map((contact, index) => (
                       <div key={index} className="row mb-3">
                         <div className="col-12">
                           <h6 className="text-muted mb-2">Contact {index + 1}</h6>
                         </div>
                         <div className="col-md-4">
                           <div className="mb-3">
                             <p className="fs-13 mb-2">Name</p>
                             <span className="text-gray-900 fs-13">{contact.name || 'N/A'}</span>
                           </div>
                         </div>
                         <div className="col-md-4">
                           <div className="mb-3">
                             <p className="fs-13 mb-2">Relation</p>
                             <span className="text-gray-900 fs-13">{contact.relation || 'N/A'}</span>
                           </div>
                         </div>
                         <div className="col-md-4">
                           <div className="mb-3">
                             <p className="fs-13 mb-2">Phone Number</p>
                             <span className="text-gray-900 fs-13">{contact.contactNumber || 'N/A'}</span>
                           </div>
                         </div>
                       </div>
                     ))
                   ) : (
                     <div className="row">
                       <div className="col-12">
                         <p className="text-muted">No emergency contacts available</p>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2025 &copy; DreamsPOS. All Right Reserved</p>
          <p>Designed &amp; Developed by <a href="javascript:void(0);" className="text-primary">Dreams</a></p>
        </div>
      </div>
    </>
  )
}

export default Employee_details