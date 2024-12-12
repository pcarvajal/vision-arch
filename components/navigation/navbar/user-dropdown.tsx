'use client';

import { logoutAction } from '@/actions/auth.action';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useUserStore from '@/store/userStore';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  useUser,
} from '@nextui-org/react';
import blankProfile from '../../../public/profile-default.svg';
import { DarkModeSwitch } from './darkmodeswitch';

export const UserDropdown = () => {
  const clearUserStore = useUserStore((state) => state.clearPersistedStore);
  const clearArtifactFlowStore = useArtifactFlowStore(
    (state) => state.clearPersistedArtifactFlowStore,
  );
  const handleLogout = async () => {
    await logoutAction();
    clearUserStore();
    clearArtifactFlowStore();
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
