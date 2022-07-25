import { Dialog } from '@headlessui/react';
import { BeakerIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import BaseModal from '../../components/Modal';
import NewBlendFormContainer from './form';

interface NewBlendModalProps {
  collection: string;
  name: string;
}

const NewBlendModal = ({ collection, name }: NewBlendModalProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="h-56 border p-6 rounded-lg flex items-center justify-center bg-gray-100 flex-col text-center"
      >
        <PlusCircleIcon className="h-8 w-8 text-gray-700" />
        <span className="text-lg font-bold text-gray-700">add new blend</span>
      </button>

      <BaseModal className="max-w-6xl" isOpen={open} closeModal={closeModal}>
        <Dialog.Title
          as="h3"
          className="leading-6 inline-flex items-center text-xl font-bold text-gray-700"
        >
          <BeakerIcon className="h-7 w-7 mr-2" />
          Create New Blend
        </Dialog.Title>

        <hr className="my-8" />

        <NewBlendFormContainer />
      </BaseModal>
    </>
  );
};

export default NewBlendModal;
