'use client';

import { routes } from '@/config/routes';
import useUserStore from '@/store/userStore';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import Link from 'next/link';
import { AcmeIcon } from '../icons/acme-icon';
import { BottomIcon } from '../icons/sidebar/bottom-icon';

export const CompaniesDropdown = () => {
  const company = useUserStore((state) => state.company);
  return (
    <>
      <Link
        className="flex w-full flex-col items-center justify-center"
        href={routes.protected.company}
      >
        <Button className="block" color="primary">
          Crear Compañia
        </Button>
      </Link>
      ) : (
      <Dropdown
        classNames={{
          base: 'w-full min-w-[260px]',
        }}
      >
        <DropdownTrigger className="cursor-pointer">
          <div className="flex items-center gap-2">
            <AcmeIcon />
            <div className="flex flex-col gap-4">
              <h3 className="m-0 -mb-4 whitespace-nowrap text-xl font-medium text-default-900">
                {company?.name}
              </h3>
              <span className="text-xs font-medium text-default-500">
                Santiago, Chile
              </span>
            </div>
            <BottomIcon />
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection title="Compañias">
            <DropdownItem
              key="1"
              startContent={<AcmeIcon />}
              description="Santiago, Chile"
              classNames={{
                base: 'py-4',
                title: 'text-base font-semibold',
              }}
            >
              {company?.name}
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      )
    </>
  );
};
