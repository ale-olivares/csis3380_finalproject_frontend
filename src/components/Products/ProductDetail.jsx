import React, { useState, useEffect } from 'react';
import { getProductDetails } from '../../services/ProductService';
import { addToCart as addToCartService } from '../../services/CartService';

const ProductDetailComponent = ({ productId, userId }) => {
    const [selectedGrind, setSelectedGrind] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [inputQuantity, setInputQuantity] = useState('');
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await getProductDetails(productId);
                setProduct(productData);
                if (productData.product_subtype.length > 0) {
                    setSelectedWeight(productData.product_subtype[0].weight._id);
                }
                if (productData.grind_types.length > 0) {
                    setSelectedGrind(productData.grind_types[0]._id);
                }

                console.log(productData);
            } catch (error) {
                console.error('Error while fetching product details', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        if (product && userId) {
            try {
                
                if (inputQuantity === '') 
                {
                    setMessage("Please enter a quantity");
                }
                else
                {
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
        <div>
            {product ? (
                <>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p><strong>Origin:</strong> {product.countries_origin.join(', ')}</p>
                    <p><strong>Process:</strong> {product.process}</p>
                    <div>
                        <label htmlFor="grindType">Choose a grind type:</label>
                        <select
                            id="grindType"
                            value={selectedGrind}
                            onChange={(e) => setSelectedGrind(e.target.value)}
                        >
                            {product.grind_types.map(grind => (
                                <option key={grind._id} value={grind._id}>{grind.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="weight">Choose a weight:</label>
                        <select
                            id="weight"
                            value={selectedWeight}
                            onChange={(e) => setSelectedWeight(e.target.value)}
                        >
                            {product.product_subtype.map((subtype,index) => (
                                <option key={subtype.weight._id} value={subtype.weight._id}>{subtype.weight.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <p>${(product.product_subtype.find(subtype => subtype.weight._id === selectedWeight).price / 100).toLocaleString("en-US", {minimumFractionDigits: 2})}</p>
                    </div>
                    <div>
                        <label htmlFor="quanity">Select the Quantity:</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            name="quantity" 
                            value={inputQuantity}
                            onChange={(e) => setInputQuantity(e.target.value)}
                            min="1" 
                            max="50" />
                    </div>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    { message ? (
                        <>
                            <p>{message}</p>
                        </>
                    ) : null}
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetailComponent;
