import React, { useState, useEffect } from 'react';

function Profile() {
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });

    useEffect(() => {
        // Simulating fetching user data
        const user = {
            name: 'John Doe',
            email: 'john.doe@example.com'
        };
        setUserDetails(user);
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
    );
}

export default Profile;
