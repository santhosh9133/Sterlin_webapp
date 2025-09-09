import React, { useState } from "react";

const AddEmployee = () => {
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

      // Send data to backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData)
      });

      const result = await response.json();

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
        alert(`Error: ${result.message || 'Failed to add employee'}`);
        if (result.errors) {
          console.error('Validation errors:', result.errors);
        }
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
							<a href="/" className="btn btn-secondary"><i data-feather="arrow-left" className="me-2"></i>Back to List</a>
						</div>
					</div>
					{/* <!-- /product list --> */}
					<form onSubmit={handleSubmit}>
						<div className="accordions-items-seperate" id="accordionExample">
							<div className="accordion-item border mb-4">
								<h2 className="accordion-header" id="headingOne">
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseOne"  aria-controls="collapseOne">
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
														<label className="form-label">First Name<span className="text-danger ms-1">*</span></label>
														<input 
															type="text" 
															className="form-control" 
															name="firstName"
															value={formData.firstName}
															onChange={handleInputChange}
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Last Name<span className="text-danger ms-1">*</span></label>
														<input 
															type="text" 
															className="form-control" 
															name="lastName"
															value={formData.lastName}
															onChange={handleInputChange}
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Email<span className="text-danger ms-1">*</span></label>
														<input 
															type="email" 
															className="form-control" 
															name="email"
															value={formData.email}
															onChange={handleInputChange}
														/>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Contact Number<span className="text-danger ms-1">*</span></label>
														<input 
															type="text" 
															className="form-control" 
															name="contactNumber"
															value={formData.contactNumber}
															onChange={handleInputChange}
														/>
													</div>
												</div>
												<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Emp Code<span className="text-danger ms-1">*</span></label>
														<input 
															type="text" 
															className="form-control" 
															name="empCode"
															value={formData.empCode}
															onChange={handleInputChange}
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
																placeholder="Select Date" 
															/>
														</div>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Gender<span className="text-danger ms-1">*</span></label>
														<select 
															className="form-select" 
															name="gender"
															value={formData.gender}
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
															<option value="">Select</option>
															<option value="Male">Male</option>
															<option value="Female">Female</option>
														</select>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Nationality<span className="text-danger ms-1">*</span></label>
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
															<option value="">Select</option>
															<option value="United Kingdom">United Kingdom</option>
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
															/>
														</div>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<div className="add-newplus">
															<label className="form-label">Shift<span className="text-danger ms-1">*</span></label>
															<a href="#" data-bs-toggle="modal" data-bs-target="#add_customer"><span><i data-feather="plus-circle" className="plus-down-add"></i>Add new</span></a>
														</div>
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
															<option value="">Select</option>
															<option value="Regular">Regular</option>
															<option value="Mid Shift">Mid Shift</option>
															<option value="Night Shift">Night Shift</option>
														</select>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Department<span className="text-danger ms-1">*</span></label>
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
															<option value="">Select</option>
															<option value="UI/UX">UI/UX</option>
															<option value="Support">Support</option>
															<option value="HR">HR</option>
															<option value="Engineering">Engineering</option>
														</select>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Designation<span className="text-danger ms-1">*</span></label>
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
															<option value="">Select</option>
															<option value="Designer">Designer</option>
															<option value="Developer">Developer</option>
															<option value="Tester">Tester</option>
														</select>
													</div>
												</div>
											<div className="col-lg-11 col-md-6">
													<div className="mb-3">
														<label className="form-label">Blood Group<span className="text-danger ms-1">*</span></label>
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
															<option value="">Select</option>
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
									<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseThree"  aria-controls="collapseThree">
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
													<label className="form-label">Address</label>
													<input 
														type="text" 
														className="form-control" 
														name="address"
														value={formData.address}
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="col-lg-11 col-md-6">
												<div className="mb-3">
													<label className="form-label">Country</label>
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
														<option value="">Select</option>
														<option value="United Kingdom">United Kingdom</option>
														<option value="USA">USA</option>
													</select>
												</div>
											</div>
											<div className="col-lg-11 col-md-6">
												<div className="mb-3">
													<label className="form-label">State</label>
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
														<option value="">Select</option>
														<option value="California">California</option>
														<option value="Paris">Paris</option>
													</select>
												</div>
											</div>
											<div className="col-lg-11 col-md-6">
												<div className="mb-3">
													<label className="form-label">City</label>
													<select 
														className="form-select" 
														name="city"
														value={formData.city}
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
														<option value="">Select</option>
														<option value="Los Angeles">Los Angeles</option>
														<option value="New Jersey">New Jersey</option>
													</select>
												</div>
											</div>
											<div className="col-lg-11 col-md-6">
												<div className="mb-3">
													<label className="form-label">Zipcode</label>
													<input 
														type="text" 
														className="form-control" 
														name="zipcode"
														value={formData.zipcode}
														onChange={handleInputChange}
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
								<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseFour"  aria-controls="collapseFour">
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
												<label className="form-label">Emergency Contact Number 1</label>
												<input 
													type="text" 
													className="form-control" 
													name="emergencyContact1"
													value={formData.emergencyContact1}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Relation</label>
												<input 
													type="text" 
													className="form-control" 
													name="relation1"
													value={formData.relation1}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Name</label>
												<input 
													type="text" 
													className="form-control" 
													name="name1"
													value={formData.name1}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Emergency Contact Number 2</label>
												<input 
													type="text" 
													className="form-control" 
													name="emergencyContact2"
													value={formData.emergencyContact2}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Relation</label>
												<input 
													type="text" 
													className="form-control" 
													name="relation2"
													value={formData.relation2}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Name</label>
												<input 
													type="text" 
													className="form-control" 
													name="name2"
													value={formData.name2}
													onChange={handleInputChange}
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
								<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseFive"  aria-controls="collapseFive">
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
												<label className="form-label">Bank Name</label>
												<input 
													type="text" 
													className="form-control" 
													name="bankName"
													value={formData.bankName}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Account Number</label>
												<input 
													type="text" 
													className="form-control" 
													name="accountNumber"
													value={formData.accountNumber}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">IFSC</label>
												<input 
													type="text" 
													className="form-control" 
													name="ifsc"
													value={formData.ifsc}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="mb-3">
												<label className="form-label">Branch</label>
												<input 
													type="text" 
													className="form-control" 
													name="branch"
													value={formData.branch}
													onChange={handleInputChange}
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
								<div className="accordion-button bg-white" data-bs-toggle="collapse" data-bs-target="#collapseTwo"  aria-controls="collapseTwo">
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
												<label>Password</label>
												<input 
													type="password" 
													className="form-control" 
													name="password"
													value={formData.password}
													onChange={handleInputChange}
												/>
											</div>
										</div>
										<div className="col-lg-11 col-md-6">
											<div className="input-blocks mb-0">
												<label>Confirm Password</label>
												<input 
													type="password" 
													className="form-control" 
													name="confirmPassword"
													value={formData.confirmPassword}
													onChange={handleInputChange}
												/>
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
				<p className="mb-0">2014 - 2025 &copy; DreamsPOS. All Right Reserved</p>
				<p>Designed &amp; Developed by <a href="javascript:void(0);" className="text-primary">Dreams</a></p>
			</div>
			</div>
    </>
  )
};

export default AddEmployee;

