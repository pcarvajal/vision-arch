'use client';

import { Sidebar } from './sidebar.styles';
import { Avatar, Tooltip } from '@nextui-org/react';
import { CompaniesDropdown } from './companies-dropdown';
import { HomeIcon } from '../icons/sidebar/home-icon';
import { PaymentsIcon } from '../icons/sidebar/payments-icon';
import { SettingsIcon } from '../icons/sidebar/settings-icon';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { FilterIcon } from '../icons/sidebar/filter-icon';
import { useSidebarContext } from '../layout/layout-context';
import { usePathname } from 'next/navigation';
import { ViewIcon } from '../icons/sidebar/view-icon';
import { ReportsIcon } from '../icons/sidebar/reports-icon';
import { ProductsIcon } from '../icons/sidebar/products-icon';
import { DevIcon } from '../icons/sidebar/dev-icon';
import { ChangeLogIcon } from '../icons/sidebar/changelog-icon';
import { routes } from '@/config/routes';
import useUserStore from '@/store/userStore';

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const user = useUserStore((state) => state.user);
  const companyPath = user?.companyId
    ? `${routes.protected.company}/${user.companyId}`
    : routes.protected.company;

  return (
    <aside className="sticky top-0 z-[20] h-screen">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
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
              icon={<ChangeLogIcon />}
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
              <SidebarItem isActive={pathname === '#'} title="Financiero" icon={<ReportsIcon />} />
            </SidebarMenu>
            <SidebarMenu title="Artefactos">
              <SidebarItem
                isActive={pathname === routes.protected.artifacts.goals}
                title="Objetivos"
                icon={<ViewIcon />}
                href={routes.protected.artifacts.goals}
              />
              <SidebarItem isActive={pathname === '#'} title="Negocio" icon={<ProductsIcon />} />
              <SidebarItem isActive={pathname === '#'} title="Datos" icon={<PaymentsIcon />} />
              <SidebarItem isActive={pathname === '#'} title="Aplicaciones" icon={<FilterIcon />} />
              <SidebarItem isActive={pathname === '#'} title="Tecnologías" icon={<DevIcon />} />
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
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm" />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
