'use client';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { DotsIcon } from '@/components/icons/accounts/dots-icon';
import { ExportIcon } from '@/components/icons/accounts/export-icon';
import { InfoIcon } from '@/components/icons/accounts/info-icon';
import { TrashIcon } from '@/components/icons/accounts/trash-icon';
import { UsersIcon } from '@/components/icons/breadcrumb/users-icon';
import { SettingsIcon } from '@/components/icons/sidebar/settings-icon';
import GoalsFlow from '@/components/flows/GoalsFlow';
import GoalsProviderSelect from '@/components/flows/providers/GoalsProviderSelect';
import { routes } from '@/config/routes';
import { Atom, Goal, HouseIcon, icons } from 'lucide-react';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import PageToolbar from '@/components/pages/PageToolbar';

const goalsBreadcrumb = [
  {
    name: 'Inicio',
    link: routes.protected.index,
    icon: <HouseIcon className="text-sm text-foreground-500" />,
  },
  {
    name: 'Artefactos',
    icon: <Atom className="text-sm text-foreground-500" />,
  },
  {
    name: 'Objetivos',
    link: routes.protected.artifacts.goals,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const GoalsView = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={goalsBreadcrumb} />

      <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageToolbar>
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
        </PageToolbar>
        <div className="flex flex-row flex-wrap gap-3.5">
          <Button color="primary" startContent={<ExportIcon />} variant="shadow">
            Exportar Documento
          </Button>
          <GoalsProviderSelect />
        </div>
      </div>
      <div className="mx-auto w-full">
        <Card>
          <CardBody className="flex h-full w-screen overflow-hidden">
            <GoalsFlow />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
