'use client';

import { logoutAction } from '@/actions/auth.action';
import useFlowStore from '@/store/flow/flowStore';
import useUserStore from '@/store/user/userStore';
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
  const user = useUserStore((state) => state.user);
  const clearUserStore = useUserStore((state) => state.clearPersistedStore);
  const clearFlowStore = useFlowStore((state) => state.clearPersistedStore);
  const handleLogout = async () => {
    await logoutAction();
    clearUserStore();
    clearFlowStore();
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
      <DropdownMenu aria-label="User menu actions">
        <DropdownItem
          key="profile"
          className="flex w-full flex-col items-start justify-start"
        >
          <p className="font-normal">{user?.name}</p>
          <p className="font-bold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" textValue="settings">
          Mis preferencias
        </DropdownItem>
        <DropdownItem key="team_settings" textValue="team_settings">
          Opciones del team
        </DropdownItem>
        <DropdownItem key="analytics" textValue="analytics">
          Analitica
        </DropdownItem>
        <DropdownItem key="system" textValue="system">
          Sistema
        </DropdownItem>
        <DropdownItem key="configurations" textValue="configurations">
          Configuración
        </DropdownItem>
        <DropdownItem key="help_and_feedback" textValue="help_and_feedback">
          Ayuda
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          textValue="logout"
          onPress={handleLogout}
        >
          Salir
        </DropdownItem>
        <DropdownItem
          key="switch"
          className="flex flex-row items-center"
          textValue="switch"
          startContent={<DarkModeSwitch />}
        >
          Cambiar tema
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
