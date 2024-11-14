import React from 'react';
import { Sidebar } from './sidebar.styles';
import { Avatar, Tooltip } from '@nextui-org/react';
import { CompaniesDropdown } from './companies-dropdown';
import { HomeIcon } from '../icons/sidebar/home-icon';
import { PaymentsIcon } from '../icons/sidebar/payments-icon';
import { AccountsIcon } from '../icons/sidebar/accounts-icon';
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

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
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
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Visión general"
              icon={<HomeIcon />}
              isActive={pathname === '/'}
              href="/"
            />
            <SidebarItem
              title="Canvas"
              icon={<ChangeLogIcon />}
              isActive={pathname === '/canvas'}
              href="/"
            />
            <SidebarMenu title="Roadmap">
              <SidebarItem
                isActive={pathname === '/roadmap/business'}
                title="Negocio"
                icon={<ViewIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === '/roadmap/financial'}
                title="Financiero"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>
            <SidebarMenu title="Artefactos">
              <SidebarItem
                isActive={pathname === '/artifacts/comercial-objetives'}
                title="Objetivos Comerciales"
                icon={<ViewIcon />}
                href="/artifacts/comercial-objetives"
              />
              <SidebarItem
                isActive={pathname === '/artifacts/business'}
                title="Negocio"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === '/artifacts/data'}
                title="Datos"
                icon={<PaymentsIcon />}
              />
              <SidebarItem
                isActive={pathname === '/artifacts/applications'}
                title="Aplicaciones"
                icon={<FilterIcon />}
              />
              <SidebarItem
                isActive={pathname === '/artifacts/technologies'}
                title="Tecnologías"
                icon={<DevIcon />}
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
