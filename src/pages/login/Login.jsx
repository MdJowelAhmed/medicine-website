import Lottie from 'lottie-react';
import login from '../../assets/login.json';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Default route

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);

      if (result?.user) {
        // Optional: get JWT token from your server
        const res = await axios.post('http://localhost:5000/login', { email });
        localStorage.setItem('accessToken', res.data.data.accessToken);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from);
      }
    } catch (error) {
      console.error(error);
      const errorCode = error.code;

      switch (errorCode) {
        case 'auth/user-not-found':
          Swal.fire({
            icon: 'error',
            title: 'User Not Found',
            text: 'No account found with this email.',
          });
          break;

        case 'auth/wrong-password':
          Swal.fire({
            icon: 'error',
            title: 'Wrong Password',
            text: 'Please enter the correct password.',
          });
          break;

        case 'auth/invalid-email':
          Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
          });
          break;

        case 'auth/network-request-failed':
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Check your internet connection and try again.',
          });
          break;

        default:
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.message || 'Something went wrong. Please try again.',
          });
      }
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

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />

                <label className="label">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" required />

                <button className="btn btn-neutral mt-4 bg-primary border-0">Login</button>

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
