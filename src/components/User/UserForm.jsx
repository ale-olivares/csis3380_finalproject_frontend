import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { createUser, getUserDetail, updateUser, inactivateUser } from "../../services/UserService"; 
import Notification from "../../layouts/Notification";

const UserForm = () => {
  const userForm = useRef(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const { id } = useParams(); 
  const [update, setUpdate] = useState(0);
  const [deleted, setDeleted] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
       if(id){
        try {
            const userData = await getUserDetail(id);
            
            const form = userForm.current;
            form.username.value = userData.username;
            form.email.value = userData.email;
            form.phone.value = userData.phone;
            form.company.value = userData.company;
            form.address.value = userData.address;
            userData.roles.forEach(role => {
                const checkbox = Array.from(form['roles[]']).find(input => input.value === role.name);
                if (checkbox) {
                  checkbox.checked = true;
                }
              }); 

              setDeleted(!!userData.deletedAt);
          } catch (error) {
            console.error('Error while getting user data', error);
            setNotification({ show: true, message: error.response.data.message, type: 'error' });
          }
       }
    };
    fetchUser(); 
  }, [id, update]); 

  const handleClick = async (event) => {
    event.preventDefault();
    const form = userForm.current;

    const username = form.username.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const company = form.company.value;
    const address = form.address.value;
    const roles = Array.from(form['roles[]']).filter(input => input.checked).map(input => input.value);

    const userData = { username, email, phone, company, address, roles };
    
    try {
        if(id){
            const response = await updateUser(id, userData);
            setNotification({ show: true, message: 'User updated successfully!', type: 'success' });
            setUpdate(new Date());
        }else{
            const response = await createUser(userData);
            setNotification({ show: true, message: 'User created successfully!', type: 'success' });
            form.reset();
        }
    } catch (error) {
        console.error(error);
        setNotification({ show: true, message: error.response.data.message, type: 'error' });
    }
};


const handleInactivation = async(event) =>{
    event.preventDefault();
    try {
        await inactivateUser(id);
        setNotification({ show: true, message: 'User status updated successfully!', type: 'success' });
        setUpdate(new Date()); 
    } catch (error) {
        console.error(error);
        setNotification({ show: true, message: error.response?.data?.message || 'An error occurred', type: 'error' });
    }
}

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />
        <form ref={userForm}>
          {/* Username */}
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-bold text-[#422006]"> Username </label>
            <input type="text" name="username" id="username"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#27272a] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 block text-base font-bold text-[#422006]">Email</label>
            <input type="email" name="email" id="email"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#27272a] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          {/* Phone */}
          <div className="mb-5">
            <label htmlFor="phone" className="mb-3 block text-base font-bold text-[#422006]">Phone Number</label>
            <input type="text" name="phone" id="phone" placeholder="###-###-####"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#27272a] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          {/* Company */}
          <div className="mb-5">
            <label htmlFor="company" className="mb-3 block text-base font-bold text-[#422006]">Company Name</label>
            <input type="text" name="company" id="company"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#27272a] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          {/* Addres */}
          <div className="mb-5">
            <label htmlFor="address" className="mb-3 block text-base font-bold text-[#422006]">Address</label>
            <input type="text" name="address" id="address"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#27272a] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
          {/* Roles */}
          <div className="mb-5">
            <label htmlFor="roles[]" className="mb-3 block text-base font-bold text-[#422006]">Roles</label>
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input type="checkbox" id="user" name="roles[]" value="user" className="hidden peer" required />
                <label htmlFor="user" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#78350f] peer-checked:text-[#78350f] hover:text-gray-600 hover:bg-gray-100">
                  <div className="block w-full font-semibold">User</div>
                </label>
              </li>
              <li>
                <input type="checkbox" id="admin" name="roles[]" value="admin" className="hidden peer" required />
                <label htmlFor="admin" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#78350f] peer-checked:text-[#78350f] hover:text-gray-600 hover:bg-gray-100">
                  <div className="block w-full  font-semibold">Admin</div>
                </label>
              </li>
            </ul>
          </div>

          <div>
            <button
                type="button"
                className="hover:shadow-form w-full rounded-md  bg-brightColor  hover:bg-[#451a03]  py-3 px-8 text-center text-base font-semibold text-white outline-none mb-2"
                onClick={handleClick}> 
                {id ? 'Update User' : 'Create User'}
            </button>

            {id?
                (deleted? 
                <button className="hover:shadow-form w-full rounded-md bg-[#65a30d] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                onClick={handleInactivation}>
                    Activate User
                </button>:
                <button className="hover:shadow-form w-full rounded-md bg-[#b91c1c] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                onClick={handleInactivation}>

                    Inactivate User
                </button>) :
                ""
            }
          </div>
        </form>
      </div>
    </div>
  )
};

export default UserForm;
