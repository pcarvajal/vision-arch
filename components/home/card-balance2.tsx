import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Community } from '../icons/community';

export const CardBalance2 = () => {
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">Tasa de cumplimiento</span>
            <span className="text-default-900 text-xs">Copec</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div className="space-x-2">
              <span className="font-semibold text-success text-xl">{'↑'}</span>
              <span className="text-xl  text-default-900">Hecho: 10.00%</span>
            </div>
          </div>

          <div>
            <div className="space-x-2">
              <span className="font-semibold text-danger text-xl ">{'↓'}</span>
              <span className="text-xl  text-default-900">
                Pendiente: 90.00%
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
