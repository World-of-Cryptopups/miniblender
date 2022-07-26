import Image from 'next/image';

interface PreviewNFTProps {
  data?: Record<string, any>;
  style: string;
}

const PreviewNFT = ({ data, style }: PreviewNFTProps) => {
  if (!data) {
    return <></>;
  }

  return (
    <div className={`relative flex items-center justify-center ${style}`}>
      {data.video ? (
        <video autoPlay loop className="absolute object-contain">
          <source src={`https://atomichub-ipfs.com/ipfs/${data.video}`}></source>
        </video>
      ) : (
        <Image
          src={`https://atomichub-ipfs.com/ipfs/${data.img}`}
          alt={data.name}
          layout="fill"
          objectFit="contain"
        />
      )}
    </div>
  );
};

export default PreviewNFT;
