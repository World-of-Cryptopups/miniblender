const SECRET_TOKEN = process.env.SECRET_TOKEN ?? '';
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT ?? '';
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ?? '';

const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true';

export { SECRET_TOKEN, IS_DEVELOPMENT, ENDPOINT, CHAIN_ID };
