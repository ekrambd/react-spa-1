import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [formData, setFormData] = useState({
        category_name: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value, 
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/categories', formData)
          .then((response) => {
            console.log(response.data);
            // Clear input field
            setFormData({ category_name: '' });
            // Show success toast notification
            toast.success(response.data.message || 'Category added successfully!', {
                position: 'top-right' // Changed to string
            });
          })
          .catch((error) => {
            // Handle error response
            const errorMsg = error.response?.data?.data?.category_name[0] || 'An error occurred';
            setErrorMessage(errorMsg); // Set error message
            toast.error(errorMsg, {
                position: 'top-right' // Changed to string
            });
          });
    };

    return (
        <>
            <div className="card">
                <div className="card-header bg-primary text-light">
                  <h5 className="card-title">Add Category</h5>
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
                                value={formData.category_name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        </div>

                        <div className="form-group my-2">
                           <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Toast container to show the toast messages */}
            <ToastContainer />
        </>
    );
};

export default AddCategory;
