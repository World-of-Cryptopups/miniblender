import Image from 'next/image';
import { useCreatorBlend } from '../../../contexts/blend-provider';

const CollectionPageHeader = () => {
  const { collection } = useCreatorBlend();

  return (
    <div className="inline-flex items-center">
      <div className="relative h-56 w-56 border rounded-lg">
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${collection?.data.img}`}
          layout="fill"
          alt="name"
          className="rounded-lg"
        />
      </div>

      <div className="ml-6">
        <h4 className="text-lg font-medium text-gray-500 mb-2">{collection?.collection_name}</h4>
        <h2 className="text-4xl font-black text-gray-700">{collection?.name}</h2>

        <p className="ml-4 text-gray-400 mt-4 text-sm font-medium">@{collection?.author}</p>
      </div>
    </div>
  );
};

export default CollectionPageHeader;
