import React,{ useEffect, useState } from "react";
import UserProfileInfoComponent from "../User/UserProfileInfo";
import UserProfileOrdersComponent from "../User/UserProfileOrders";
import { getCurrentUser } from '../../services/AuthService';
import { getUserDetail as getUserDetailService } from '../../services/UserService';
import { getPurchaseOrders as getPurchaseOrdersService } from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from "../../layouts/Loading";

const UserProfile = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userOrders, setUserOrders] = useState(null);
    const history = useNavigate();

    useEffect(() => {

        const getUser = async () => {
            try {
                const userAuth = getCurrentUser();

                if (!userAuth) {
                    history('/login');
                }

                const user = await getUserDetailService(userAuth.id);
                const orders = await getPurchaseOrdersService(userAuth.id);
                setCurrentUser(user);
                setUserOrders(orders);
            } catch (error) {
                console.error('Error while fetching user detail', error);
            }
        }
        getUser();
    }, []);

    if (!currentUser || !userOrders) {
        return <LoadingComponent />
    }

    return (
        <>
            <UserProfileInfoComponent userInfo = {currentUser} />
            <UserProfileOrdersComponent orderItems = {userOrders} />
        </>
    );


}

export default UserProfile;