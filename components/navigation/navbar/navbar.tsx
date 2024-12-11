import { FeedbackIcon } from '@/components/icons/navbar/feedback-icon';
import { SupportIcon } from '@/components/icons/navbar/support-icon';
import { SearchIcon } from '@/components/icons/searchicon';
import { NotificationsDropdown } from '@/components/navigation/navbar/notifications-dropdown';
import { UserDropdown } from '@/components/navigation/navbar/user-dropdown';
import { Input, Navbar, NavbarContent } from '@nextui-org/react';
import { BurguerButton } from './burguer-button';

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: 'w-full',
              mainWrapper: 'w-full',
            }}
            placeholder="Buscar..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Sugerencias?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <SupportIcon />
          </div>

          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
