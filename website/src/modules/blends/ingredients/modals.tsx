import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, PlusIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import BaseModal from '../../../components/Modal';
import SelectAttributesOption from './select-attributes';
import SelectSchemaOption from './select-schema';
import SelectTemplateOption from './select-template';

const options = [
  {
    id: 'template',
    name: 'Select NFT Template'
  },
  {
    id: 'schema',
    name: 'Any NFT from a Schema'
  },
  {
    id: 'attributes',
    name: 'NFT with the Attributes'
  }
];

const IngredientsModal = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: string; name: string }>(options[0]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center flex-col justify-center h-72 w-56 mx-auto border rounded-lg p-6 bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 text-sm"
      >
        <PlusIcon className="h-6 w-6 mb-1" />
        add new ingredient
      </button>

      <BaseModal className="max-w-xl" isOpen={open} closeModal={closeModal}>
        <div className="flex items-center justify-between">
          <Dialog.Title as="h4" className="text-lg font-bold text-gray-600">
            Add Ingredient
          </Dialog.Title>

          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                  {options.map((option, opId) => (
                    <Listbox.Option
                      key={opId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="py-4 px-6">
          {selected.id === 'template' ? (
            <SelectTemplateOption />
          ) : selected.id === 'schema' ? (
            <SelectSchemaOption />
          ) : selected.id === 'attributes' ? (
            <SelectAttributesOption />
          ) : (
            <></>
          )}
        </div>
      </BaseModal>
    </>
  );
};

export default IngredientsModal;
