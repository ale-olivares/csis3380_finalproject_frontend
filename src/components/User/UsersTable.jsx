import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUsers} from '../../services/UserService';
import Pagination from '../../layouts/Pagination';
import { useNavigate } from 'react-router-dom'; 

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUsers = async () => {
            const page = searchParams.get('page') || 1; 
            const filters = { ...Object.fromEntries(searchParams), page };

            try {
                const response = await getUsers(filters);
                setUsers(response.users);
                setTotalPages(response.totalPages);
                setCurrentPage(response.page);
            } catch (error) {
                console.error('Error while fetching users', error);
            }
        };
        fetchUsers();
        window.scrollTo(0, 0); 
    }, [searchParams]);

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set('page', '1');
        newSearchParams.set(name, value);

      if(value === ''){
        newSearchParams.delete(name);
      }
       
        setSearchParams(newSearchParams);
    };

    return (
        <>
        <h1 className="font-semibold text-center text-3xl pt-5">Users</h1>
        <div className="container pt-5 mx-auto pb-20 min-h-screen">
            <div className='pb-[10px]'>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by username" 
                        name='username'
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg pb-[15px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">    
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Company</th>
                            <th scope="col" className="px-6 py-3" >Address</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Roles</th>
                            <th scope="col" className="px-6 py-3">Creation Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={index} className="bg-white border-b  hover:bg-amber-50" 
                                onClick={ ()=>navigate(`/user/${user._id}`)}
                            >
                                <th scope="row" className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                                    {user.username}         
                                </th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.company}</td>
                                    <td className="px-6 py-4 " >{user.address}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4"> {user.roles.map(role => role.name).join(", ")}</td>
                                    <td className="px-6 py-4"> {new Date(user.created_at).toLocaleDateString('en-US')}</td>
                                    <td className="px-6 py-4">{user.deletedAt?"Inactive":"Active"}</td>
                            </tr>
                        )}
                    </tbody> 
                </table>
            </div> 
            <div className="flex justify-center pt-10">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </div>
        </>
    );
};

export default UsersTable;