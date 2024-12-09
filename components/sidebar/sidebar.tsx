'use client';

import { routes } from '@/config/routes';
import useUserStore from '@/store/userStore';
import { Avatar, Tooltip } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { BalanceIcon } from '../icons/sidebar/balance-icon';
import { FilterIcon } from '../icons/sidebar/filter-icon';
import { HomeIcon } from '../icons/sidebar/home-icon';
import { PaymentsIcon } from '../icons/sidebar/payments-icon';
import { ProductsIcon } from '../icons/sidebar/products-icon';
import { ReportsIcon } from '../icons/sidebar/reports-icon';
import { SettingsIcon } from '../icons/sidebar/settings-icon';
import { ViewIcon } from '../icons/sidebar/view-icon';
import { useSidebarContext } from '../layout/layout-context';
import { CollapseItems } from './collapse-items';
import { CompaniesDropdown } from './companies-dropdown';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { Sidebar } from './sidebar.styles';

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const company = useUserStore((state) => state.company);

  const companyPath = company?.$id
    ? `${routes.protected.company}/${company.$id}`
    : routes.protected.company;

  return (
    <aside className="sticky top-0 z-[20] h-screen">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Visión general"
              icon={<HomeIcon />}
              isActive={pathname === routes.protected.index}
              href={routes.protected.index}
            />
            <SidebarItem
              title="Compañia"
              icon={<BalanceIcon />}
              isActive={pathname === companyPath}
              href={companyPath}
            />
            <SidebarMenu title="Roadmap">
              <SidebarItem
                isActive={pathname === '#'}
                title="Negocio"
                icon={<ViewIcon />}
                href="#"
              />
              <SidebarItem
                isActive={pathname === '#'}
                title="Financiero"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>
            <SidebarMenu title="Artefactos">
              <CollapseItems
                title="Objetivos"
                items={[
                  {
                    title: 'Crear',
                    href: routes.protected.artifacts.goals.create,
                  },
                  {
                    title: 'Actualizar',
                    href: routes.protected.artifacts.goals.edit,
                  },
                  {
                    title: 'Visualizar',
                    href: routes.protected.artifacts.goals.visualize,
                  },
                ]}
                icon={<ViewIcon />}
              />
              <CollapseItems
                title="Conceptos"
                icon={<ProductsIcon />}
                items={[
                  {
                    title: 'Crear',
                    href: routes.protected.artifacts.blueprints.create,
                  },
                  {
                    title: 'Actualizar',
                    href: routes.protected.artifacts.blueprints.edit,
                  },
                  {
                    title: 'Visualizar',
                    href: routes.protected.artifacts.blueprints.visualize,
                  },
                ]}
              />
              <CollapseItems
                title="CSVLOD"
                icon={<PaymentsIcon />}
                items={[
                  {
                    title: 'Crear',
                    href: routes.protected.artifacts.csvlod.create,
                  },
                  {
                    title: 'Editar',
                    href: routes.protected.artifacts.csvlod.edit,
                  },
                  {
                    title: 'Visualizar',
                    href: routes.protected.artifacts.csvlod.visualize,
                  },
                ]}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={'Preferencias'} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Ajustes'} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Perfil'} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
