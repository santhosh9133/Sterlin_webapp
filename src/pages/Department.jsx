import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDepartment from "./AddDepartment";

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5001/api/departments?limit=50');
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
                            <h6>Manage your departments</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-department">
                            <i className="ti ti-circle-plus me-1"></i>Add Department
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
                                        <div className="employee-grid-profile">
                                            <div className="profile-head">
                                                <div className="dep-name d-flex justify-content-between align-items-center">
                                                    <h5 className={department.isActive ? 'active' : 'text-muted'}>
                                                        {department.name}
                                                    </h5>
                                                    <span className="badge bg-primary">{department.departmentId}</span>
                                                </div>
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
                                                        <h6>Employees</h6>
                                                        <span className="ms-2">{department.employeeCount || 0}</span>
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
            <AddDepartment />
        </div>
    );
};

export default Department;
