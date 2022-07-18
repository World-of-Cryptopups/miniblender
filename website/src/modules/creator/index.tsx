import { useWaxUser } from '@cryptopuppie/next-waxauth';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';
import CreatorCollections from './collections';

const CreatorPage = () => {
  const { isLoggedIn } = useWaxUser();

  return (
    <DefaultLayout>
      <Seo title="Atomichub Creator Collections" />

      <div className="w-4/5 mx-auto mt-16">
        <h3 className="text-gray-600">Your authorized collections...</h3>

        {isLoggedIn ? <CreatorCollections /> : <></>}
      </div>
    </DefaultLayout>
  );
};

export default CreatorPage;
