import React, { useState, useEffect } from "react";
import AddDepartment from "./AddDepartment";
import AddDesignation from "./AddDesignation"; // Import AddDesignation component

const Department = () => {
    // State for update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateDept, setUpdateDept] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');

    // Open update modal
    const handleOpenUpdateModal = (dept) => {
        setUpdateDept(dept);
        setShowUpdateModal(true);
        setUpdateError('');
    };

    // Close update modal
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdateDept(null);
        setUpdateError('');
    };

    // Handle update form change
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateDept(prev => ({ ...prev, [name]: value }));
    };

    // Submit update
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setUpdateError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/departments/${updateDept._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: updateDept.name,
                    description: updateDept.description,
                    departmentId: updateDept.departmentId,
                }),
            });
            const data = await response.json();
            if (data.success) {
                setDepartments(prev => prev.map(dept => dept._id === updateDept._id ? { ...dept, ...data.data } : dept));
                handleCloseUpdateModal();
            } else {
                setUpdateError(data.message || 'Failed to update department');
            }
        } catch (err) {
            setUpdateError('Network error. Please try again.');
        } finally {
            setUpdateLoading(false);
        }
    };
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]); // For future use (optional display)
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    // Delete department handler
    const handleDeleteDepartment = async (id) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;
        setDeletingId(id);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/departments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setDepartments(prev => prev.filter(dept => dept._id !== id));
            } else {
                setError(data.message || 'Failed to delete department');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/departments`);
            const data = await response.json();

            if (data.success) {
                setDepartments(data.data);
            } else {
                setError('Failed to fetch departments');
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
    };

    const filteredDepartments = departments.filter(dept => {
        const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dept.departmentId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === '' ||
            (statusFilter === 'active' && dept.isActive) ||
            (statusFilter === 'inactive' && !dept.isActive);

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Departments</h4>
                            <h6>Manage your departments and designations</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#add-department"
                        >
                            <i className="ti ti-circle-plus me-1"></i>Add Department
                        </button>
                    </div>
                    <div className="page-btn me-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#add-designation"
                        >
                            <i className="ti ti-circle-plus me-1"></i>Add Designation
                        </button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                            <div className="search-set mb-0">
                                <div className="search-input">
                                    <span className="btn-searchset">
                                        <i className="ti ti-search fs-14 feather-search"></i>
                                    </span>
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search departments..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="dropdown me-2">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        {statusFilter === '' ? 'Select Status' : statusFilter === 'active' ? 'Active' : 'Inactive'}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1" onClick={() => handleStatusFilter('')}>All</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1" onClick={() => handleStatusFilter('active')}>Active</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1" onClick={() => handleStatusFilter('inactive')}>Inactive</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="employee-grid-widget">
                        <div className="row">
                            {filteredDepartments.length > 0 ? (
                                filteredDepartments.map(department => (
                                        <div key={department._id} className="col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                                            <div className="employee-grid-profile" style={{ position: 'relative' }}>
                                                <div className="profile-head">
                                                    <div className="dep-name d-flex align-items-center">
                                                        <h5 className={department.isActive ? 'active' : 'text-muted'}>
                                                            {department.name}
                                                        </h5>
                                                        <span className="ms-2" style={{ color: 'black', background: 'none', fontWeight: 'bold' }}>-{department.departmentId}</span>
                                                    </div>
                                                    {/* <button
                                                        className="btn btn-danger btn-xs del-dep"
                                                        onClick={() => handleDeleteDepartment(department._id)}
                                                        disabled={deletingId === department._id}
                                                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}
                                                    >
                                                        {deletingId === department._id ? (
                                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                        ) : (
                                                            <i className="bi bi-trash me-1"></i>
                                                        )}
                                                        Delete
                                                    </button> */}
                                                    <button
                                                        className="btn btn-warning del-dep btn-xs ms-2"
                                                        // style={{ position: 'absolute', top: '10px', right: '90px', zIndex: 2 }}
                                                        onClick={() => handleOpenUpdateModal(department)}
                                                    >
                                                        <i className="bi bi-pencil me-1"></i> Update
                                                    </button>
                                                </div>
                                            <div className="profile-info department-profile-info">
                                                <div className="profile-pic">
                                                    <img src="assets/img/profiles/avatar-02.jpg" alt="img" />
                                                </div>
                                                <h4>{department.name}</h4>
                                                <h5>Department</h5>
                                            </div>
                                            <div className="grid-set-blk">
                                                <p>{department.description || 'No description available'}</p>
                                            </div>
                                            <div className="profile-bottom">
                                                <div className="profile-state d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mb-0">Employees:</h6>
                                                        <span className="ms-2 fw-bold">{department.employeeCount !== undefined ? department.employeeCount : 0}</span>
                                                    </div>
                                                    <span className={`badge ${department.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                                        {department.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="text-center py-5">
                                        <h5>No departments found</h5>
                                        <p className="text-muted">Try adjusting your search or filters</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {/* Update Department Modal */}
            {showUpdateModal && updateDept && (
                <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Department</h5>
                                <button type="button" className="btn-close" onClick={handleCloseUpdateModal}></button>
                            </div>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="modal-body">
                                    {updateError && <div className="alert alert-danger">{updateError}</div>}
                                    <div className="mb-3">
                                        <label className="form-label">Department ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="departmentId"
                                            value={updateDept.departmentId}
                                            onChange={handleUpdateChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={updateDept.name}
                                            onChange={handleUpdateChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={updateDept.description || ''}
                                            onChange={handleUpdateChange}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseUpdateModal} style={{ minWidth: '100px' }}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteDepartment(updateDept._id)} style={{ minWidth: '100px' }} disabled={deletingId === updateDept._id}>
                                        {deletingId === updateDept._id ? (
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <i className="bi bi-trash me-1"></i>
                                        )}
                                        Delete
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={updateLoading} style={{ minWidth: '100px' }}>
                                        {updateLoading ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <AddDepartment />
            <AddDesignation />
        </div>
    );
};

export default Department;
