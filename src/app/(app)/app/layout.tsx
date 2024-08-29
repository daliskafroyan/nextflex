import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { protectedRoute } from '@/lib/session';
import { FC } from 'react';

type LayoutAppProps = {
  children: React.ReactNode;
};

const LayoutApp: FC<LayoutAppProps> = async ({ children }) => {
  await protectedRoute();
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar isUserAdmin={false} />
      <div className='flex flex-col'>
        <Header />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutApp;
