import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import Footer from '../components/footer/Footer';
import FacultyProfile from '../components/Profiles/FacultyProfile';

export default function Facultyprofile() {
  return (
    <div>
      <HeaderFaculty />
      <FacultyProfile/>
      <Footer />
    </div>
  );
}