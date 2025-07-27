import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase.config';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../components/hook/useAxiosSecure';
import Lottie from 'lottie-react';
import register from '../../assets/register.json';

// ImgBB API configuration
const IMGBB_API_KEY = 'ea59a5c9204f19d69a83ea436c243017';
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const validateFile = (file) => {
    // Check if file exists
    if (!file) {
      return { valid: false, message: 'Please select a photo.' };
    }

    // Check file size (max 32MB for ImgBB)
    const maxSize = 32 * 1024 * 1024; // 32MB
    if (file.size > maxSize) {
      return { valid: false, message: 'Image size must be less than 32MB.' };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Please select a valid image file (JPG, PNG, GIF, WebP).' };
    }

    return { valid: true };
  };

  const uploadToImgBB = async (file) => {
    try {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      const formData = new FormData();
      formData.append('image', file);
      
      // Add additional parameters for better reliability
      formData.append('key', IMGBB_API_KEY);

      const response = await axios.post(IMGBB_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      if (response.data.success) {
        return response.data.data.url;
      } else {
        throw new Error(response.data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('ImgBB upload error:', error);
      
      if (error.response) {
        // Server responded with error
        const errorMsg = error.response.data?.error?.message || 'Upload failed';
        throw new Error(`Image upload failed: ${errorMsg}`);
      } else if (error.request) {
        // Network error
        throw new Error('Network error during image upload. Please check your connection.');
      } else {
        // Other error
        throw new Error(error.message || 'Image upload failed');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;
    const photoFile = form.photo.files[0];

    // Validate password
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Must include uppercase, lowercase, and be at least 6 characters.',
      });
      setLoading(false);
      return;
    }

    // Validate required fields
    if (!name || !email || !role) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
      });
      setLoading(false);
      return;
    }

    try {
      let imageURL = 'https://i.ibb.co/4Z1Y9Yy/default.jpg'; // Default image

      // Upload image if provided
      if (photoFile) {
        try {
          imageURL = await uploadToImgBB(photoFile);
        } catch (uploadError) {
          Swal.fire({
            icon: 'warning',
            title: 'Image Upload Failed',
            text: `${uploadError.message} Proceeding with default image.`,
            timer: 3000,
          });
          // Continue with default image instead of failing completely
        }
      }

      // Create user with Firebase
      const res = await createUser(email, password);

      // Save user info to DB
      const userData = { 
        name, 
        email, 
        photo: imageURL, 
        role,
        createdAt: new Date().toISOString()
      };
      
      await axiosSecure.post('/register', userData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Email/password registration is not enabled.';
            break;
          default:
            errorMessage = err.message || errorMessage;
        }
      } else {
        errorMessage = err.message || errorMessage;
      }

      Swal.fire({ 
        icon: 'error', 
        title: 'Registration Failed', 
        text: errorMessage 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Optional: Save social user to your database
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL || 'https://i.ibb.co/4Z1Y9Yy/default.jpg',
        role: 'user', // Default role for social login
        createdAt: new Date().toISOString()
      };

      try {
        await axiosSecure.post('/register', userData);
      } catch (dbError) {
        // User might already exist in DB, which is fine
        console.log('User may already exist in database');
      }

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        timer: 1000,
        showConfirmButton: false,
      });
      
      navigate('/');
    } catch (err) {
      console.error('Social login error:', err);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login was cancelled.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups and try again.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Lottie animationData={register} className="w-96" />
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <h2 className="text-2xl font-bold text-center">Register</h2>

            <label className="label">
              <span className="label-text">Name *</span>
            </label>
            <input 
              type="text" 
              name="name" 
              className="input input-bordered" 
              placeholder="Enter your full name"
              required 
            />

            <label className="label">
              <span className="label-text">Email *</span>
            </label>
            <input 
              type="email" 
              name="email" 
              className="input input-bordered" 
              placeholder="Enter your email"
              required 
            />

            <label className="label">
              <span className="label-text">Password *</span>
            </label>
            <input 
              type="password" 
              name="password" 
              className="input input-bordered" 
              placeholder="Enter your password"
              required 
            />

            <label className="label">
              <span className="label-text">Profile Photo (Optional)</span>
            </label>
            <input 
              type="file" 
              name="photo" 
              className="file-input file-input-bordered" 
              accept="image/*"
            />

            <label className="label">
              <span className="label-text">Role *</span>
            </label>
            <select name="role" className="select select-bordered" required>
              <option value="">Select your role</option>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>

            <button 
              type="submit" 
              className="btn btn-primary mt-4" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>

            <p className="text-center mt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Login
              </Link>
            </p>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={() => handleSocialLogin(new GoogleAuthProvider())}
              className="btn btn-outline w-full"
              disabled={loading}
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(new GithubAuthProvider())}
              className="btn btn-outline w-full mt-2"
              disabled={loading}
            >
              Continue with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;