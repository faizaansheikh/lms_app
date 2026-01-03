import React from 'react';
import {  Modal } from 'antd';

interface ModalProps {
    open: boolean
    setOpen: any,
    title: string
    content: any,
    onOk: any,
    okText: string
}
const XModal: React.FC<ModalProps> = (props) => {
    const { open, setOpen, title, content, onOk, okText } = props
    return (
        <>


            <Modal
                title={title ?? ''}
                centered
                okText={okText}
                open={open}
                onOk={onOk}
                onCancel={() => setOpen(false)}
                // width={{
                //     xs: '90%',
                //     sm: '80%',
                //     md: '50%',
                //     lg: '50%',
                //     xl: '40%',
                //     xxl: '40%',
                // }}
            >
                {content ?? ''}
            </Modal>
        </>
    );
};

export default XModal;