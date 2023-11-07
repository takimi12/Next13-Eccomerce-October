import HomeBanner from "./components/HomeBanner";
import Container from "./components/container";

export default function Home() {
  return (
    <div className="pb-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
      </Container>
    </div>
  )
}
