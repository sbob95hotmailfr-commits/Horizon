import { Hero } from "@/components/home/Hero";
import { PopularVehicles } from "@/components/home/PopularVehicles";
import { getHeroPhoto } from "@/lib/unsplash";

export default async function Home() {
  const heroImage = await getHeroPhoto();

  return (
    <>
      <Hero imageUrl={heroImage} />
      <PopularVehicles />
    </>
  );
}
