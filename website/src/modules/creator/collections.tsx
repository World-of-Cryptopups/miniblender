import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { useGetCollections } from '@cryptopuppie/useatomicassets';
import Image from 'next/image';
import { LinkButton } from '../../components/LinkButton';

const CreatorCollections = () => {
  const { user } = useWaxUser();
  const { data } = useGetCollections(
    user == null ? undefined : { authorized_account: user.wallet }
  );

  return (
    <div className="mt-8">
      {data === undefined ? (
        <p>loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {data.map((c, index) => (
            <LinkButton
              href={`/creator/${c.collection_name}`}
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-200 hover:scale-105 duration-500"
            >
              {c.data.img ? (
                <div className="h-[300px] relative w-full">
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${c.data.img}`}
                    alt={c.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              ) : (
                <div className="h-[300px] bg-gray-50 rounded-t-lg"></div>
              )}

              <div className="p-6">
                <h4 className="font-bold text-lg text-gray-700">{c.collection_name}</h4>

                <h2 className="font-black text-2xl text-indigo-500">{c.name}</h2>
              </div>
            </LinkButton>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorCollections;
