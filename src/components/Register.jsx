import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../custom-auth.css'

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const divStyle1 = {
        display: "inline-block",
        width: "48%",
        padding: "10px",
        marginRight: "2%",
        verticalAlign: "top",
    };

    const divStyle2 = {
        display: "inline-block",
        width: "48%",
        // backgroundColor: "lightgreen",
        padding: "10px",
        marginTop: "5%",
        verticalAlign: "top",
    };
    return (
        <div className="main-wrapper">
            <div className="account-content">
                <div className="login-wrapper login-new">
                    <div className="row w-100">
                        <div className="col-lg-11 mx-auto">
                            <div className="login-content user-login" style={divStyle1}>
                                <form onSubmit={handleSubmit}>
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <div className="login-userheading">
                                                <h3>Register</h3>
                                                <h4>Create New Account</h4>
                                            </div>
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">First Name <span className="text-danger"> *</span></label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="firstName"
                                                                value={formData.firstName}
                                                                onChange={handleChange}
                                                                className="form-control border-end-0"
                                                                required
                                                            />
                                                            <span className="input-group-text border-start-0">
                                                                <i className="ti ti-user"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Last Name <span className="text-danger"> *</span></label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                value={formData.lastName}
                                                                onChange={handleChange}
                                                                className="form-control border-end-0"
                                                                required
                                                            />
                                                            <span className="input-group-text border-start-0">
                                                                <i className="ti ti-user"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Username <span className="text-danger"> *</span></label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                value={formData.username}
                                                                onChange={handleChange}
                                                                className="form-control border-end-0"
                                                                required
                                                            />
                                                            <span className="input-group-text border-start-0">
                                                                <i className="ti ti-user"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Email <span className="text-danger"> *</span></label>
                                                        <div className="input-group">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                className="form-control border-end-0"
                                                                required
                                                            />
                                                            <span className="input-group-text border-start-0">
                                                                <i className="ti ti-mail"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Password <span className="text-danger"> *</span></label>
                                                        <div className="input-group">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                name="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                className="form-control border-end-0"
                                                                required
                                                            />
                                                            <span className="input-group-text border-start-0" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                                                <i className={`ti ${showPassword ? 'ti-eye' : 'ti-eye-off'}`}></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Confirm Password <span className="text-danger"> *</span></label>
                                                        <div className="input-group">
                                                            <input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleChange}
                                                                className="form-control border-end-0"
                                                                required
                                                            />
                                                            <span className="input-group-text border-start-0" style={{ cursor: 'pointer' }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                                <i className={`ti ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-login authentication-check">
                                                <div className="row">
                                                    <div className="col-sm-8">
                                                        <div className="custom-control custom-checkbox justify-content-start">
                                                            <div className="custom-control custom-checkbox">
                                                                <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                                                    <input type="checkbox" required />
                                                                    <span className="checkmarks"></span>I agree to the <Link to="#" className="text-primary">Terms & Privacy</Link>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-login">
                                                <button
                                                    type="submit"
                                                    className="btn btn-login"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                                </button>
                                            </div>
                                            <div className="signinform">
                                                <h4>Already have an account ? <Link to="/login" className="hover-a">Sign In Instead</Link></h4>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='card-body p-5' style={divStyle2}>
                                <div className="login-logo">
                                    <img src="assets/img/image.png" alt="img" />
                                    <a href="index-2.html" className="login-logo logo-white">
                                        <img src="assets/img/logo-white.svg" alt="Img" />
                                    </a>
                                </div>
                                <div className="div_cuntent" style={{padding: '20px', lineHeight: '1.6'}}>
                                </div>
                                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                                    <p>Copyright &copy; 2025 Richhmindx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;