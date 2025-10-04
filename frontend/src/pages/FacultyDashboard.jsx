import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import NewsUpdate from '../components/News/newsUpdate.jsx';
import Footer from '../components/footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';

export default function ManagementDashboard() {
  const navigate = useNavigate(); // <-- added

  return (
    <div>
      <HeaderFaculty />
      <div className="register-btn-wrapper">
        <button 
          className="register-btn add-news-btn"
          onClick={() => navigate('/faculty/news/add')}
        >
          ➕ Add New Announcement
        </button>
      </div>
      <NewsUpdate/>
      <Footer />
    </div>
  );
}