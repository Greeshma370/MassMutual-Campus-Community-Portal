import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNologin from '../components/header/headerNologin';
import RegisterButton from '../components/Registrations/registerButton';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register/student');
  };

  return (
    <div>
      <HeaderNologin />
      <div onClick={handleRegisterClick}>
        <RegisterButton />
      </div>
      <News />
      <Footer />
    </div>
  );
}