import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from '@nextui-org/react';
import React, { useCallback } from 'react';
import { DarkModeSwitch } from './darkmodeswitch';
import { useRouter } from 'next/navigation';
import { deleteAuthCookie } from '@/actions/auth.action';

export const UserDropdown = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace('/login');
  }, [router]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Registrado como</p>
          <p>pcarvajal@copec.cl</p>
        </DropdownItem>
        <DropdownItem key="settings">Mis preferencias</DropdownItem>
        <DropdownItem key="team_settings">Opciones del team</DropdownItem>
        <DropdownItem key="analytics">Analitica</DropdownItem>
        <DropdownItem key="system">Sistema</DropdownItem>
        <DropdownItem key="configurations">Configuración</DropdownItem>
        <DropdownItem key="help_and_feedback">Ayuda</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Salir
        </DropdownItem>
        <DropdownItem key="switch" className="flex flex-row items-center">
          <DarkModeSwitch /> Cambiar tema
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
