import React from 'react';
import './App.css';
import UsersList from './pages/components/userslist/UsersList';

function App() {

  return (
    <React.Fragment>
      <h2 className="header">
        Hello CoderPush!
      </h2>
      <UsersList />
    </React.Fragment>
  );
}

export default App;
