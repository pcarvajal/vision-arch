'use client';

import { getArtifactByYearProjectionAndType } from '@/actions/artifact.actions';
import useUserStore from '@/store/userStore';
import { ArtifactTypes } from '@/types/types';
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
import { ConfirmReplaceArtifactModal } from './ConfirmReplaceArtifactModal';

export default function SaveArtifactModal() {
  const { getNodes } = useReactFlow();
  const { artifactObject } = useUserStore();
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleIsArtifactExist = async () => {
    if (artifactObject?.year) {
      const artifactFinded = await getArtifactByYearProjectionAndType(
        artifactObject?.year,
        artifactObject?.type as ArtifactTypes,
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
  }, [artifactObject]);

  return (
    <>
      <Button
        onPress={handleIsArtifactExist}
        color="success"
        variant="shadow"
        isDisabled={saveButtonDisabled}
      >
        Guardar Artefacto
      </Button>
      {showReplaceModal && (
        <ConfirmReplaceArtifactModal
          onCancel={() => setShowReplaceModal(false)}
          onConfirm={handleReplaceConfirmed}
          isOpen={true}
        />
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Guardar artefacto
              </ModalHeader>
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
