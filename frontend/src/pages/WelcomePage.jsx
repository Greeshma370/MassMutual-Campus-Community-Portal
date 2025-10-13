import React from 'react';
import HeaderNologin from '../components/header/headerNologin';
import RegisterButton from '../components/Registrations/registerButton';
import LoginButton from '../components/Registrations/loginButton';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';
import './WelcomePage.css';

export default function WelcomePage() {
  return (
    <div className="welcome-page1">
      <HeaderNologin />
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span>MassMutual Campus Community Portal</span>
          </h1>
          <p>Your central hub for all campus events, news, and collaborations 🚀</p>

          <div className="button-group">
            <LoginButton />
            <RegisterButton/>
          </div>
        </div>
      </section>

      <section className="news-section">
        <News />
      </section>

      <Footer />
    </div>
  );
}
