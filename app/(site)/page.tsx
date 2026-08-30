import { Hero } from "@/components/home/Hero";
import { TrustBand } from "@/components/home/TrustBand";
import { PopularVehicles } from "@/components/home/PopularVehicles";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { getHeroPhoto } from "@/lib/unsplash";
import { getCarCategories } from "@/lib/categories";

export default async function Home() {
  const [heroImage, carCategories] = await Promise.all([getHeroPhoto(), getCarCategories()]);

  return (
    <>
      <Hero imageUrl={heroImage} carCategories={carCategories} />
      <TrustBand />
      <PopularVehicles />
      <HowItWorks />
      <Testimonials />
      <Faq />
    </>
  );
}
