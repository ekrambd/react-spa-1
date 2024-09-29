import React from 'react';
import Home from './components/Home';
import About from './components/About';
import AddCategory from './components/addCategory';
import AllCategory from './components/allCategory';
import EditCategory from './components/editCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
             
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/add-category">Add Category</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/all-category">All Category</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/all-category" element={<AllCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
      </Routes>
   
    </div>
  );
}

export default App;
