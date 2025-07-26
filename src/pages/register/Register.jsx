import Swal from 'sweetalert2';
import register from '../../assets/register.json';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoFile = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must have at least 1 uppercase, 1 lowercase, and 6 characters.',
      });
      return;
    }

    try {
      const result = await createUser(email, password);
      console.log('Registered User:', result.user);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
      navigate('/login');
    } catch (error) {
      console.error(error);
      const errorCode = error.code;

      let message = 'Something went wrong. Please try again.';

      if (errorCode === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      } else if (errorCode === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (errorCode === 'auth/weak-password') {
        message = 'Password is too weak.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google User:', user);

      Swal.fire({
        icon: 'success',
        title: 'Google Login Successful',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: error.message || 'Something went wrong. Try again.',
      });
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log('GitHub User:', user);

      Swal.fire({
        icon: 'success',
        title: 'GitHub Login Successful',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      console.error('GitHub login error:', error);
      let message = 'Something went wrong. Try again later.';
      if (error.code === 'auth/account-exists-with-different-credential') {
        message =
          'An account already exists with the same email but using a different sign-in method.';
      }
      Swal.fire({
        icon: 'error',
        title: 'GitHub Login Failed',
        text: message,
      });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '400px' }} loop animationData={register} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <h1 className="text-4xl font-bold text-center mb-4">Register</h1>

              <label className="label">Name</label>
              <input type="text" name="name" className="input" placeholder="Name" required />

              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" required />

              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" required />

              <label className="label">Upload Photo</label>
              <input type="file" name="photo" accept="image/*" className="file-input file-input-bordered" required />

              <label className="label">Select Role</label>
              <select name="role" className="select select-bordered" required>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>

              <button type="submit" className="btn btn-primary mt-4 w-full">
                Register
              </button>

              <p className="text-center pt-3">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
              </p>
            </form>

            <div className="divider">OR</div>

            <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-2">
              Continue with Google
            </button>

            <button onClick={handleGitHubLogin} className="btn btn-outline w-full">
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
