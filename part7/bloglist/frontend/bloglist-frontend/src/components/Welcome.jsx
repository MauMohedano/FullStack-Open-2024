/* eslint-disable react/prop-types */
import React from 'react';

const Welcome = ({ user, removeUser }) => {
    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <button onClick={removeUser}>Logout</button>
        </div>
    );
};

export default Welcome;