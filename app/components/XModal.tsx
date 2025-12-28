import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface ModalProps {
    open: boolean
    setOpen: any,
    title: string
    content: any
}
const XModal: React.FC<ModalProps> = (props) => {
    const { open, setOpen, title, content } = props

    const [modal2Open, setModal2Open] = useState(false);

    return (
        <>


            <Modal
                title={title ?? ''}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >
                {content ?? ''}
            </Modal>
        </>
    );
};

export default XModal;