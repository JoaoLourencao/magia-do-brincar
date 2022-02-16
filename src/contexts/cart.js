import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext({
    cart: '',
    totalValue: 0,
    lengthItens: 0,
    addItem: () => {}, 
    removeItem: () => {},
    cleanCart: () => {}
});

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [lengthItens, setLengthValues] = useState(0);
    


    useEffect(() => {
        let value = 0;
        cart.map((item) => {
            let parseItem = parseFloat(item.price);
            value += parseItem;
        });

        setTotalValue(value);
        setLengthValues(Object.keys(cart).length);
    }, [cart]);

    function addItem(item){
        let newCart = cart;

        newCart.push(item);
        setCart([...newCart]);
    }

    function removeItem(index){
        let dataCart = cart;
        dataCart.splice(index, 1);

        setCart([...dataCart]);
    }

    function cleanCart(){
        setCart([]);
    }

    

    return (
        <CartContext.Provider value={{
            cart,
            totalValue,
            lengthItens,
            addItem,
            removeItem,
            cleanCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {
    const context = useContext(CartContext);
    return context;
}