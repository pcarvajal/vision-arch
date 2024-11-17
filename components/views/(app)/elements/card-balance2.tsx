import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Community } from '../../../icons/community';

export const CardBalance2 = () => {
  return (
    <Card className="w-full rounded-xl bg-default-50 px-3 shadow-md xl:max-w-sm">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Tasa de cumplimiento</span>
            <span className="text-xs text-default-900">Copec</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div className="space-x-2">
              <span className="text-xl font-semibold text-success">{'↑'}</span>
              <span className="text-xl text-default-900">Hecho: 10.00%</span>
            </div>
          </div>

          <div>
            <div className="space-x-2">
              <span className="text-xl font-semibold text-danger">{'↓'}</span>
              <span className="text-xl text-default-900">Pendiente: 90.00%</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
