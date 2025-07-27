import React, { useContext } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGitHub } = useContext(AuthContext);
  const axiosSecure=useAxiosSecure()
  const navigate = useNavigate();

 const handleGoogleLogin = async () => {
  try {
    const result = await signInWithGoogle();
    const user = result.user;

    // ✅ Send user data to backend - it will save if not exists
    const res = await axiosSecure.post('/social-login', { 
      email: user.email,
      name: user.displayName || 'Unknown',
      photo: user.photoURL || 'https://i.ibb.co/4Z1Y9Yy/default.jpg'
    });
    
    console.log(res);
    const token = res.data.data.accessToken;
          
    // ✅ Save token to localStorage
    localStorage.setItem('accessToken', token);

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      timer: 1000,
      showConfirmButton: false,
    });

    navigate('/');
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: err.message || 'Try again later.',
    });
  }
};


  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithGitHub();
      const user = result.user;

      const userData = {
        name: user.displayName || 'Unknown',
        email: user.email,
        photo: user.photoURL || 'https://i.ibb.co/4Z1Y9Yy/default.jpg',
        role: 'user',
      };

      // Save user to database
      await axiosSecure.post('/register', userData);

      Swal.fire({
        icon: 'success',
        title: 'GitHub Login Successful',
        timer: 1000,
        showConfirmButton: false,
      });

      navigate('/');
    } catch (err) {
      Swal.fire('GitHub Login Failed', err.message, 'error');
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary w-full flex items-center gap-2"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <button
        onClick={handleGitHubLogin}
        className="btn btn-outline w-full flex items-center gap-2"
      >
        <FaGithub />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
