'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CardBalance1 } from '@/components/views/(app)/elements/card-balance1';
import { CardBalance2 } from '@/components/views/(app)/elements/card-balance2';
import { CardBalance3 } from '@/components/views/(app)/elements/card-balance3';

const Chart = dynamic(() => import('../../charts/steam').then((mod) => mod.Steam), {
  ssr: false,
});

const PieChart = dynamic(() => import('../../charts/PieChart'), {
  ssr: false,
});

const HorizontalBarChart = dynamic(() => import('../../charts/HorizontalBarChart'), {
  ssr: false,
});

export const HomeView = () => (
  <div className="h-full lg:px-6">
    <div className="flex flex-col gap-4 px-4 xl:flex-row">
      {/* left column */}
      <div className="mt-6 flex w-full basis-4/5 flex-col gap-6">
        {/* Card Section Top */}
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-xl font-semibold">Resumen</h3>
          <div className="grid w-full grid-cols-1 justify-center gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <CardBalance1 />
            <CardBalance2 />
            <CardBalance3 />
          </div>
        </div>
        {/* Chart */}
        <div className="flex h-full flex-col gap-2">
          <h3 className="text-xl font-semibold">Comparativa de Desempeño</h3>
          <div className="w-full rounded-2xl bg-default-50 p-6 shadow-lg">
            <Chart />
          </div>
        </div>
      </div>
      {/* right column */}
      <div className="mt-6 flex w-full basis-1/5 flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-xl font-semibold">ROI de Proyectos</h3>
          <div className="flex w-full justify-center rounded-2xl bg-default-50 p-6 shadow-lg">
            <PieChart />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <h3 className="text-xl font-semibold">Rendimiento Proyectos</h3>
          <div className="flex w-full justify-center rounded-2xl bg-default-50 p-6 shadow-lg">
            <HorizontalBarChart />
          </div>
        </div>
      </div>
    </div>
  </div>
);
