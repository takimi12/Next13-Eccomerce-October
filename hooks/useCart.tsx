import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { 
    createContext, 
    useContext, 
    useState,
     useCallback, 
      useEffect 
    } from "react";
    import {toast } from "react-hot-toast";




type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;

}


export const CartContext = 
createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}


export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);


    useEffect(() => {
    const cartItems = localStorage.getItem('EshopCartitems');
    const cProducts: CartProductType[] | null =  JSON.parse(cartItems) 
    
        setCartProducts(cProducts);

    }, []);


    const handleAddProductToCart = useCallback((product: CartProductType) => [
        setCartProducts((prev) => {
            let updatedCart;

            if(prev) {
                updatedCart = [...prev, product]
            } else{
                updatedCart = [product]
            }

            toast.success("Product added to cart");
            localStorage.setItem('EshopCartitems', JSON.stringify(updatedCart));
            return updatedCart;
        })
    ], []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    };

    return (
    <CartContext.Provider value={value} {...props} />
        );

};

export const useCart = () => {
    const context = useContext(CartContext);
    
    if(context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
}