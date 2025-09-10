import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddEmployee = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		contactNumber: '',
		empCode: '',
		dateOfBirth: '',
		gender: '',
		nationality: '',
		joiningDate: '',
		shift: '',
		department: '',
		designation: '',
		bloodGroup: '',
		about: '',
		address: '',
		country: '',
		state: '',
		city: '',
		zipcode: '',
		emergencyContact1: '',
		relation1: '',
		name1: '',
		emergencyContact2: '',
		relation2: '',
		name2: '',
		bankName: '',
		accountNumber: '',
		ifsc: '',
		branch: '',
		password: '',
		confirmPassword: ''
	});

	const [selectedImage, setSelectedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const [imageUploading, setImageUploading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		console.log('Image selected:', file);
		console.log('File details:', {
			name: file?.name,
			size: file?.size,
			type: file?.type,
			lastModified: file?.lastModified
		});
		if (file) {
			setSelectedImage(file);

			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				console.log('Image preview created successfully');
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadImage = async () => {
		if (!selectedImage) {
			console.log('No image selected for upload');
			return null;
		}

		console.log('Starting image upload...', selectedImage);
		setImageUploading(true);
		try {
			const formData = new FormData();
			formData.append('profileImage', selectedImage);

			console.log('Uploading to:', 'http://localhost:5001/api/employees/upload-profile-image');
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/employees/upload-profile-image`, {
				method: 'POST',
				body: formData
			});

			console.log('Upload response status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Upload failed with response:', errorText);
				throw new Error('Failed to upload image');
			}

			const result = await response.json();
			console.log('Upload successful:', result);
			setUploadedImageUrl(result.data.imageUrl);
			return result.data.imageUrl;
		} catch (error) {
			console.error('Error uploading image:', error);
			alert('Failed to upload image: ' + error.message);
			return null;
		} finally {
			setImageUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('Form submitted. Selected image:', selectedImage);

		// Validate required fields
		const requiredFields = {
			firstName: 'First Name',
			lastName: 'Last Name',
			email: 'Email',
			contactNumber: 'Contact Number',
			empCode: 'Employee Code',
			dateOfBirth: 'Date of Birth',
			joiningDate: 'Joining Date',
			password: 'Password'
		};

		const missingFields = [];
		for (const [field, label] of Object.entries(requiredFields)) {
			if (!formData[field] || formData[field].trim() === '') {
				missingFields.push(label);
			}
		}

		if (missingFields.length > 0) {
			alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
			return;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			alert('Please enter a valid email address');
			return;
		}

		// Validate password strength
		if (formData.password.length < 6) {
			alert('Password must be at least 6 characters long');
			return;
		}

		try {
			// Upload image first if selected
			let profilePhotoUrl = null;
			if (selectedImage) {
				console.log('Image found, starting upload...');
				profilePhotoUrl = await uploadImage();
				if (!profilePhotoUrl) {
					alert('Failed to upload image. Please try again.');
					return;
				}
				console.log('Image uploaded successfully, URL:', profilePhotoUrl);
			} else {
				console.log('No image selected, proceeding without image');
			}

			// Format data to match backend Employee model
			const employeeData = {
				profilePhoto: profilePhotoUrl,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				contactNumber: formData.contactNumber,
				empCode: formData.empCode,
				dateOfBirth: formData.dateOfBirth,
				joiningDate: formData.joiningDate,
				gender: formData.gender,
				nationality: formData.nationality,
				shift: formData.shift,
				department: formData.department,
				designation: formData.designation,
				bloodGroup: formData.bloodGroup,
				about: formData.about,
				address: formData.address,
				country: formData.country,
				state: formData.state,
				city: formData.city,
				zipcode: formData.zipcode,
				emergencyContacts: [
					{
						contactNumber: formData.emergencyContact1,
						relation: formData.relation1,
						name: formData.name1
					},
					{
						contactNumber: formData.emergencyContact2,
						relation: formData.relation2,
						name: formData.name2
					}
				].filter(contact => contact.contactNumber && contact.relation && contact.name),
				bank: {
					bankName: formData.bankName,
					accountNumber: formData.accountNumber,
					ifsc: formData.ifsc,
					branch: formData.branch
				},
				password: formData.password
			};

			// Validate password confirmation
			if (formData.password !== formData.confirmPassword) {
				alert('Passwords do not match!');
				return;
			}

			// Log the data being sent
			console.log('Employee data being sent:', employeeData);
			console.log('API URL:', `${import.meta.env.VITE_API_BASE_URL}/api/employees`);

			// Send data to backend
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/employees`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(employeeData)
			});

			console.log('Response status:', response.status);
			console.log('Response headers:', response.headers);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('HTTP Error Response:', errorText);
				alert(`Server Error (${response.status}): ${errorText || 'Failed to add employee'}`);
				return;
			}

			const result = await response.json();
			console.log('Server response:', result);

			if (result.success) {
				alert('Employee added successfully!');
				// Reset form
				setFormData({
					profilePhoto: '',
					firstName: '',
					lastName: '',
					email: '',
					contactNumber: '',
					empCode: '',
					dateOfBirth: '',
					joiningDate: '',
					gender: '',
					nationality: '',
					shift: '',
					department: '',
					designation: '',
					bloodGroup: '',
					about: '',
					address: '',
					country: '',
					state: '',
					city: '',
					zipcode: '',
					emergencyContact1: '',
					relation1: '',
					name1: '',
					emergencyContact2: '',
					relation2: '',
					name2: '',
					bankName: '',
					accountNumber: '',
					ifsc: '',
					branch: '',
					password: '',
					confirmPassword: ''
				});
			} else {
				console.error('Server returned error:', result);
				let errorMessage = `Error: ${result.message || 'Failed to add employee'}`;
				
				if (result.errors) {
					console.error('Validation errors:', result.errors);
					if (Array.isArray(result.errors)) {
						errorMessage += '\n\nValidation Errors:\n' + result.errors.join('\n');
					} else if (typeof result.errors === 'object') {
						errorMessage += '\n\nValidation Errors:\n' + Object.entries(result.errors).map(([field, error]) => `${field}: ${error}`).join('\n');
					}
				}
				
				alert(errorMessage);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('Network error. Please try again.');
		}
	};

	return (
		<>
			<div className="page-wrapper">
				<div className="content">
					<div className="page-header">
						<div className="add-item d-flex">
							<div className="page-title">
								<h4>Add Employee</h4>
								<h6>Create new Employee</h6>
							</div>
						</div>
						<ul className="table-top-head">
							<li className="me-2">
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i className="ti ti-refresh"></i></a>
							</li>
							<li className="me-2">
								<a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i className="ti ti-chevron-up"></i></a>
							</li>
						</ul>
						<div className="page-btn">
							<Link to={"/employee"} className="btn btn-secondary"><i data-feather="arrow-left" className="me-2"></i>Back to List</Link>
						</div>
					</div>
					{/* <!-- /product list --> */}
					<form onSubmit={handleSubmit}>
						<div className="accordions-items-seperate" id="accordionExample">
							<div className="accordion-item border mb-4">
								<h2 className="accordion-header" id="headingOne">
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
										<div className="d-flex align-items-center justify-content-between flex-fill">
											<h5 className="d-inline-flex align-items-center"><i className="ti ti-users text-primary me-2"></i><span>Employee Information</span></h5>
										</div>
									</div>
								</h2>
								<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
									<div className="accordion-body border-top">
										<div className="new-employee-field">
											<div className="profile-pic-upload">
												<div className="profile-pic">
													{imagePreview ? (
														<img
															src={imagePreview}
															alt="Profile Preview"
															style={{
																width: '100px',
																height: '100px',
																objectFit: 'cover',
																borderRadius: '50%',
																border: '2px solid #ddd'
															}}
														/>
													) : (
														<span><i data-feather="plus-circle" className="plus-down-add"></i> Profile Photo</span>
													)}
												</div>
												<div className="input-blocks mb-0">
													<div className="image-upload mb-0">
														<input
															type="file"
															name="profileImage"
															accept="image/*"
															onChange={handleImageChange}
															style={{ display: 'none' }}
															id="profileImageInput"
														/>
														<label htmlFor="profileImageInput" className="image-uploads" style={{ cursor: 'pointer' }}>
															<h4>{imageUploading ? 'Uploading...' : (imagePreview ? 'Change Image' : 'Upload Image')}</h4>
														</label>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="firstName"
															value={formData.firstName}
															onChange={handleInputChange}
															placeholder="First Name *"
															required
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="lastName"
															value={formData.lastName}
															onChange={handleInputChange}
															placeholder="Last Name *"
															required
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="email"
															className="form-control"
															name="email"
															value={formData.email}
															onChange={handleInputChange}
															placeholder="Email *"
															required
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="contactNumber"
															value={formData.contactNumber}
															onChange={handleInputChange}
															placeholder="Contact Number *"
															required
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="empCode"
															value={formData.empCode}
															onChange={handleInputChange}
															placeholder="Emp Code *"
															required
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="input-blocks">
														<label className="form-label">Date of Birth<span className="text-danger ms-1">*</span></label>
														<div className="input-groupicon calender-input">
															<i data-feather="calendar" className="info-img"></i>
															<input
																	type="date"
																	className="form-control"
																	name="dateOfBirth"
																	value={formData.dateOfBirth}
																	onChange={handleInputChange}
																	// placeholder="Select Date"
																	required
																/>
														</div>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														{/* <label className="form-label">Gender<span className="text-danger ms-1">*</span></label> */}
														<select
															className="form-select"
															name="gender"
															value={formData.gender}
															onChange={handleInputChange}
															placeholder="Gender"
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="">Gender</option>
															<option value="Male">Male</option>
															<option value="Female">Female</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														{/* <label className="form-label">Nationality<span className="text-danger ms-1">*</span></label> */}
														<select
															className="form-select"
															name="nationality"
															value={formData.nationality}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="">Nationality</option>
															<option value="United Kingdom">Others</option>
															<option value="India">India</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="input-blocks">
														<label>Joining Date<span className="text-danger ms-1">*</span></label>
														<div className="input-groupicon calender-input">
															<i data-feather="calendar" className="info-img"></i>
															<input
																	type="date"
																	className="form-control"
																	name="joiningDate"
																	value={formData.joiningDate}
																	onChange={handleInputChange}
																	placeholder="Select Date"
																	required
																/>
														</div>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<select
															className="form-select"
															name="shift"
															value={formData.shift}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="">Shift</option>
															<option value="Regular">Regular</option>
															<option value="Mid Shift">Mid Shift</option>
															<option value="Night Shift">Night Shift</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														{/* <label className="form-label">Department<span className="text-danger ms-1">*</span></label> */}
														<select
															className="form-select"
															name="department"
															value={formData.department}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="">Department</option>
															<option value="UI/UX">UI/UX</option>
															<option value="Support">Support</option>
															<option value="HR">HR</option>
															<option value="Engineering">Engineering</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														{/* <label className="form-label">Designation<span className="text-danger ms-1">*</span></label> */}
														<select
															className="form-select"
															name="designation"
															value={formData.designation}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="">Designation</option>
															<option value="Designer">Designer</option>
															<option value="Developer">Developer</option>
															<option value="Tester">Tester</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														{/* <label className="form-label">Blood Group<span className="text-danger ms-1">*</span></label> */}
														<select
															className="form-select"
															name="bloodGroup"
															value={formData.bloodGroup}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="">Blood Group</option>
															<option value="A+">A+</option>
															<option value="A-">A-</option>
															<option value="B+">B+</option>
															<option value="B-">B-</option>
															<option value="O+">O+</option>
															<option value="O-">O-</option>
															<option value="AB+">AB+</option>
															<option value="AB-">AB-</option>
														</select>
													</div>
												</div>
											</div>
											{/* <!-- Editor -->/ */}
											<div className="col-lg-12">
												<div className="input-blocks summer-description-box transfer mb-3">
													<label>About</label>
													<textarea
														className="form-control"
														name="about"
														value={formData.about}
														onChange={handleInputChange}
														rows="4"
														maxLength="60"
														placeholder="Enter employee description..."
													/>
													<p className="mt-1">Maximum 60 Characters</p>
												</div>
											</div>
											{/* <!-- /Editor --> */}
										</div>
									</div>
								</div>
							</div>

							<div className="accordion-item border mb-4">
								<div className="accordion-header" id="headingThree">
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-controls="collapseThree">
										<div className="d-flex align-items-center justify-content-between flex-fill">
											<h5 className="d-inline-flex align-items-center"><i data-feather="map-pin" className="feather-edit text-primary me-2"></i><span>Address Information</span></h5>
										</div>
									</div>
								</div>
								<div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
									<div className="accordion-body border-top">
										<div className="other-info">
											<div className="row">
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="address"
															value={formData.address}
															onChange={handleInputChange}
															placeholder="Address"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<select
															className="form-select"
															name="country"
															value={formData.country}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="" disabled hidden>Country</option>
															<option value="United Kingdom">Others</option>
															<option value="USA">India</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<select
															className="form-select"
															name="state"
															value={formData.state}
															onChange={handleInputChange}
															style={{
																padding: '0.75rem',
																border: '1px solid #ddd',
																borderRadius: '0.375rem',
																fontSize: '1rem',
																backgroundColor: '#fff',
																cursor: 'pointer'
															}}
														>
															<option value="" disabled selected hidden>State</option>
															<option value="Andhra Pradesh">Andhra Pradesh</option>
															<option value="Arunachal Pradesh">Arunachal Pradesh</option>
															<option value="Assam">Assam</option>
															<option value="Bihar">Bihar</option>
															<option value="Chhattisgarh">Chhattisgarh</option>
															<option value="Goa">Goa</option>
															<option value="Gujarat">Gujarat</option>
															<option value="Haryana">Haryana</option>
															<option value="Himachal Pradesh">Himachal Pradesh</option>
															<option value="Jharkhand">Jharkhand</option>
															<option value="Karnataka">Karnataka</option>
															<option value="Kerala">Kerala</option>
															<option value="Madhya Pradesh">Madhya Pradesh</option>
															<option value="Maharashtra">Maharashtra</option>
															<option value="Manipur">Manipur</option>
															<option value="Meghalaya">Meghalaya</option>
															<option value="Mizoram">Mizoram</option>
															<option value="Nagaland">Nagaland</option>
															<option value="Odisha">Odisha</option>
															<option value="Punjab">Punjab</option>
															<option value="Rajasthan">Rajasthan</option>
															<option value="Sikkim">Sikkim</option>
															<option value="Tamil Nadu">Tamil Nadu</option>
															<option value="Telangana">Telangana</option>
															<option value="Tripura">Tripura</option>
															<option value="Uttar Pradesh">Uttar Pradesh</option>
															<option value="Uttarakhand">Uttarakhand</option>
															<option value="West Bengal">West Bengal</option>
														</select>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="city"
															value={formData.city}
															onChange={handleInputChange}
															placeholder="City"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="zipcode"
															value={formData.zipcode}
															onChange={handleInputChange}
															placeholder="Zipcode"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="accordion-item border mb-4">
								<div className="accordion-header" id="heading4">
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-controls="collapseFour">
										<div className="d-flex align-items-center justify-content-between flex-fill">
											<h5 className="d-inline-flex align-items-center"><i data-feather="info" className="feather-edit text-primary me-2"></i><span>Emergency Information</span></h5>
										</div>
									</div>
								</div>
								<div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="heading4" data-bs-parent="#accordionExample">
									<div className="accordion-body border-top">
										<div className="other-info">
											<div className="row">
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="emergencyContact1"
															value={formData.emergencyContact1}
															onChange={handleInputChange}
															placeholder="Emergency Contact Number 1"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="relation1"
															value={formData.relation1}
															onChange={handleInputChange}
															placeholder="Relation 1"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="name1"
															value={formData.name1}
															onChange={handleInputChange}
															placeholder="Name 1"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="emergencyContact2"
															value={formData.emergencyContact2}
															onChange={handleInputChange}
															placeholder="Emergency Contact Number 2"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="relation2"
															value={formData.relation2}
															onChange={handleInputChange}
															placeholder="Relation 2"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="name2"
															value={formData.name2}
															onChange={handleInputChange}
															placeholder="Name 2"
														/>
													</div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="accordion-item border mb-4">
								<div className="accordion-header" id="heading5">
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-controls="collapseFive">
										<div className="d-flex align-items-center justify-content-between flex-fill">
											<h5 className="d-inline-flex align-items-center"><i className="ti ti-building-bank feather-edit text-primary me-2"></i><span>Bank Information</span></h5>
										</div>
									</div>
								</div>
								<div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="heading5" data-bs-parent="#accordionExample">
									<div className="accordion-body border-top">
										<div className="other-info">
											<div className="row">
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="bankName"
															value={formData.bankName}
															onChange={handleInputChange}
															placeholder="Bank Name"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="accountNumber"
															value={formData.accountNumber}
															onChange={handleInputChange}
															placeholder="Account Number"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="ifsc"
															value={formData.ifsc}
															onChange={handleInputChange}
															placeholder="IFSC"
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<input
															type="text"
															className="form-control"
															name="branch"
															value={formData.branch}
															onChange={handleInputChange}
															placeholder="Branch"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="accordion-item border mb-4">
								<div className="accordion-header" id="heading6">
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-controls="collapseTwo">
										<div className="d-flex align-items-center justify-content-between flex-fill">
											<h5 className="d-inline-flex align-items-center"><i data-feather="info" className="feather-edit text-primary me-2"></i><span>Password</span></h5>
										</div>
									</div>
								</div>
								<div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="heading6" data-bs-parent="#accordionExample">
									<div className="accordion-body border-top">
										<div className="pass-info">
											<div className="row">
												<div className="col-lg-11 col-md-6">
											<div className="input-blocks mb-md-0 mb-sm-3">
												<div className="input-group">
													<input
														type={showPassword ? "text" : "password"}
														className="form-control"
														name="password"
														value={formData.password}
														onChange={handleInputChange}
														placeholder="Password"
														required
													/>
													<span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
														<i className={`ti ${showPassword ? 'ti-eye' : 'ti-eye-off'}`}></i>
													</span>
												</div>
											</div>
										</div>
												<div className="col-lg-11 col-md-6">
											<div className="input-blocks mb-0">
												<div className="input-group">
													<input
														type={showConfirmPassword ? "text" : "password"}
														className="form-control"
														name="confirmPassword"
														value={formData.confirmPassword}
														onChange={handleInputChange}
														placeholder="Confirm Password"
														required
													/>
													<span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
														<i className={`ti ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}></i>
													</span>
												</div>
											</div>
										</div>
											</div>
										</div>
									</div>
								</div>
							</div>


						</div>
						{/* <!-- /product list --> */}

						<div className="text-end mb-3">
							<button type="button" className="btn btn-secondary me-2">Cancel</button>
							<button type="submit" className="btn btn-primary">Add Employee</button>
						</div>
					</form>
				</div>

				<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
					<p className="mb-0">2025 &copy; Richhmindx. All Right Reserved</p>
					<p>Designed &amp; Developed by <a href="#" className="text-primary">Richhmindx</a></p>
				</div>
			</div>
		</>
	)
};

export default AddEmployee;

