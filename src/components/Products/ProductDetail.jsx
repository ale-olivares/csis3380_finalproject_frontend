import React, { useState, useEffect } from 'react';
import { getProductDetails } from '../../services/ProductService';
import { addToCart as addToCartService } from '../../services/CartService';
import { useParams } from 'react-router-dom';
import img1 from "../../assets/img/product1.jpg"

const ProductDetailComponent = ({ userId }) => {

    const { productId } = useParams();
    const [selectedGrind, setSelectedGrind] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [inputQuantity, setInputQuantity] = useState('');
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await getProductDetails(productId);
                setProduct(productData);

                console.log(productData);
                if (productData.product_subtypes.length > 0) {
                    setSelectedWeight(productData.product_subtypes[0].weight._id);
                }
           
                if (productData.grind_types.length > 0) {
                    setSelectedGrind(productData.grind_types[0]._id);
                }
                setSelectedImage(img1);
                 // setSelectedImage(productData.product_subtype[0].image_url);

            } catch (error) {
                console.error('Error while fetching product details', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        if (product && userId) {
            try {

                if (inputQuantity === '') {
                    setMessage("Please enter a quantity");
                }
                else {
                    setMessage(null);

                    // Call the service function to add to the backend cart
                    const response = await addToCartService(userId, productId, selectedWeight, selectedGrind, inputQuantity);

                    setMessage("Item added to cart successfully");
                }

            } catch (error) {
                setMessage(error.response.data);
            }
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-[#FFFF] text-black">
            {product ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        {/* Product Information */}
                        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                        <p className="mb-2">{product.description}</p>
                        <p className="mb-2"><strong>Origin:</strong> {product.countries_origin.join(', ')}</p>
                        <p className="mb-2"><strong>Process:</strong> {product.process}</p>

                        <div className="mb-4">
                            <label htmlFor="grindType" className="block mb-2">Choose a grind type:</label>
                            <select
                                id="grindType"
                                value={selectedGrind}
                                onChange={(e) => setSelectedGrind(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                {product.grind_types.map(grind => (
                                    <option key={grind._id} value={grind._id}>{grind.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="weight" className="block mb-2">Choose a weight:</label>
                            <select
                                id="weight"
                                value={selectedWeight}
                                onChange={(e) => {
                                    setSelectedWeight(e.target.value);
                                    setSelectedImage(product.product_subtype.find(subtype => subtype.weight._id === e.target.value).image_url);
                                }}
                                className="w-full p-2 border rounded-md"
                            >
                                {product.product_subtypes.map((subtype, index) => (
                                    <option key={subtype.weight._id} value={subtype.weight._id}>{subtype.weight.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block mb-2">Price:</label>
                            <p>${(product.product_subtypes.find(subtype => subtype.weight._id === selectedWeight).price / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block mb-2">Select the Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={inputQuantity}
                                onChange={(e) => setInputQuantity(e.target.value)}
                                min="1"
                                max="50"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <button onClick={handleAddToCart} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add to Cart</button>

                        {message ? (<p>{message}</p>) : null}
                    </div>
                    <div className="flex-1">
                        {/* Product Image */}
                        <img src={selectedImage} alt="Product Image" className="object-contain w-full h-auto" />
                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetailComponent;
