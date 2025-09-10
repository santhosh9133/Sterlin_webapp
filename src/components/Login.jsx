import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../custom-auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage or context
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
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
    marginTop: "20%",
    verticalAlign: "top",
  };
  
    return (
         <div className="main-wrapper">
			<div className="account-content">
				<div className="login-wrapper login-new">
                    <div className="row w-100">
                        <div className="col-lg-11 mx-auto">
                            <div className="login-content user-login" style={divStyle1}>
                                <form onSubmit={handleSubmit} >
                                    <div className="card">
                                        <div className="card-body p-5">
                                            <div className="login-userheading">
                                                <h3>Sign In</h3>
                                                <h4>Access the Dashboard using your email and passcode.</h4>
                                            </div>
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
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
                                            <div className="form-login authentication-check">
                                                <div className="row">
                                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                                        <div className="custom-control custom-checkbox">
                                                            <label className="checkboxs ps-4 mb-0 pb-0 line-height-1 fs-16 text-gray-6">
                                                                <input type="checkbox" className="form-control" />
                                                                <span className="checkmarks"></span>Remember me
                                                            </label>
                                                        </div>
                                                        <div className="text-end">
                                                            <a className="text-orange fs-16 fw-medium" href="forgot-password.html">Forgot Password?</a>
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
                                                    {loading ? 'Signing In...' : 'Sign In'}
                                                </button>
                                            </div>
                                            <div className="signinform">
                                                <h4>New on our platform?<Link to="/register" className="hover-a"> Create an account</Link></h4>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='card-body p-5' style={divStyle2}>
                                 <div className="login-logo">
                                    <img src="assets/img/image.png" alt="img" />
                                    <a href="index-2.html" className="login-logo logo-white">
                                        <img src="assets/img/logo-white.svg"  alt="Img" />
                                    </a>
                                </div>
                            <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                                <p>Copyright &copy; 2025 DreamsPOS</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
        </div>
    )
}
export default Login