import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { ICollection } from '@cryptopuppie/useatomicassets/dist/typings/typings/atomicassets-js';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Error from 'next/error';
import { LinkButton } from '../../../components/LinkButton';
import Seo from '../../../components/Seo';
import DefaultLayout from '../../../layouts/Default';
import CollectionPageHeader from './header';

interface CreatorPageProps {
  data: ICollection;
}

const CreatorPage = ({ data }: CreatorPageProps) => {
  const { user } = useWaxUser();

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
      <Seo title={`${data.name} - creator`} />

      <div className="w-5/6 mx-auto mt-16">
        <CollectionPageHeader
          data={data.data}
          collection={data.collection_name}
          name={data.name}
          author={data.author}
        />

        <hr className="my-12" />

        <div className="grid grid-cols-4 gap-6">
          <LinkButton
            href={`/creator/${data.collection_name}/new-blend`}
            className="h-56 border p-6 rounded-lg flex items-center justify-center bg-gray-100 flex-col text-center"
          >
            <PlusCircleIcon className="h-8 w-8 text-gray-700" />
            <span className="text-lg font-bold text-gray-700">add new blend</span>
          </LinkButton>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreatorPage;
