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
import { AddUser } from './add-user';
import Canvas from '@/components/commercial-objetives/Canvas';

export const CommercialObjetives = () => {
  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
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
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
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
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
          <Button color="primary" startContent={<ExportIcon />}>
            Exportar Documento
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <Card>
          <CardBody>
            <Canvas />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
