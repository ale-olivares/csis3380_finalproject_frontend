import React from "react";
import UserProfileInfoComponent from "../User/UserProfileInfo";


const UserProfile = () => {
    return (
        <>
            <h1 className=" font-semibold text-center text-4xl mt-24 mb-8 text-black">
                User Profile
            </h1>
            <UserProfileInfoComponent />
        </>
    );


}

export default UserProfile;