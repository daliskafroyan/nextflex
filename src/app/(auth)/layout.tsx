import { ThemeSelectorDropdown } from '@/components/ThemeSelectorDropdown';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { FC } from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const LayoutAuth: FC<AuthLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser();

  if (user) {
    redirect('/app');
  }

  return <div className='min-h-screen w-full flex flex-col justify-center items-center relative'>
    <div className="absolute top-4 right-4">
      <ThemeSelectorDropdown />
    </div>
    {children}
  </div>

  return <>{children}</>;
};

export default LayoutAuth;
