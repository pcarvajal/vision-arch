'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

interface ConfirmReplaceArtifactModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const ConfirmReplaceArtifactModal = ({
  onCancel,
  onConfirm,
  isOpen,
}: ConfirmReplaceArtifactModalProps) => {
  const handleOnCancel = () => {
    onCancel();
  };

  const handleOnConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Advertencia
            </ModalHeader>
            <ModalBody>
              <p>
                Ya tienes una proyección para el año seleccionado. Si continuas,
                la proyección actual será reemplazada.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleOnCancel}>
                Cerrar
              </Button>
              <Button color="primary" onPress={handleOnConfirm}>
                Continuar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
