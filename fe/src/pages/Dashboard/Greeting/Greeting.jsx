// Greeting.jsx
import React, { useEffect, useState } from 'react';

const Greeting = ({ userName: propUserName }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (propUserName) {
      setUserName(propUserName); 
    } else {
      const user = JSON.parse(localStorage.getItem('user')); 
      if (user) {
        setUserName(user.name); 
      }
    }
  }, [propUserName]);

  return (
    <div>
      <h1>Xin chào {userName || 'Nguyễn Thị Giang!'}</h1>
    </div>
  );
};

export default Greeting;
