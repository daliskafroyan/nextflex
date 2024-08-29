'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { site } from '@/config/site';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Inbox, LinkIcon } from 'lucide-react';

export const MENU_ICONS = {
  inbox: <Inbox className='h-4 w-4' />,
  default: <LinkIcon className='h-4 w-4' />,
} as const;


type MobileMenuProps = {
  isUserAdmin: boolean;
};

type MenuElementProps = {
  children: React.ReactNode;
  isActive?: boolean;
  href: string;
  isHidden?: boolean;
};

const MenuElement: FC<MenuElementProps> = ({
  children,
  isActive,
  href,
  isHidden,
}) => {
  return (
    <Link
      href={{ pathname: href }}
      className={cn(
        isActive ? 'text-foreground bg-muted' : 'text-muted-foreground',
        'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
        isHidden && 'hidden'
      )}>
      {children}
    </Link>
  );
};


const MobileMenu: FC<MobileMenuProps> = ({ isUserAdmin }) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <nav className='grid gap-2 text-lg font-medium'>
          {site.menus.links.map(({ href, label, icon, admin }) => (
            <MenuElement
              key={`mobile-menu-link-${href}`}
              isActive={pathname == href}
              isHidden={!isUserAdmin && admin}
              href={href}>
              {MENU_ICONS[icon] || MENU_ICONS.default}
              {label}
            </MenuElement>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
