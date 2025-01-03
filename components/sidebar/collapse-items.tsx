'use client';

import useUserStore from '@/store/userStore';
import { Accordion, AccordionItem } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { ChevronDownIcon } from '../icons/sidebar/chevron-down-icon';

interface item {
  title: string;
  href: string;
}

interface Props {
  icon: React.ReactNode;
  title: string;
  items: item[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  return (
    <div className="flex h-full cursor-pointer items-center gap-4">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: 'data-[open=true]:-rotate-180',
            trigger:
              'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5',

            title:
              'px-0 flex text-base gap-2 h-full items-center cursor-pointer',
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item: item, index: number) => (
              <Link key={index} href={item.href}>
                <span
                  key={index}
                  className="flex w-full text-default-500 transition-colors hover:text-default-900"
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
