import React from 'react'

interface ModalProps {
    open: boolean
    setOpen: (val: boolean) => void
    title: string
    content: React.ReactNode
    onOk?: () => void
    okText?: string
}

const CustomModal: React.FC<ModalProps> = ({
    open,
    setOpen,
    title,
    content,
    onOk,
    okText = 'Ok'
}) => {

    const handleOk = () => {
        if (onOk) onOk()
        else setOpen(false)
    }

    return (
        <div
            className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-200
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpen(false)}
            />

            {/* Modal Box */}
            <div
                className={`
          relative z-10
          w-[95%] sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[35%]
          max-h-[90vh]
          bg-white rounded-xl shadow-xl
          flex flex-col
          transform transition-all duration-200
          ${open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'}
        `}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                     type="button"
                        onClick={() => setOpen(false)}
                        className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto">
                    {content}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleOk}
                        type="button"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        {okText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CustomModal)
