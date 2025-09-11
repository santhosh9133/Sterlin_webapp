import React from 'react';

const EmployeeCard = ({ employee }) => {
  // Handle missing employee data
  if (!employee) {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body text-center">
            <div className="alert alert-warning" role="alert">
              Employee data not available
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="col-lg-11 col-md-6 col-sm-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between mb-2">
            <div className="form-check form-check-md">
              <input className="form-check-input" type="checkbox" />
            </div>
            <div>
              <div className="avatar avatar-xl avatar-rounded border p-1 rounded-circle">
                <img
                  src={
                    employee.profilePhoto
                      ? employee.profilePhoto.startsWith("/uploads")
                        ? `http://localhost:5001${employee.profilePhoto}`
        : `http://localhost:5001/uploads/${employee.profilePhoto}`
                      : "/assets/img/users/user-1.jpg"
                  }
                  className="img-fluid h-auto w-auto"
                  alt="Employee"
                  onError={(e) => {
                    console.log("Image failed to load:", e.target.src);
                    e.target.src = "/assets/img/users/user-32.jpg";
                  }}
                  onLoad={() => {
                    console.log("Image loaded successfully");
                  }}
                />

              </div>
            </div>
            <div className="dropdown">
              <button className="action-icon border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">
                <i data-feather="more-vertical" className="feather-user"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item border-0 bg-transparent w-100 text-start">
                    <i data-feather="edit" className="me-2"></i>Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item confirm-text mb-0 border-0 bg-transparent w-100 text-start">
                    <i data-feather="trash-2" className="me-2"></i>Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
              {employee.empCode ? (
              <a href={`/employee_details/${employee._id}`} style={{ textDecoration: 'none' }}>
                <p className="text-primary mb-2" style={{ cursor: 'pointer' }}>EMP ID : {employee.empCode}</p>
              </a>
            ) : (
              <p className="text-primary mb-2">EMP ID : N/A</p>
            )}
          </div>
          <div className="text-center mb-3">
            <h6 className="mb-1">
              {employee.firstName || 'Unknown'}{' '}
              {employee.lastName ? (
                <a href={`/employee_details/${employee._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ cursor: 'pointer' }}>{employee.lastName}</span>
                </a>
              ) : ''}
            </h6>
            <div className="d-flex justify-content-center gap-2 mb-2">
              <span className="badge bg-secondary-transparent text-gray-9 fs-10 fw-medium">
                {employee.designation || 'No Designation'}
              </span>
              <span className={`badge fs-10 fw-medium ${employee.isActive === true
                  ? 'bg-success-transparent text-success'
                  : 'bg-danger-transparent text-danger'
                }`}>
                {employee.isActive === true ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between bg-light rounded p-3">
            <div className="text-start">
              <h6 className="mb-1">Joined</h6>
              <p>{formatDate(employee.joiningDate || employee.dateOfJoining)}</p>
            </div>
            <div className="text-start">
              <h6 className="mb-1">Department</h6>
              <p>{employee.department || 'No Department'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;