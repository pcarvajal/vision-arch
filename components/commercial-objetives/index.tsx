'use client';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { DotsIcon } from '@/components/icons/accounts/dots-icon';
import { ExportIcon } from '@/components/icons/accounts/export-icon';
import { InfoIcon } from '@/components/icons/accounts/info-icon';
import { TrashIcon } from '@/components/icons/accounts/trash-icon';
import { HouseIcon } from '@/components/icons/breadcrumb/house-icon';
import { UsersIcon } from '@/components/icons/breadcrumb/users-icon';
import { SettingsIcon } from '@/components/icons/sidebar/settings-icon';
import CommercialObjetivesFlow from '../flow/CommercialObjetivesFlow';
import NodeProviderSelect from '../flow/NodeProviderSelect';

export const CommercialObjetives = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={'/'}>
            <span>Inicio</span>
          </Link>
          <span> / </span>{' '}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Artefactos</span>
          <span> / </span>{' '}
        </li>
        <li className="flex gap-2">
          <span>Objetivos Comerciales</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            classNames={{
              input: 'w-full',
              mainWrapper: 'w-full',
            }}
            placeholder="Buscar elemento"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <Button color="primary" startContent={<ExportIcon />}>
            Exportar Documento
          </Button>
          <NodeProviderSelect />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <Card>
          <CardBody>
            <CommercialObjetivesFlow />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
