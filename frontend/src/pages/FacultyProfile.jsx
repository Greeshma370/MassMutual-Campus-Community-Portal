import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import Footer from '../components/footer/Footer';
import FacultyProfile from '../components/Profiles/facultyProfile';

export default function Facultyprofile() {
  return (
    <div>
      <HeaderFaculty />
      <FacultyProfile/>
      <Footer />
    </div>
  );
}