import React, { useEffect, useState } from 'react';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', image: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        const dummy = [
            { _id: '1', name: 'Tablet', image: 'https://i.ibb.co/VVfMzhB/tablet.jpg' },
            { _id: '2', name: 'Syrup', image: 'https://i.ibb.co/mTcmQFv/syrup.jpg' },
            { _id: '3', name: 'Capsule', image: 'https://i.ibb.co/GWdW54d/capsule.jpg' },
            { _id: '4', name: 'Injection', image: 'https://i.ibb.co/vZ6bXzy/injection.jpg' },
            { _id: '5', name: 'Others', image: 'https://i.ibb.co/yQydsCD/others.jpg' },
        ];
        setCategories(dummy);
    }, []);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategory.name || !newCategory.image) return;
        const newCat = {
            _id: Date.now().toString(),
            ...newCategory,
        };
        setCategories([...categories, newCat]);
        setNewCategory({ name: '', image: '' });
        setShowAddModal(false);
    };

    const handleDelete = (id) => {
        setCategories(categories.filter((cat) => cat._id !== id));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedList = categories.map((cat) =>
            cat._id === editingCategory._id ? editingCategory : cat
        );
        setCategories(updatedList);
        setEditingCategory(null);
        setShowEditModal(false);
    };

    const openEditModal = (cat) => {
        setEditingCategory({ ...cat });
        setShowEditModal(true);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-600">Manage Categories</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    + Add Category
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-red-100 text-gray-700">
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat._id} className="border-t">
                                <td className="p-3 border">
                                    <img src={cat.image} alt={cat.name} className="h-12 w-12 object-cover mx-auto rounded" />
                                </td>
                                <td className="p-3 border font-medium">{cat.name}</td>
                                <td className="p-3 border space-x-2">
                                    <button
                                        onClick={() => openEditModal(cat)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center p-4 text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-red-600 text-center">Add New Category</h3>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="w-full p-2 border rounded"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full p-2 border rounded"
                                value={newCategory.image}
                                onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editingCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-red-600 text-center">Edit Category</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="w-full p-2 border rounded"
                                value={editingCategory.name}
                                onChange={(e) =>
                                    setEditingCategory({ ...editingCategory, name: e.target.value })
                                }
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full p-2 border rounded"
                                value={editingCategory.image}
                                onChange={(e) =>
                                    setEditingCategory({ ...editingCategory, image: e.target.value })
                                }
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Update Category
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
