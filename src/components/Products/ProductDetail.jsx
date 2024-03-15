import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../services/ProductService';
import { addToCart as addToCartService } from '../../services/CartService';
import { useParams } from 'react-router-dom';
import defaultProductImage from '../../assets/img/default_500_500.png'
import { FaCartPlus, FaUser } from "react-icons/fa";
import { getCurrentUser } from '../../services/AuthService';
import ReviewCardComponent from '../../layouts/ReviewCard';

const ProductDetailComponent = () => {

    const { productId } = useParams();
    const [selectedGrind, setSelectedGrind] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [inputQuantity, setInputQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await getProductDetails(productId);
                setProduct(productData);
                if (productData.product_subtypes.length > 0) {
                    setSelectedWeight(productData.product_subtypes[0].weight._id);
                    setSelectedPrice(productData.product_subtypes[0].price);
                }
           
                if (productData.grind_types.length > 0) {
                    setSelectedGrind(productData.grind_types[0]._id);
                }
                setSelectedImage(productData.product_subtypes[0].image_url);

            } catch (error) {
                console.error('Error while fetching product details', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        
        if (product && getCurrentUser()) {
            
            try {

                if (inputQuantity === '' || parseInt(inputQuantity) <= 0) {
                    setModal({
                        showModal: true,
                        modalMessage: "Please enter a quantity",
                        modalTitle: "Error",
                        modalType: "error"
                    });
                }
                else {
                    setModal(null);

                    // Call the service function to add to the backend cart
                    const response = await addToCartService(getCurrentUser().id, productId, selectedWeight, selectedGrind, inputQuantity, selectedPrice);
                    
                    if (response.message) {
                        setModal({
                            showModal: true,
                            modalMessage: response.message,
                            modalTitle: "Error",
                            modalType: "error"
                        });
                    }
                    else{
                        setModal({
                            showModal: true,
                            modalMessage: "Item added to cart successfully",
                            modalTitle: "Success",
                            modalType: "success"
                        });
                    }

                }

            } catch (error) {
                setModal({
                    showModal: true,
                    modalMessage: error.response.data,
                    modalTitle: "Error",
                    modalType: "error"
                });
            }
        }
    };

    const calculateAverageRating = (reviews) => {
        let total = 0.0;
        
        reviews.forEach(review => {
            total += parseFloat(review.rating);
        });

        return reviews.length === 0 ? '-' : total / parseFloat(reviews.length).toFixed(1);

    }

    const redirectLogin = () => {
        navigate('/login');
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
        
            <div className="container pt-40 px-40 md:mx-auto">
                {product ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 min-h-screen">
                        <div>
                            <h1 className="text-3xl font-semibold leading-7 text-gray-900">{product.name}</h1>
                            <p className="mt-1 text-sm leading-6 text-gray-600">{product.description}</p>
                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                            <thead className="text-xl text-gray-800 bg-gray-50 text-center">
                                                <tr>
                                                    <th colSpan="2" scope="col" className="px-6 py-3">
                                                        Specifications
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Category
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.product_category.name}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Country Origin
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.countries_origin.join(', ')}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Region
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.region}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Process
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.process}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Farm
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.farm}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Producer
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.producer}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        Importer
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {product.import_partner.name}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 mt-5">
                                <div className="sm:col-span-4 sm:col-start-2">
                                    <img className='rounded-lg w-96 h-96' src={selectedImage === "#" ? defaultProductImage : selectedImage} alt="Product" />
                                </div>
                                <div className="sm:col-span-6">
                                    <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                        { getCurrentUser() ? (
                                            <div className="sm:col-span-2">
                                                <label htmlFor="grindType" className="block text-sm font-medium leading-6 text-gray-900">Choose a Grind:</label>
                                                <div className='mt-2'>
                                                    <select
                                                        id="grindType"
                                                        value={selectedGrind}
                                                        onChange={(e) => setSelectedGrind(e.target.value)}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                                    >
                                                        {product.grind_types.map(grind => (
                                                            <option key={grind._id} value={grind._id}>{grind.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ): (
                                            <div className="sm:col-span-2 sm:col-start-2">
                                                <label htmlFor="grindType" className="block text-sm font-medium leading-6 text-gray-900">Choose a Grind:</label>
                                                <div className='mt-2'>
                                                    <select
                                                        id="grindType"
                                                        value={selectedGrind}
                                                        onChange={(e) => setSelectedGrind(e.target.value)}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                                    >
                                                        {product.grind_types.map(grind => (
                                                            <option key={grind._id} value={grind._id}>{grind.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )} 
                                        <div className="sm:col-span-2">
                                            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">Choose a Weight:</label>
                                            <div className='mt-2'>
                                                <select
                                                    id="weight"
                                                    value={selectedWeight}
                                                    onChange={(e) => {
                                                        setSelectedWeight(e.target.value);
                                                        setSelectedImage(product.product_subtypes.find(subtype => subtype.weight._id === e.target.value).image_url);
                                                        setSelectedPrice(product.product_subtypes.find(subtype => subtype.weight._id === e.target.value).price);
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    {product.product_subtypes.map((subtype, index) => (
                                                        <option key={subtype.weight._id} value={subtype.weight._id}>{subtype.weight.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        { getCurrentUser() ? (
                                            <div className="sm:col-span-1">
                                                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity:</label>
                                                <div className='mt-2'>
                                                    <input
                                                        type="number"
                                                        id="quantity"
                                                        name="quantity"
                                                        value={inputQuantity}
                                                        onChange={(e) => {
                                                            setInputQuantity(e.target.value);
                                                        }}
                                                        min="1"
                                                        max="50"
                                                        className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        ) : (<></>)}
                                        <div className="sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2">Price:</label>
                                            <p className='pt-2'>${(product.product_subtypes.find(subtype => subtype.weight._id === selectedWeight).price.$numberDecimal * inputQuantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                                        </div>
                                        { getCurrentUser() ? (
                                            <div className="sm:col-span-4 sm:col-start-2 mt-4">
                                                <button onClick={handleAddToCart} className="flex items-center justify-center bg-blue-400 text-white py-3 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full space-x-2">
                                                    <FaCartPlus className="text-base" />
                                                    <span>Add to Cart</span>
                                                </button>
                                            </div>) : (
                                            <div className="sm:col-span-4 sm:col-start-2 mt-4">
                                                <button onClick={redirectLogin} className="flex items-center justify-center bg-yellow-500 text-white py-3 px-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 w-full space-x-2">
                                                    <FaUser className="text-base" />
                                                    <span>Login to Buy</span>
                                                </button>
                                            </div>
                                            )    
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-2 sm:col-span-2">
                            <hr className="h-px mt-8 bg-gray-200 border-0"></hr>
                        </div>
                        {/* For review and rating it's sampling from now */}
                        <div className="pb-12 sm:col-span-2">
                            <div className="flex items-center mb-4 items-center">
                                <div className="flex items-center mr-5">
                                    <p className="bg-blue-100 text-blue-800 text-md font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">{calculateAverageRating(product.reviews)}</p>
                                </div>
                                <h1 className="text-2xl font-semibold leading-7 text-gray-900">Reviews & Ratings</h1>
                            </div>

                            {product.reviews.length === 0 ? (
                                                                <h4>This product has not received any review or rating yet.</h4>
                                                        ) :  (
                                                                product.reviews.map((review,index) => (
                                                                    <ReviewCardComponent reviewData={review} key={index} /> 
                                                                ))
                            )}
                        </div>
                    </div>

                ) : (
                    <p>Loading product details...</p>
                )}
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

export default ProductDetailComponent;
