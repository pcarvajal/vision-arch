import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Community } from '../icons/community';

interface CardBalance3Props {
  classname?: string;
}

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Gastos / Presupuesto</span>
            <span className="text-white text-xs">Copec</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <div className="space-x-2">
              <span className="font-semibold text-normal text-xl">{'↑'}</span>
              <span className="text-xl text-white">Restante: 60.00%</span>
            </div>
          </div>
          <div>
            <div className="space-x-2">
              <span className="font-semibold text-danger text-xl">{'↓'}</span>
              <span className="text-xl text-white">Gastado: 40.00%</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
