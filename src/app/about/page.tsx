// pages/about.js
import Layout from '@/app/ui/components/Layout';

export default function About() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg">
        Welcome to our website. We are dedicated to providing you with the best
        service possible. Our team is passionate about our work, and we strive
        to deliver high-quality results.
      </p>
      <p className="text-lg mt-4">
        Our mission is to help our clients achieve their goals through
        innovative solutions and expert advice. We believe in building strong
        relationships with our clients based on trust and mutual respect.
      </p>
      <p className="text-lg mt-4">
        Thank you for choosing us. We look forward to working with you!
      </p>
    </Layout>
  );
}
