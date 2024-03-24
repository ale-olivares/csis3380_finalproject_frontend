import React, {useEffect, useState} from "react";
import { getCurrentUser } from '../../services/AuthService';

const UserProfileInfoComponent = () => {
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
        setCurrentUser(user);
        }
    }, []);
    
    return (
        <div>
        <h1>User Profile</h1>
        <div>
            <strong>Token:</strong> {currentUser.accessToken}
        </div>
        <div>
            <strong>Id:</strong> {currentUser.id}
        </div>
        <div>
            <strong>Username:</strong> {currentUser.username}
        </div>
        <div>
            <strong>Email:</strong> {currentUser.email}
        </div>
        <div>
            <strong>Authorities:</strong> {currentUser.roles}
        </div>
        </div>
    );
}

export default UserProfileInfoComponent;