import { product } from "@/utils/product";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/container";


interface IPrams {
    productId: string;
    
}

const Product = ({params} : {params:IPrams}) => {
    // console.log("params", params);

    return (
        <div className="p-8">
            <Container>
            <ProductDetails product={product}/> 
            </Container>
        </div>

      );
}
 
export default Product;