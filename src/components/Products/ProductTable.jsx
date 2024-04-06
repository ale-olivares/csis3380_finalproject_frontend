import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductList , updateProduct} from '../../services/ProductService';
import Pagination from '../../layouts/Pagination';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [editing, setEditing] =  useState({ prodId: null, index: null });; 
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
             const page = searchParams.get('page') || 1; 
            const filters = { ...Object.fromEntries(searchParams), page };

            try {
                const response = await getProductList(filters);
                setProducts(response.products);
                setTotalPages(response.totalPages);
                setCurrentPage(response.page);

            } catch (error) {
                console.error('Error while fetching products', error);
            }
        };
        fetchProducts();
        window.scrollTo(0, 0); 
    }, [searchParams, editing]);

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


    const handleEdit = (prodId, index) => {
        setEditing({prodId, index})
    };


    const handleSave = async (prodId, index) => {
        const product = products.find(p => p._id === prodId);
        try {

            product.product_subtypes.forEach((subtype, i) => {
                if(subtype.price<=0||subtype.stock<0){
                    throw new Error('Invalid information');
                }        
            });

            await updateProduct(product, index);
            setEditing({prodId: null, index: null}); // Exit editing mode
 
            setModal({
                showModal: true,
                modalMessage: "Product updated successfully",
                modalTitle: "Success",
                modalType: "success"
            });
        } catch (error) {
            console.error('Error updating product', error);
            setModal({
                showModal: true,
                modalMessage: error.message,
                modalTitle: "Error",
                modalType: "error"
            });
            setEditing({prodId: null, index: null}); // Exit editing mode
        }
    };

    const handleCancel = async () => {
            setEditing({prodId: null, index: null}); // Exit editing mode

    };


    const handleChange = (event, prodId, subtypeIndex) => {
        const {name, value} = event.target;
        const updatedProducts = [];
        const updatedSubtypes = [];

        products.forEach(product => {
            if (product._id===prodId){
                product.product_subtypes.forEach((subtype, index) => {
                    if (index === subtypeIndex) {                           
                        updatedSubtypes.push({...subtype, [name]: value});
                    } else {
                        updatedSubtypes.push(subtype);
                    }
                });
                updatedProducts.push({...product, product_subtypes: updatedSubtypes});
            }
            else{
                updatedProducts.push(product);
            }
        })
        setProducts(updatedProducts);
    };

    return (
        <>
        <h1 className="font-semibold text-center text-3xl pt-5">Products</h1>
        <div className="container pt-5 mx-auto pb-20 min-h-screen" style={{ width: '85vw' }}> 
            <div className='pb-[10px] ml-2'>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by ID" 
                        name='id'
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-[15px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center items-center">    
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3">Name</th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Weight</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length===0? <tr><td colSpan={8} className="text-center py-4 text-gray-500 text-lg">No products</td></tr> :products.map((product) =>
                            product.product_subtypes.map((subtype, index) => (
                                <tr key={`${product.prod_id}-${index}`} className="bg-white border-b  hover:bg-amber-50">
                                    <th scope="row" className="hidden sm:table-cell px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {product.name} </th>
                                    <td className="hidden sm:table-cell px-6 py-3">
                                        <div className="flex justify-center items-center">
                                            <img className="w-9 h-9" src={subtype.image_url} alt="" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">{product.prod_id}</td>
                                    <td className="hidden sm:table-cell px-6 py-3">{product.product_category.name}</td>
                                    <td className="px-6 py-3">{subtype.weight.name}</td>
                                    <td className="px-6 py-3">
                                        {(editing.prodId === product._id && editing.index == index) ? (
                                            <input
                                                type="number"
                                                value={subtype.stock}
                                                className="appearance-none bg-transparent border-none text-green-500 leading-tight focus:outline-none text-center  font-medium text-sm rounded-lg h-[35px] w-[100px]"
                                                onChange={(e) => handleChange(e, product._id, index)}
                                                name="stock"
                                            />
                                        ) : (
                                            subtype.stock
                                        )}
                                    </td>
                                    <td className="px-6 py-3">
                                        { (editing.prodId === product._id && editing.index == index)? (
                                            <input
                                                type="text"
                                                value={subtype.price}
                                              
                                                className="appearance-none bg-transparent border-none text-green-500 leading-tight focus:outline-none text-center  font-medium text-sm rounded-lg h-[35px] w-[100px]"
                                                onChange={(e) => handleChange(e, product._id, index)}
                                                name="price"
                                            />
                                        ) : (
                                            subtype.price
                                        )}
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-3">
                                        {(editing.prodId === product._id && editing.index == index) ? (
                                            <>
                                                <button className="w-[60px] h-[35px] bg-green-600 text-white rounded hover:bg-green-500" onClick={() => handleSave(product._id, index)}>Save</button>
                                                <button className="ml-2 w-[60px] h-[35px] bg-red-600 text-white rounded hover:bg-red-500" onClick={() => handleCancel()}>Cancel</button>
                                            </>
                                        ) : (
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" onClick={() => handleEdit(product._id, index)}>Edit</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center pt-10">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </div>
        {modal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
                    <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.modalTitle}</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">{modal.modalMessage}</p>
                            </div>
                            <div className="items-center px-4 py-3">
                                {
                                    modal.modalType === 'error' ? (
                                        <button
                                            id="error-btn"
                                            onClick={() => setModal(null)}
                                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            OK
                                        </button>
                                    ) : (
                                        <button
                                            id="ok-btn"
                                            onClick={() => setModal(null)}
                                            className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            OK
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductTable;