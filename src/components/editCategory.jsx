import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const { id } = useParams(); // Get the category ID from the URL parameters
    const [category, setCategory] = useState({ category_name: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
                setCategory(response.data.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory(); // Call the fetch function
    }, [id]); // Run effect when id changes

    const handleChange = (e) => {
        // Update category state based on input changes
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Send a PATCH request to update the category
            const response = await axios.patch(`http://127.0.0.1:8000/api/categories/${id}`, category);
            toast.success(response.data.message, {
                position: 'top-right'
            });
            // Navigate after a brief delay to allow the user to see the toast
            setTimeout(() => {
                navigate('/all-category');
            }, 1000);
        } catch (error) {
            console.error('Error updating category:', error); // Log error if update fails
            toast.error('Error updating category', {
                position: 'top-right'
            });
        }
    };

    return (
        <>
            <ToastContainer /> {/* Add this line to render the toast notifications */}
            <div className="card">
                <div className="card-header bg-success text-light">
                    <h5 className="card-title">Edit Category</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="category_name">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category_name"
                                name="category_name"
                                placeholder="Category Name"
                                value={category.category_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group my-2">
                            <button type="submit" className="btn btn-success">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditCategory;
