import React, { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;          // Controls modal visibility
  onClose: () => void;      // Callback to close the modal
  title?: string;           // Optional modal title
  children: ReactNode;      // Modal body content
  footer?: ReactNode;       // Optional footer content (e.g. buttons)
}

/**
 * Modal component using Headless UI's Dialog for accessible, animated modals.
 * Responsive and keyboard accessible.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  return (
    // Use Transition to animate modal appearance/disappearance
    <Transition appear show={isOpen} as={Fragment}>
      {/* Dialog provides accessibility features */}
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        {/* Container to center modal content vertically and horizontally */}
        <div className="min-h-screen px-4 text-center bg-black bg-opacity-30">
          {/* This invisible element tricks browser into centering modal contents */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Animate modal panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Modal panel: responsive width, padding, rounded corners, shadow */}
            <Dialog.Panel className="inline-block w-full max-w-md p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {/* Optional title */}
              {title && (
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
              )}

              {/* Modal body content */}
              <div className="mt-4">{children}</div>

              {/* Optional footer section for actions (buttons, etc.) */}
              {footer && (
                <div className="mt-6 flex justify-end gap-2">{footer}</div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
