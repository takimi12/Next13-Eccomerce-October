import { products } from "@/utils/products";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/container";
import { truncateText } from "@/utils/truncateText";

export default function Home() {
  return (
    <div className="pb-8">
      <Container>
        <div>
          <HomeBanner />
        {products.map((product: any) => {
          return <div key={product.id}>{truncateText(product.name)}</div>;
        })}
        
        </div>
      </Container>
    </div>
  )
}
