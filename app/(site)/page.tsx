import { Hero } from "@/components/home/Hero";
import { TrustBand } from "@/components/home/TrustBand";
import { PopularVehicles } from "@/components/home/PopularVehicles";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { getHeroPhoto } from "@/lib/unsplash";

export default async function Home() {
  const heroImage = await getHeroPhoto();

  return (
    <>
      <Hero imageUrl={heroImage} />
      <TrustBand />
      <PopularVehicles />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
