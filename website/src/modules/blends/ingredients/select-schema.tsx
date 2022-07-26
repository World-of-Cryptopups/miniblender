import { ISchema, useGetSchemas } from '@cryptopuppie/useatomicassets';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { useCreatorBlend } from '../../../contexts/blend-provider';
import { IngredientProps } from '../ingredients';
import { useBlendProvider } from '../provider';

const SelectSchemaOption = () => {
  const { collection } = useCreatorBlend();
  const { dispatchIngredients } = useBlendProvider();

  const [selectedSchema, setSelectedSchema] = useState<ISchema | undefined>(undefined);

  const { data: schemas } = useGetSchemas(
    collection ? { collection_name: collection.collection_name } : undefined
  );

  const addIngredient = () => {
    if (!selectedSchema) return;

    const ingredient: IngredientProps = {
      type: 'schema',
      schema: selectedSchema.schema_name
    };

    dispatchIngredients({ type: 'add', data: ingredient });
  };

  return (
    <div>
      <div className="my-2 flex flex-col">
        <label htmlFor="collection" className="text-sm text-gray-500 font-medium mb-1">
          Collection
        </label>
        <input
          type="text"
          name="collection"
          className="border px-3 py-2 text-sm rounded-md disabled:bg-gray-200 text-gray-600"
          disabled
          defaultValue={collection?.collection_name}
        />
      </div>

      <div className="my-2 flex flex-col">
        <label htmlFor="schema" className="text-sm text-gray-500 font-medium">
          Schema
        </label>
        <Listbox value={selectedSchema} onChange={setSelectedSchema}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-gray-700 z-10">
              <span className="block truncate">
                {selectedSchema ? selectedSchema.schema_name : 'Select schema...'}
              </span>
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
              <Listbox.Options className="absolute mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                {schemas?.map((schema, schemaId) => (
                  <Listbox.Option
                    key={schemaId}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                      }`
                    }
                    value={schema}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {schema.schema_name}
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

      <div className="h-72 flex items-center justify-center">
        {selectedSchema ? (
          <div className="h-56 w-56 border rounded-lg flex items-center justify-center text-center shadow-xl bg-gray-100">
            <p className="p-6 text-gray-700 text-sm">
              Any NFT in <strong className="underline">{selectedSchema?.schema_name}</strong> schema
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={addIngredient}
          className="text-sm py-3 px-8 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white font-medium"
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default SelectSchemaOption;
