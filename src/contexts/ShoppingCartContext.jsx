/*
INSERT COMMENT
*/

import React, { createContext, useContext,  useState } from "react";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({children}) => {
    const [totalItemsCart, setTotalItemsCart] = useState(null);

    const updateCartCount = (count) => {
        setTotalItemsCart(count);
    }

    return (
        <ShoppingCartContext.Provider value={{totalItemsCart, updateCartCount}}>
            {children}
        </ShoppingCartContext.Provider>
    )

}

