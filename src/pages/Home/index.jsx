import { motion } from 'framer-motion';
import Hero from './Hero';
import Stats from './Stats';
import Collections from './Collections';
import Products from './Products';
import Features from './Features';
import About from './About';
import Testimonials from './Testimonials';
import { Newsletter, Footer } from './FooterNewsletter';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .4 }}
    >
      <Hero />
      <Stats />
      <Collections />
      <Products />
      <Features />
      <About />
      <Testimonials />
      <Newsletter />
      <Footer />
    </motion.div>
  );
}
