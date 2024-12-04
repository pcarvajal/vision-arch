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
import { Trash2 } from 'lucide-react';

interface DeleteArtifactModalProps {
  onDelete: () => void;
}

export default function DeleteArtifactModal({
  onDelete,
}: DeleteArtifactModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOnDelete = () => {
    onDelete();
    onOpenChange();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="danger"
        aria-label="Delete artifact"
        className="ml-12"
      >
        <Trash2 />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar artefacto
              </ModalHeader>
              <ModalBody>
                Estas seguro de eliminar este artefacto? Esta acción es
                irreversible.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleOnDelete}>
                  Eliminar
                </Button>
                <Button variant="shadow" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
