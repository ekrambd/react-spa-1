import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(response.data.data); // Assuming the API returns an array of categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch attempt
            }
        };
        fetchCategories();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-category/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
                toast.success('Category deleted successfully!', {
                    position: 'top-right',
                });
                // Remove the deleted category from the state
                setCategories(categories.filter((category) => category.id !== id));
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error('Error deleting category!', {
                    position: 'top-right',
                });
            }
        }
    };

    const renderTableBody = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan="2">Loading...</td>
                </tr>
            );
        }

        if (categories.length > 0) {
            return categories.map((category) => (
                <tr key={category.id}>
                    <td>{category.category_name}</td>
                    <td>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => handleEdit(category.id)}>Edit</button>
                        <button type="button" className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(category.id)}>Delete</button>
                    </td>
                </tr>
            ));
        }

        return (
            <tr>
                <td colSpan="2">No data found</td>
            </tr>
        );
    };

    return (
        <>
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-primary text-light">
                    <h5 className="card-title">All Category</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped text-center">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllCategory;
