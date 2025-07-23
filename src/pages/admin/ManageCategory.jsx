import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../components/hook/useAxiosSecure";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosSecure.get("/categories");
      const result = response.data;
      console.log(result);

      if (result.success) {
        setCategories(result.data);
      } else {
        setError(result.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
      console.error("Fetch error:", err);
      
      // Fallback to dummy data if API fails
      const dummy = [
        {
          _id: "1",
          name: "Tablet",
          image: "https://i.ibb.co/VVfMzhB/tablet.jpg",
        },
        { _id: "2", name: "Syrup", image: "https://i.ibb.co/mTcmQFv/syrup.jpg" },
        {
          _id: "3",
          name: "Capsule",
          image: "https://i.ibb.co/GWdW54d/capsule.jpg",
        },
        {
          _id: "4",
          name: "Injection",
          image: "https://i.ibb.co/vZ6bXzy/injection.jpg",
        },
        {
          _id: "5",
          name: "Others",
          image: "https://i.ibb.co/yQydsCD/others.jpg",
        },
      ];
      setCategories(dummy);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    // Use state values directly
    const { name, image } = newCategory;
    
    if (!name || !image) {
      alert("Please fill in all fields");
      return;
    }

    const category = { name, imageURL: image };
    console.log("Adding category:", category);

    try {
      const res = await axiosSecure.post("/categories", category);
      if (res.data.success) {
        alert("Category added successfully");
        setNewCategory({ name: "", image: "" }); // Reset form
        setShowAddModal(false); // Close modal
        fetchCategories(); // Refresh the categories list
      } else {
        alert("Failed to add category");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!editingCategory.name || !editingCategory.imageURL) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axiosSecure.put(`/categories/${editingCategory._id}`, {
        name: editingCategory.name,
        imageURL: editingCategory.imageURL
      });
      
      if (res.data.success) {
        alert("Category updated successfully");
        setEditingCategory(null);
        setShowEditModal(false);
        fetchCategories(); // Refresh the categories list
      } else {
        alert("Failed to update category");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  const openEditModal = (cat) => {
    setEditingCategory({ ...cat });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/categories/${id}`);

      if (res.data.success) {
        // Remove from local UI after successful deletion
        setCategories(categories.filter((cat) => cat._id !== id));
        alert("Category deleted successfully");
      } else {
        alert(res.data.message || "Failed to delete category.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting category: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="text-lg">Loading categories...</div>
      </div>
    );
  }

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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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
                  <img
                    src={cat.imageURL || cat.image}
                    alt={cat.name}
                    className="h-12 w-12 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-3 border font-medium">{cat.name}</td>
                <td className="p-3 border space-x-2">
                  {/* <button
                    onClick={() => openEditModal(cat)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button> */}
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
            <h3 className="text-xl font-bold mb-4 text-red-600 text-center">
              Add New Category
            </h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full p-2 border rounded"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
                value={newCategory.image}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, image: e.target.value })
                }
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
      {/* {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-red-600 text-center">
              Edit Category
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full p-2 border rounded"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    name: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
                value={editingCategory.imageURL || editingCategory.image || ""}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    imageURL: e.target.value,
                  })
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
      )} */}
    </div>
  );
};

export default ManageCategory;