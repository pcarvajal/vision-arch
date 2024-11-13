import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Community } from '../icons/community';

export const CardBalance1 = () => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Productividad</span>
            <span className="text-white text-xs">Copec</span>
          </div>
        </div>
        {/*         <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">Hecho</span>
          <span className="text-success text-xs">+ 4.5%</span>
        </div> */}
        <div className="flex items-center gap-6">
          <div>
            <div className="space-x-2">
              <span className="font-semibold text-success text-xl">{'↑'}</span>
              <span className="text-xl  text-white">Hecho: 41.67%</span>
            </div>
          </div>

          <div>
            <div className="space-x-2">
              <span className="font-semibold text-danger text-xl ">{'↓'}</span>
              <span className="text-xl  text-white">Pendiente: 58.33%</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
