import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingUsers, setUpdatingUsers] = useState(new Set());
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosSecure.get("/users");
            console.log('Users fetched:', response);
            
            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                setError("Failed to fetch users");
            }
        } catch (err) {
            setError("Error fetching users: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole, userEmail) => {
        try {
            // Add user to updating set to show loading state
            setUpdatingUsers(prev => new Set([...prev, userId]));
            
            // Make API call to update user role
            const response = await axiosSecure.patch(`/users/${userId}`, {
                email: userEmail,
                role: newRole
            });

            if (response.data.success) {
                // Update local state on successful API call
                const updatedUsers = users.map(user =>
                    user._id === userId ? { ...user, role: newRole } : user
                );
                setUsers(updatedUsers);
                
                // Optional: Show success message
                console.log('User role updated successfully');
            } else {
                setError("Failed to update user role");
            }
        } catch (err) {
            setError("Error updating user role: " + err.message);
            console.error('Role update error:', err);
        } finally {
            // Remove user from updating set
            setUpdatingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-red-600">Manage Users</h1>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-gray-500">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-red-600">Manage Users</h1>
                <div className="bg-white rounded-xl shadow p-4">
                    <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                    <button 
                        onClick={fetchUsers}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-red-600">Manage Users</h1>
            
            {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-100 text-sm">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-t text-sm">
                                <td className="p-3">{user.name || 'N/A'}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role || 'user'}</td>
                                <td className="p-3">
                                    <select
                                        value={user.role || 'user'}
                                        onChange={e => handleRoleChange(user._id, e.target.value, user.email)}
                                        disabled={updatingUsers.has(user._id)}
                                        className={`border border-gray-300 rounded px-2 py-1 ${
                                            updatingUsers.has(user._id) 
                                                ? 'opacity-50 cursor-not-allowed' 
                                                : 'hover:border-gray-400'
                                        }`}
                                    >
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                        {/* <option value="admin">Admin</option> */}
                                    </select>
                                    {updatingUsers.has(user._id) && (
                                        <span className="ml-2 text-xs text-gray-500">Updating...</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center py-6 text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageUser;