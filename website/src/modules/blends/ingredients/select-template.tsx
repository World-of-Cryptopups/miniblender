import { ISchema, ITemplate, useGetSchemas, useGetTemplates } from '@cryptopuppie/useatomicassets';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';
import { useCreatorBlend } from '../../../contexts/blend-provider';

const SelectTemplateOption = () => {
  const { collection } = useCreatorBlend();

  const [selectedSchema, setSelectedSchema] = useState<ISchema | undefined>(undefined);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | undefined>(undefined);

  const { data: schemas } = useGetSchemas(
    collection ? { collection_name: collection.collection_name } : undefined
  );

  const { data: templates } = useGetTemplates(
    collection && selectedSchema
      ? { collection_name: collection.collection_name, schema_name: selectedSchema.schema_name }
      : undefined
  );

  useEffect(() => {
    if (selectedSchema) {
      // always reset value if schema changes
      setSelectedTemplate(undefined);
    }
  }, [selectedSchema]);

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
        <label htmlFor="collection" className="text-sm text-gray-500 font-medium">
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

      <div className="mt-6 mb-2 flex flex-col">
        <label htmlFor="collection" className="text-sm text-gray-500 font-medium">
          Select a <strong>TEMPLATE</strong>
        </label>
        <Listbox value={selectedTemplate} onChange={setSelectedTemplate}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-gray-700 z-10">
              <span className="block truncate">
                {selectedTemplate
                  ? `(#${selectedTemplate.template_id}) ${selectedTemplate.immutable_data.name}`
                  : 'Select template...'}
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
                {templates?.map((template, templateId) => (
                  <Listbox.Option
                    key={templateId}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                      }`
                    }
                    value={template}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          (#{template.template_id}) {template.immutable_data.name}
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

      <div className="h-72">{/* TODO: preview the nft in here */}</div>

      <div className="text-center">
        <button className="text-sm py-3 px-8 rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white font-medium">
          Create Blend
        </button>
      </div>
    </div>
  );
};

export default SelectTemplateOption;
