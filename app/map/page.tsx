import PropertyMap from '../components/PropertyMap';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MapPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <PropertyMap />
      </div>
      <Footer />
    </main>
  );
}

