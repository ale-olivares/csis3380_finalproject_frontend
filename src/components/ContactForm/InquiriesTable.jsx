import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getInquiries, openInquiry} from '../../services/InquiryService';
import Pagination from '../../layouts/Pagination';
import { useNavigate } from 'react-router-dom'; 

const InquiriesTable = () => {
    const [inquiries, setInquiries] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [expandedRow, setExpandedRow] = useState(null);
    const [update, setUpdate] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetcInquiries = async () => {
            const page = parseInt(searchParams.get('page') || '1', 10);
            const filters = { ...Object.fromEntries(searchParams), page };
            try {
                const response = await getInquiries(filters);
                setInquiries(response.inquiries);
                setTotalPages(response.totalPages);
                setCurrentPage(response.page);
            } catch (error) {
                console.error('Error while retrieving inquiries', error);
            }
        };
        fetcInquiries();
        window.scrollTo(0, 0); 
    }, [searchParams, update]);

    const handleRowClick = async (id) => {
        setExpandedRow(expandedRow === id ? null : id);
        await openInquiry(id);
        setUpdate(new Date());
    };

    return (
        <>
        <h1 className="font-semibold text-center text-3xl pt-5">Inquiries</h1>
        <div className="container pt-5 mx-auto pb-20 min-h-screen">
            <div className="overflow-x-auto shadow-md sm:rounded-lg pb-[15px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">    
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Message</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3" >Email</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Opened</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry, index) =>
                            <>
                            <tr key={index} className="bg-white border-b  hover:bg-amber-50" 
                                onClick={() => handleRowClick(inquiry._id)}
                                >
                                <th scope="row" className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                                    {inquiry.title}         
                                </th>
                                    <td className="px-6 py-4">{inquiry.body.length > 100 ? inquiry.body.slice(0, 80) + '…' : inquiry.body}</td>
                                    <td className="px-6 py-4">{new Date(inquiry.inquiry_date ).toLocaleDateString('en-US')}</td>
                                    <td className="px-6 py-4 " >{inquiry.email}</td>
                                    <td className="px-6 py-4">{inquiry.phone}</td>
                                    <td className="px-6 py-4">{inquiry.opened?new Date(inquiry.opened ).toLocaleDateString('en-US'):"-"}</td>
                            </tr>
                            {expandedRow === inquiry._id && (
                                <tr className="bg-gray-100">
                                    <td colSpan="5" className="px-6 py-4">
                                        {inquiry.body}
                                    </td>
                                </tr>
                            
                            )}
                            </>
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

export default InquiriesTable;