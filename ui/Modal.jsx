'use client'
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button } from './Button'
import { dc } from '@/utils/dynamic-classes'

export function Modal({
  theme = 'primary',
  title,
  description,
  disabled,
  children,
  content,
  cancelTxt,
  confirmTxt,
  closeModalOnConfirm = true,
  noControl = false,
  onConfirm,
  onCancel,
  size = 'sm',
  isConfirmDisabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = async () => {
    await onConfirm?.()
    if (closeModalOnConfirm) setIsOpen(false)
  }

  const handleCancel = async () => {
    await onCancel?.()
    setIsOpen(false)
  }

  return (
    <>
      <div
        className="w-full cursor-pointer"
        onClick={() => {
          if (!disabled) setIsOpen(true)
        }}
      >
        {children}
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-10 focus:outline-none"
          style={{ zIndex: '900' }}
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-filter backdrop-blur-sm ">
                <div className="fixed inset-0 bg-base-primary opacity-10" />
              </div>
            </TransitionChild>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={dc(
                  'z-[999] space-y-4 bg-mo-bg border-2 rounded-md p-4 flex flex-col justify-between min-h-32 mx-3 shadow-lg max-h-[calc(100vh-8rem)]',
                  [theme === 'primary', 'border-mo-primary'],
                  [theme === 'danger', 'border-mo-warning'],
                  [size === 'lg', 'h-min w-2/3']
                )}
              >
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                  <div className="flex flex-col sticky top-0 left-0 z-[4] bg-base-bg">
                    {title && (
                      <DialogTitle
                        className={dc(
                          'font-bold text-xl text-center',
                          [theme === 'primary', 'text-mo-primary'],
                          [theme === 'danger', 'text-mo-warning']
                        )}
                      >
                        {title}
                      </DialogTitle>
                    )}
                    {description && (
                      <Description className="italic opacity-75">
                        {description}
                      </Description>
                    )}
                  </div>
                  {content}
                </div>
                {!noControl ? (
                  <div className="flex gap-2 justify-end pt-3">
                    <Button onClick={handleCancel} theme="secondary">
                      {cancelTxt || 'annuler'}
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      theme="valid"
                      disabled={isConfirmDisabled}
                    >
                      {confirmTxt || 'confirmer'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-4 justify-end pt-3">
                    <Button
                      onClick={handleConfirm}
                      theme="primary-inverse"
                      disabled={isConfirmDisabled}
                    >
                      {confirmTxt || 'fermer'}
                    </Button>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
