import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from './hook/useAxiosSecure';

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
    role: ''
  });

    const [error, setError] = useState(null);
    const axiosSecure=useAxiosSecure()

  // Load user info - You can replace this with actual fetched data or context
//   useEffect(() => {
//     // Dummy static user for demo. Replace with real user fetch or context data
//     const currentUser = {
//       name: 'mehedi',
//       email: 'mehedi@gmail.com',
//       photo: 'https://i.ibb.co/4Z1Y9Yy/default.jpg',
//       role: 'seller'
//     };
//     setUser(currentUser);
//   }, []);

    useEffect(()=>{
      fetchUser()
    },[])
  
    const fetchUser = async () => {
      try {
        const response = await axiosSecure.get("/profile");
  
        console.log(response);
  
        const result = response.data;
  
        if (result.success) {
          setUser(result.data);
        } else {
          setError(result.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError(
          "Error connecting to server: " +
            (err.response?.data?.message || err.message)
        );
        console.error("Axios fetch error:", err);
      }
    };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, {
        name: user.name,
        photo: user.photo,
        role: user.role,
      });

      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes Made',
        });
      }
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.message || 'Try again later.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-100 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={user.photo}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* <div>
          <label className="label">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        <button type="submit" className="btn btn-primary w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
