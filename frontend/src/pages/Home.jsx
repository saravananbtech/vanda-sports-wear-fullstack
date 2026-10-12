import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/hero/Hero.jsx';
import VDivider from '../components/common/VDivider.jsx';
import WhyChooseUs from '../components/hero/WhyChooseUs.jsx';
import CategoryGrid from '../components/cards/CategoryGrid.jsx';
import NewArrivals from '../components/products/NewArrivals.jsx';
import BestSellers from '../components/products/BestSellers.jsx';
import Counters from '../components/hero/Counters.jsx';
import PromoBanner from '../components/hero/PromoBanner.jsx';
import JerseyTeaser from '../components/hero/JerseyTeaser.jsx';
import Testimonials from '../components/hero/Testimonials.jsx';
import Newsletter from '../components/hero/Newsletter.jsx';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the page a tick to render before scrolling to the section.
      const id = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [hash]);

  return (
    <div id="homePage">
      <Hero />
      <VDivider />
      <WhyChooseUs />
      <CategoryGrid />
      <NewArrivals />
      <BestSellers />
      <Counters />
      <PromoBanner />
      <JerseyTeaser />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
