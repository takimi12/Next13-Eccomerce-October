'use client'


import { CartContextProvider } from "@/hooks/useCart";

interface CartProivderProps {
    children: React.ReactNode;
}


const CartProvider: React.
FC<CartProivderProps> = 
({children}) => {
    return (
        <CartContextProvider>
            {children}
        </CartContextProvider>
    )
}

export default CartProvider;