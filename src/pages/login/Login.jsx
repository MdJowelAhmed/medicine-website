import Lottie from 'lottie-react';
import login from '../../assets/login.json';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';// Default role

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      if (result) {
        const res = await axios.post('http://localhost:5000/login', { email });
        console.log(res.data.data);
        localStorage.setItem('accessToken', res.data.data.accessToken);
        navigate(from);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '200px' }} loop={true} animationData={login} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <h1 className="text-5xl font-bold text-center">Login</h1>

                {/* Email */}
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />

                {/* Password */}
                <label className="label">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" required />

                {/* Role Select */}
                {/* <label className="label">Select Role</label>
                <select
                  name="role"
                  className="select select-bordered w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="seller">Seller</option>
                  <option value="user">User</option>
                </select> */}

                {/* Submit Button */}
                <button className="btn btn-neutral mt-4 bg-primary border-0">Login</button>

                {/* Redirect */}
                <p className="text-center mt-2">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary font-bold">
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
