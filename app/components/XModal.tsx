import React from 'react'
import { Modal } from 'antd'

interface ModalProps {
  open: boolean
  setOpen: (val: boolean) => void
  title: string
  content: React.ReactNode
  onOk?: () => void
  okText?: string
}

const XModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  title,
  content,
  onOk,
  okText
}) => {

  const handleOk = () => {
    if (onOk) onOk()
    else setOpen(false)
  }

  return (
    <Modal
      title={title}
      centered
      open={open}
      okText={okText || 'Ok'}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      destroyOnHidden
      forceRender={false}
    >
      {content}
    </Modal>
  )
}

export default React.memo(XModal)
