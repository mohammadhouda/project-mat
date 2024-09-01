import React, { Fragment, useState } from 'react';
import { Header, Footer, UserAdminPage, UserPage } from "../index";
import './HomePage.css';

const HomePage = ({ userType, userName }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderMainContent = () => {
    if (selectedOption === 'Users') {
      return <UserAdminPage />;
    }
    if (selectedOption === 'New Card' && userType === 'user') {
      return <UserPage />;
    }

    return <p>Select an option from the sidebar to view details.</p>;
  };

  return (
    <Fragment>
      <Header userName={userName} />
      <div className="homepage-container">
        <div className="homepage-content">
          <aside className="sidebar">
            <ul>
              {userType === 'admin' && (
                <>
                  <li><a href="#" onClick={() => setSelectedOption('Users')}>Users</a></li>
                  <li><a href="#" onClick={() => setSelectedOption('Pending Cards')}>Pending Cards</a></li>
                  <li><a href="#" onClick={() => setSelectedOption('New Card')}>New Card</a></li>
                  <li><a href="#" onClick={() => setSelectedOption('Rejected Cards')}>Rejected Cards</a></li>
                </>
              )}
              {userType === 'user' && (
                <>
                  <li><a href="#" onClick={() => setSelectedOption('New Card')}>New Card</a></li>
                  <li><a href="#" onClick={() => setSelectedOption('My Tasks')}>My Tasks</a></li>
                </>
              )}
            </ul>
          </aside>
          <main className="main-content">
            {renderMainContent()}
          </main>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
