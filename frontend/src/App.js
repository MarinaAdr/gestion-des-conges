import React, { useEffect, useState } from 'react';
import Header from './Components/Header';

const App = () => {
  const [userInfo, setUserInfo] = useState({ isAdmin: false, notificationsCount: 0, user: {} });

  useEffect(() => {
    fetch('/api/user-info')
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error('Error fetching user info:', error));
  }, []);

  return (
    <div>
      <Header
        isAdmin={userInfo.isAdmin}
        notificationsCount={userInfo.notificationsCount}
        user={userInfo.user}
      />
      {/* Other content of the app */}
    </div>
  );
};

export default App;
