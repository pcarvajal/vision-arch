'use client';

import { logoutAction } from '@/actions/auth.action';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react';
import blankProfile from '../../../public/profile-default.svg';
import { DarkModeSwitch } from './darkmodeswitch';

export const UserDropdown = () => {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            showFallback={blankProfile}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex w-full flex-col items-start justify-start"
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
