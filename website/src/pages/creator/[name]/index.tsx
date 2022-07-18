import { GetServerSideProps } from 'next';
import CreatorPage from '../../../modules/creator/page';
import { AtomicRawFetchProps } from '../../../typings/rawfetch';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ATOMICASSETS_ENDPOINT}/atomicassets/v1/collections/${name}`
  );
  const data: AtomicRawFetchProps = await res.json();

  if (!data.success) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: data.data
    }
  };
};

export default CreatorPage;
