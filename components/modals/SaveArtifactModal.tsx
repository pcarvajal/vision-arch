'use client';

import {
  getArtifactByYearProjectionAndType,
  updateArtifactAction,
} from '@/actions/artifact.actions';
import useFlowStore from '@/store/flowStore';
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
  const { nodes, edges, params } = useFlowStore((state) => state);
  const { getViewport } = useReactFlow();
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleIsArtifactExist = async () => {
    if (params?.year && params.type && !params.id) {
      const artifactFinded = await getArtifactByYearProjectionAndType(
        params.year,
        params.type,
      );

      if (artifactFinded.data?.artifact) {
        setShowReplaceModal(true);
      } else {
        onOpen();
      }
    }
    if (params?.id) {
      setShowUpdateConfirmation(true);
    }
  };

  const handleReplaceConfirmed = () => {
    onOpen();
    setShowReplaceModal(false);
  };

  const handleUpdateConfirmed = async () => {
    if (params?.id && nodes.length > 0) {
      const result = await updateArtifactAction(
        params.id,
        JSON.stringify({
          data: nodes,
          edges: edges,
          viewport: getViewport(),
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
    if (nodes.length === 0) {
      setSaveButtonDisabled(true);
    } else {
      setSaveButtonDisabled(false);
    }
  }, [nodes]);

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
