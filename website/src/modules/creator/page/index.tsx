import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { ICollection, useGetCollectionName } from '@cryptopuppie/useatomicassets';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Seo from '../../../components/Seo';
import CreatorBlendProvider from '../../../contexts/blend-provider';
import DefaultLayout from '../../../layouts/Default';
import NewBlendModal from '../../blends/new';
import CollectionPageHeader from './header';

interface CreatorPageProps {
  data: ICollection;
}

const CreatorPage = ({ data: iData }: CreatorPageProps) => {
  const router = useRouter();
  const { name } = router.query;

  const { user } = useWaxUser();
  const { data } = useGetCollectionName(Array.isArray(name) ? name.join('') : name, {
    initialData: iData
  });

  if (!data) {
    return <></>;
  }

  if (!data.authorized_accounts.includes(user?.wallet ?? '')) {
    return (
      <DefaultLayout>
        <Error statusCode={403} />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <CreatorBlendProvider collection={data}>
        <Seo title={`${data.name} - creator`} />

        <div className="w-5/6 mx-auto mt-16">
          <CollectionPageHeader />

          <hr className="my-12" />

          <div className="grid grid-cols-4 gap-6">
            <NewBlendModal />
          </div>
        </div>
      </CreatorBlendProvider>
    </DefaultLayout>
  );
};

export default CreatorPage;
