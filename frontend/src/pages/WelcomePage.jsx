import React from 'react';
import HeaderNologin from '../components/header/headerNologin';
import RegisterButton from '../components/Registrations/registerButton';
import LoginButton from '../components/Registrations/loginButton'; // Import LoginButton
import News from '../components/News/news';
import Footer from '../components/footer/Footer';

export default function WelcomePage() {
  return (
    <div>
      <HeaderNologin />
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <LoginButton />
        <RegisterButton />
      </div>
      <News />
      <Footer />
    </div>
  );
}