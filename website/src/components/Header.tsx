import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { LinkButton } from './LinkButton';

const Header = () => {
  return (
    <header className="py-4 w-11/12 mx-auto">
      <nav className="flex items-center justify-between">
        <h1 className="text-indigo-500 text-xl font-black">miniblender</h1>

        <ul className="text-sm inline-flex items-center">
          <li className="font-medium text-gray-700 hover:text-indigo-500 hover:underline">
            <LinkButton href="/">Blends</LinkButton>
          </li>

          <li className="ml-16">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-indigo-400 hover:bg-indigo-500 duration-300 px-4 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  @ wallet
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-indigo-200 hover:text-indigo-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-xs duration-100`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
