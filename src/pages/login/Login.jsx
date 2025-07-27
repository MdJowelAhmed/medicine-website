import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import login from '../../assets/login.json';
import { AuthContext } from '../../context/AuthContext';
import SocialLogin from '../socialLogin/SocialLogin';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in both fields',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
      });
      setLoading(false);
      return;
    }

    try {
      const result = await signInUser(email, password);
      form.reset();

      const loginRes = await fetch('https://carzoneserver.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: result.user.email }),
      });

      const res = await loginRes.json();

      if (res?.success) {
        localStorage.setItem('accessToken', res.accessToken);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          window.location.href = from;
        }, 500);
      } else {
        throw new Error('Failed to retrieve access token');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message || 'Something went wrong.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: 200 }} loop animationData={login} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignIn}>
              <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                placeholder="Email"
                required
                disabled={loading}
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                placeholder="Password"
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-center mt-2">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary font-bold">
                Register
              </Link>
            </p>

            <div className="divider">OR</div>
            <SocialLogin from={from} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
