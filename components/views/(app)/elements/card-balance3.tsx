import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Community } from '../../../icons/community';

interface CardBalance3Props {
  classname?: string;
}

export const CardBalance3 = () => {
  return (
    <Card className="w-full rounded-xl bg-success px-3 shadow-md xl:max-w-sm">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Gastos / Presupuesto</span>
            <span className="text-xs text-white">Copec</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <div className="space-x-2">
              <span className="text-normal text-xl font-semibold">{'↑'}</span>
              <span className="text-xl text-white">Restante: 60.00%</span>
            </div>
          </div>
          <div>
            <div className="space-x-2">
              <span className="text-xl font-semibold text-danger">{'↓'}</span>
              <span className="text-xl text-white">Gastado: 40.00%</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
