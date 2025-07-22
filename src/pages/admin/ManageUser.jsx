import React, { useEffect, useState } from 'react';

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    // Simulated user fetch (replace with real API)
    useEffect(() => {
        const fakeUsers = [
            { _id: '1', name: 'Mizan Rahman', email: 'mizan@example.com', role: 'user' },
            { _id: '2', name: 'Tanvir Alam', email: 'tanvir@example.com', role: 'seller' },
            { _id: '3', name: 'Admin Mia', email: 'admin@example.com', role: 'admin' },
        ];
        setUsers(fakeUsers);
    }, []);

    const handleRoleChange = (id, newRole) => {
        const updatedUsers = users.map(user =>
            user._id === id ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);

        // 👉 Optional: send role update to backend
        // fetch(`http://localhost:3000/users/${id}`, {
        //   method: 'PATCH',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ role: newRole }),
        // });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-red-600">Manage Users</h1>

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
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    <select
                                        value={user.role}
                                        onChange={e => handleRoleChange(user._id, e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
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
