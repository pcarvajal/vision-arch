'use client';

import useUserStore from '@/store/userStore';
import React from 'react';
import { useLockedBody } from '../hooks/useBodyLock';
import { NavbarWrapper } from '../navigation/navbar/navbar';
import { SidebarWrapper } from '../sidebar/sidebar';
import { SidebarContext } from './layout-context';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const company = useUserStore((state) => state.company);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        {company?.id ? <SidebarWrapper /> : null}
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
