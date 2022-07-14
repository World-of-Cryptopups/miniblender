import { useAuthFunctions } from '@cryptopuppie/next-waxauth';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import BaseModal from '../../components/Modal';
import { IS_DEVELOPMENT } from '../../lib/config';

const AuthModal = () => {
  const { loginWithAnchor, loginWithCloudWallet } = useAuthFunctions();

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="py-2 px-4 rounded-lg bg-indigo-400 hover:bg-indigo-500 duration-300 text-xs text-white inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        connect wallet
      </button>

      <BaseModal isOpen={open} closeModal={closeModal} className="max-w-lg">
        <Dialog.Title as="h3" className="text-center text-xl font-black leading-6 text-gray-700">
          Connect your Wallet
        </Dialog.Title>
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-500">
            Authenticate your wax wallet to continue using the service
          </p>

          <div className="mt-4 flex flex-col w-4/5 mx-auto">
            {IS_DEVELOPMENT ? (
              <></>
            ) : (
              <button
                type="button"
                title="Login with Wax Cloud Wallet"
                onClick={loginWithCloudWallet}
                className="py-4 p-4 rounded-xl my-1 text-sm bg-gray-500 hover:bg-gray-600 text-white duration-300 tracking-normal font-medium"
              >
                login with wax cloud wallet
              </button>
            )}

            <button
              type="button"
              title="Login with Anchor Wallet"
              onClick={loginWithAnchor}
              className="py-4 p-4 rounded-xl my-1 text-sm bg-blue-500 hover:bg-blue-600 text-white duration-300 tracking-normal font-medium"
            >
              login with anchor
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default AuthModal;
