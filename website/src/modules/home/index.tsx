import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';

const HomePage = () => {
  return (
    <DefaultLayout>
      <Seo title="Miniblender - Simple blending service" />

      <div className="w-4/5 mx-auto py-24">
        <h2 className="text-6xl text-indigo-500 font-black">miniblender</h2>
        <p className="text-2xl text-gray-700 font-medium mt-2">
          A simple NFT blending service for WAX
        </p>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
