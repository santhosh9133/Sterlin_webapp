import React, { useEffect, useState } from "react";
import AddDesignation from "./AddDesignation";

const Designation = () => {
    const [designations, setDesignations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editDesignation, setEditDesignation] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [actionError, setActionError] = useState("");
        const [editLoading, setEditLoading] = useState(false);

    // Edit handler
    const handleEdit = (designation) => {
        setEditDesignation(designation);
        setShowEditModal(true);
        setActionError("");
    };

    // Close edit modal
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditDesignation(null);
        setActionError("");
    };

        // Edit modal change handler
        const handleEditChange = (e) => {
            const { name, value } = e.target;
            setEditDesignation((prev) => ({ ...prev, [name]: value }));
        };

        // Edit modal submit handler
        const handleEditSubmit = async (e) => {
            e.preventDefault();
            if (!editDesignation || !editDesignation._id) return;
            setEditLoading(true);
            setActionError("");
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/designations/${editDesignation._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: editDesignation.name,
                        department: editDesignation.department,
                        description: editDesignation.description,
                    }),
                });
                const data = await response.json();
                if (data.success) {
                    setDesignations((prev) => prev.map((d) => d._id === editDesignation._id ? { ...d, ...data.data } : d));
                    setShowEditModal(false);
                    setEditDesignation(null);
                } else {
                    setActionError(data.message || "Failed to update designation");
                }
            } catch (err) {
                setActionError("Network error. Please try again.");
            } finally {
                setEditLoading(false);
            }
        };
    // Delete handler
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this designation?")) return;
        setDeletingId(id);
        setActionError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/designations/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (data.success) {
                setDesignations(prev => prev.filter(d => d._id !== id));
            } else {
                setActionError(data.message || "Failed to delete designation");
            }
        } catch (err) {
            setActionError("Network error. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        const fetchDesignations = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/designations`);
                const data = await response.json();
                if (data.success) {
                    setDesignations(data.data);
                } else {
                    setError("Failed to fetch designations");
                }
            } catch (err) {
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchDesignations();
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Designation</h4>


                                <h6>Manage your designation</h6>
                            </div>
                        </div>
                        <ul className="table-top-head">
                            <li className="me-2">
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
                            </li>
                            <li className="me-2">
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
                            </li>
                            <li className="me-2">
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i className="ti ti-refresh"></i></a>
                            </li>
                            <li className="me-2">
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i className="ti ti-chevron-up"></i></a>
                            </li>
                        </ul>
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
                    {/* <!-- /product list --> */}
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                            <div className="search-set">
                                <div className="search-input">
                                    <span className="btn-searchset"><i className="ti ti-search fs-14 feather-search"></i></span>
                                </div>
                            </div>
                            <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="dropdown me-2">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        Department
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Sales</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Inventory</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Finance</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="dropdown me-2">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        Select Status
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Active</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Inactive</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        Sort By : Last 7 Days
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table datatable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="no-sort">
                                                <label className="checkboxs">
                                                    <input type="checkbox" id="select-all" />
                                                    <span className="checkmarks"></span>
                                                </label>
                                            </th>
                                            <th>Designation</th>
                                            <th>Department</th>
                                            <th>Members</th>
                                            <th>Total Members</th>
                                            <th>Created On</th>
                                            <th>Status</th>
                                            <th className="no-sort"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="8" className="text-center py-5">Loading...</td></tr>
                                        ) : error ? (
                                            <tr><td colSpan="8" className="text-danger text-center py-5">{error}</td></tr>
                                        ) : designations.length === 0 ? (
                                            <tr><td colSpan="8" className="text-center py-5">No designations found</td></tr>
                                        ) : (
                                            designations.map((designation) => (
                                                <tr key={designation._id}>
                                                    <td>
                                                        <label className="checkboxs">
                                                            <input type="checkbox" />
                                                            <span className="checkmarks"></span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900">{designation.name}</span>
                                                    </td>
                                                    <td>{designation.department || '-'}</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>{designation.createdAt ? new Date(designation.createdAt).toLocaleDateString() : '-'}</td>
                                                    <td>
                                                        <span className={`badge ${designation.isActive ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
                                                            <i className="ti ti-point-filled me-1"></i>{designation.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                        <td className="action-table-data">
                                                            <div className="edit-delete-action">
                                                                <button className="btn btn-sm btn-light me-2" title="Edit" onClick={() => handleEdit(designation)}>
                                                                    <i className="ti ti-edit"></i>
                                                                </button>
                                                                <button className="btn btn-sm btn-light" title="Delete" onClick={() => handleDelete(designation._id)} disabled={deletingId === designation._id}>
                                                                    {deletingId === designation._id ? (
                                                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                                    ) : (
                                                                        <i className="ti ti-trash"></i>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            {/* <!-- /product list -->  */ }
					
				</div >
                <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
                    <p className="mb-0">2025 &copy; Richhmindx. All Right Reserved</p>
                    <p>Designed &amp; Developed by <a href="#" className="text-primary">Richhmindx</a></p>
                </div>
                {/* Edit Designation Modal */}
                {showEditModal && editDesignation && (
                    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Designation</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
                                </div>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="modal-body">
                                        {actionError && <div className="alert alert-danger">{actionError}</div>}
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={editDesignation.name}
                                                onChange={handleEditChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Department</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="department"
                                                value={editDesignation.department || ''}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={editDesignation.description || ''}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Cancel</button>
                                        <button type="submit" className="btn btn-primary" disabled={editLoading}>
                                            {editLoading ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <AddDesignation />
            </div>
    </>
  );
};

export default Designation;
