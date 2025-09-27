import React from 'react';
import HeaderNologin from '../components/header/headerNologin';
import RegisterButton from '../components/Registrations/registerButton';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';

export default function WelcomePage() {
  return (
    <div>
      <HeaderNologin />
      <RegisterButton />
      <News />
      <Footer />
    </div>
  );
}