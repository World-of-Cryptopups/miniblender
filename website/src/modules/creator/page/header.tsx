import Image from 'next/image';

interface CollectionPageHeaderProps {
  collection: string;
  name: string;
  author: string;
  data: Record<string, any>;
}

const CollectionPageHeader = ({ data, collection, name, author }: CollectionPageHeaderProps) => {
  return (
    <div className="inline-flex items-center">
      <div className="relative h-56 w-56 border rounded-lg">
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${data.img}`}
          layout="fill"
          alt="name"
          className="rounded-lg"
        />
      </div>

      <div className="ml-6">
        <h4 className="text-lg font-medium text-gray-500 mb-2">{collection}</h4>
        <h2 className="text-4xl font-black text-gray-700">{name}</h2>

        <p className="ml-4 text-gray-400 mt-4 text-sm font-medium">@{author}</p>
      </div>
    </div>
  );
};

export default CollectionPageHeader;
