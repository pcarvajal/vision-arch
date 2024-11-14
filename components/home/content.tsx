'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CardBalance1 } from './card-balance1';
import { CardBalance2 } from './card-balance2';
import { CardBalance3 } from './card-balance3';

const Chart = dynamic(
  () => import('../charts/steam').then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

const PieChart = dynamic(() => import('../charts/PieChart'), {
  ssr: false,
});

const HorizontalBarChart = dynamic(
  () => import('../charts/HorizontalBarChart'),
  {
    ssr: false,
  }
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex flex-col gap-4 px-4 xl:flex-row">
      {/* left column */}
      <div className="mt-6 gap-6 flex flex-col w-full basis-4/5">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-xl font-semibold">Resumen</h3>
          <div className="grid xl:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <CardBalance1 />
            <CardBalance2 />
            <CardBalance3 />
          </div>
        </div>
        {/* Chart */}
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Comparativa de Desempeño</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Chart />
          </div>
        </div>
      </div>
      {/* right column */}
      <div className="mt-6 gap-6 flex flex-col w-full basis-1/5">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-xl font-semibold">ROI de Proyectos</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 flex justify-center">
            <PieChart />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-xl font-semibold">Rendimiento Proyectos</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 flex justify-center">
            <HorizontalBarChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);
