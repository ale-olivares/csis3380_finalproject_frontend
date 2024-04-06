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
        <div className="container pt-5 mx-auto pb-20 min-h-screen  " style={{ width: '90vw' }}>
            <div className="overflow-x-auto shadow-md sm:rounded-lg pb-[15px]">
                <div className="min-w-max">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">    
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="hidden sm:table-cell px-6 py-3">Message</th>
                                <th scope="col" className="hidden sm:table-cell px-6 py-3">Date</th>
                                <th scope="col" className="hidden sm:table-cell px-6 py-3" >Email</th>
                                <th scope="col" className="hidden sm:table-cell px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Opened</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.length===0? <tr><td colSpan={6} className="text-center py-4 text-gray-500 text-lg">No inquiries</td></tr> : inquiries.map((inquiry, index) => (
                                <React.Fragment key={inquiry._id}>
                                <tr className="bg-white border-b hover:bg-amber-50" onClick={() => handleRowClick(inquiry._id)}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {inquiry.title.length > 15 ? `${inquiry.title.slice(0, 15)}…` : inquiry.title}
                                    </th>
                                    <td className="hidden sm:table-cell px-6 py-3">{inquiry.body.length > 80 ? `${inquiry.body.slice(0, 80)}…` : inquiry.body}</td>
                                    <td className="hidden sm:table-cell px-6 py-3">{new Date(inquiry.inquiry_date).toLocaleDateString('en-US')}</td>
                                    <td className="hidden sm:table-cell px-6 py-3">{inquiry.email}</td>
                                    <td className="hidden sm:table-cell px-6 py-3">{inquiry.phone}</td>
                                    <td className="px-6 py-3">{inquiry.opened ? new Date(inquiry.opened).toLocaleDateString('en-US') : "-"}</td>
                                </tr>
                                {expandedRow === inquiry._id && (
                                    <tr className="bg-gray-100">
                                    <td colSpan="6" className="px-6 py-3">
                                        {/* {inquiry.body} */}
                                        <div className="font-bold text-lg mb-2">{inquiry.title}</div>
                                        <div className="text-gray-800 mb-2">Message:<br/> {inquiry.body}</div>
                                        <div className="text-gray-600">Email: {inquiry.email}</div>
                                        <div className="text-gray-600 mb-2">Phone: {inquiry.phone}</div>
                                        <div className="text-gray-600">Date: {new Date(inquiry.inquiry_date).toLocaleDateString('en-US')}</div>
                                    </td>
                                    </tr>
                                )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> 
            <div className="flex justify-center pt-10">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </div>
        </>
    );
};

export default InquiriesTable;