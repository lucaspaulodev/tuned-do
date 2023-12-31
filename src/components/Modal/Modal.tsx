import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import './styles.scss'
import { ReactNode } from 'react';

interface ModalDTO {
    trigger: ReactNode;
    title: string;
    description: string;
    children: ReactNode;
}

export const Modal = ({trigger, title, description, children}: ModalDTO) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
                {description ? (
                    <Dialog.Description className="DialogDescription">
                        {description}
                    </Dialog.Description>
                ) : null}
                {children}
                <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                    <X size={20}/>
                </button>
                </Dialog.Close>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}