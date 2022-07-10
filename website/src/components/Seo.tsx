import { NextSeo } from 'next-seo';

type SeoProps = {
  title: string;
  description?: string;
};

const Seo = ({ title, description }: SeoProps) => {
  return (
    <NextSeo
      title={`${title} | World of Cryptopups`}
      description={description}
      openGraph={{
        description
      }}
    />
  );
};

export default Seo;
