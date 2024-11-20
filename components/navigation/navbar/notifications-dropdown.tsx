import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react';
import React from 'react';
import { NotificationIcon } from '@/components/icons/navbar/notificationicon';

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: 'py-2',
              title: 'text-base font-semibold',
            }}
            key="1"
            description="Completa los detalles necesarios para personalizar tu perfil y mejorar tu experiencia en el sitio. Cuanta más información compartas, mejor podremos ayudarte a encontrar lo que necesitas. ¡Haz que tu perfil destaque!"
          >
            📣 Completa tu información
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: 'py-2',
              title: 'text-base font-semibold',
            }}
            description="Comienza a visualizar tus datos de manera clara y personalizada. Crea tu primer dashboard y accede a información relevante en un solo lugar. ¡Empieza ahora y organiza todo a tu manera!"
          >
            🚀 Tu primer dashboard!
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
