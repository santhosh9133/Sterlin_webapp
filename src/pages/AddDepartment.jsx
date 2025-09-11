import React, { useState } from 'react';

const AddDepartment = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/departments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Department created successfully!');
                setFormData({
                    name: '',
                    description: '',
                    isActive: true
                });
                // Close modal after success
                setTimeout(() => {
                    const modal = document.getElementById('add-department');
                    const modalInstance = window.bootstrap?.Modal?.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                    window.location.reload(); // Refresh to show new department
                }, 1500);
            } else {
                setError(data.message || 'Failed to create department');
            }
        } catch (error) {
            console.error('Error creating department:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
     <>
<div className="modal fade" id="add-department">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="page-wrapper-new p-0">
						<div className="content">
							<div className="modal-header">
								<div className="page-title">
									<h4>Add Department</h4>
								</div>
								<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form onSubmit={handleSubmit}>
								<div className="modal-body">
									{error && (
										<div className="alert alert-danger" role="alert">
											{error}
										</div>
									)}
									{success && (
										<div className="alert alert-success" role="alert">
											{success}
										</div>
									)}
									<div className="row">
										<div className="col-lg-12">
											<div className="mb-3">
												<label className="form-label">Department <span className="text-danger"> *</span></label>
												<input 
													type="text" 
													name="name"
													value={formData.name}
													onChange={handleInputChange}
													className="form-control" 
													placeholder="Enter department name"
													required
												/>
											</div>
										</div>

										<div className="col-lg-12">
											<div className="mb-3">
												<label className="form-label">Description</label>
												<textarea 
													name="description"
													value={formData.description}
													onChange={handleInputChange}
													className="form-control"
													rows="3"
													placeholder="Enter department description"
												></textarea>
											</div>
										</div>			
										<div className="input-blocks m-0">
											<div className="status-toggle modal-status d-flex justify-content-between align-items-center">
												<span className="status-label">Status</span>
												<input 
													type="checkbox" 
													id="departmentStatus" 
													name="isActive"
													checked={formData.isActive}
													onChange={handleInputChange}
													className="check" 
												/>
												<label htmlFor="departmentStatus" className="checktoggle"></label>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
									<button type="submit" className="btn btn-primary" disabled={loading}>
										{loading ? 'Creating...' : 'Save Changes'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
     </>
    )
}

export default AddDepartment;