import { Dialog } from '@headlessui/react';
import { BeakerIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import BaseModal from '../../components/Modal';
import CreateBlendButton from './create-blend';
import NewBlendFormContainer from './form';
import BlendProvider from './provider';
import BlendSettingsButton from './settings/button';

const NewBlendModal = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <BlendProvider>
      <button
        type="button"
        onClick={openModal}
        className="h-56 border p-6 rounded-lg flex items-center justify-center bg-gray-100 flex-col text-center"
      >
        <PlusCircleIcon className="h-8 w-8 text-gray-700" />
        <span className="text-lg font-bold text-gray-700">add new blend</span>
      </button>

      <BaseModal className="max-w-6xl" isOpen={open} closeModal={closeModal}>
        <div className="flex items-center justify-between">
          <Dialog.Title
            as="h3"
            className="leading-6 inline-flex items-center text-xl font-bold text-gray-700"
          >
            <BeakerIcon className="h-7 w-7 mr-2" />
            Create New Blend
          </Dialog.Title>

          <div className="inline-flex items-center">
            <BlendSettingsButton />

            <CreateBlendButton />
          </div>
        </div>

        <hr className="my-8" />

        <NewBlendFormContainer />
      </BaseModal>
    </BlendProvider>
  );
};

export default NewBlendModal;
