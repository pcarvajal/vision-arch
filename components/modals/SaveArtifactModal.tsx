'use client';

import { getArtifactByYearProjectionAndType } from '@/actions/artifact.actions';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';
import { SaveArtifactForm } from '../forms/SaveArtifactForm';
import { ConfirmModal } from './ConfirmModal';

export default function SaveArtifactModal() {
  const { getNodes } = useReactFlow();
  const { artifactFlow } = useArtifactFlowStore();
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleIsArtifactExist = async () => {
    if (artifactFlow?.year && artifactFlow?.type) {
      const artifactFinded = await getArtifactByYearProjectionAndType(
        artifactFlow?.year,
        artifactFlow?.type,
      );
      if (artifactFinded.length > 0) {
        setShowReplaceModal(true);
      } else {
        onOpen();
      }
    }
  };

  const handleReplaceConfirmed = () => {
    onOpen();
    setShowReplaceModal(false);
  };

  useEffect(() => {
    if (getNodes().length === 0) {
      setSaveButtonDisabled(true);
    } else {
      setSaveButtonDisabled(false);
    }
  }, [artifactFlow]);

  return (
    <>
      <Button
        onPress={handleIsArtifactExist}
        color="success"
        variant="shadow"
        isDisabled={saveButtonDisabled}
      >
        Guardar
      </Button>
      {showReplaceModal && (
        <ConfirmModal
          title="Reemplazar"
          message="Ya existe un artefacto con el mismo año y tipo, ¿desea reemplazarlo?"
          onCancel={() => setShowReplaceModal(false)}
          onConfirm={handleReplaceConfirmed}
          isOpen={true}
        />
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Guardar</ModalHeader>
              <ModalBody>
                <SaveArtifactForm />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
