'use client';

import {
  getArtifactByYearProjectionAndType,
  updateArtifactAction,
} from '@/actions/artifact.actions';
import useFlowStore from '@/store/artifactFlowStore';
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
import { toast } from 'sonner';
import { SaveArtifactForm } from '../forms/SaveArtifactForm';
import { ConfirmModal } from './ConfirmModal';

interface SaveArtifactModalProps {
  className?: string;
}

export default function SaveArtifactModal({
  className,
}: SaveArtifactModalProps) {
  const { getNodes } = useReactFlow();
  const artifactFlow = useFlowStore((state) => state);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleIsArtifactExist = async () => {
    if (
      artifactFlow?.params?.year &&
      artifactFlow?.params.type &&
      !artifactFlow.params.id
    ) {
      const artifactFinded = await getArtifactByYearProjectionAndType(
        artifactFlow?.params.year,
        artifactFlow?.params.type,
      );

      if (artifactFinded.data?.artifact) {
        setShowReplaceModal(true);
      } else {
        onOpen();
      }
    }
    if (artifactFlow?.params?.id) {
      setShowUpdateConfirmation(true);
    }
  };

  const handleReplaceConfirmed = () => {
    onOpen();
    setShowReplaceModal(false);
  };

  const handleUpdateConfirmed = async () => {
    if (artifactFlow && artifactFlow.params?.id && artifactFlow.nodes) {
      const result = await updateArtifactAction(
        artifactFlow.params.id,
        JSON.stringify({
          data: artifactFlow.nodes,
          edges: artifactFlow.edges,
          viewport: artifactFlow.viewport,
        }),
      );

      if (result?.response?.type === 'error') {
        toast.error(result.response.message || 'Error actualizando el modelo');
      }

      setShowUpdateConfirmation(false);

      return toast.success('Modelo actualizado correctamente');
    }
  };

  useEffect(() => {
    if (getNodes().length === 0) {
      setSaveButtonDisabled(true);
    } else {
      setSaveButtonDisabled(false);
    }
  }, [artifactFlow]);

  return (
    <div className={className}>
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
      {showUpdateConfirmation && (
        <ConfirmModal
          title="Actualizar"
          message="Vas a actualizar este modelo, ¿estás seguro?"
          onCancel={() => setShowUpdateConfirmation(false)}
          onConfirm={handleUpdateConfirmed}
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
    </div>
  );
}
