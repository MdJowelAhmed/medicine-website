import Swal from 'sweetalert2';
import register from '../../assets/register.json';
import { Link} from 'react-router';
import Lottie from 'lottie-react';
import SocialLogin from '../socialLogin/SocialLogin';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const {createUser} = useContext(AuthContext)

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoFile = form.photo.files[0]; // File upload
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    console.log(name, photoFile, email, password, role)

    // Validate password
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must have at least 1 uppercase, 1 lowercase, and 6 characters.',
      });
      return;
    }
       // set user
        createUser(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '400px' }} loop animationData={register} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
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

                <button className="btn btn-primary mt-4 w-full">Register</button>

                <p className="text-center pt-3">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
                </p>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
