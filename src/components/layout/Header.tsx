import MobileMenu from '@/components/layout/MobileMenu';
import { protectedRoute } from '@/lib/session';
import { cache } from 'react';

import { authenticatedAction } from '@/lib/zsa-procedures';
import { getProfileUserService } from '@/backend/services/authenticationService';
import { ProfileDropdown } from '../ProfileDropdown';
import { ThemeSelectorDropdown } from '../ThemeSelectorDropdown';

export const getCurrentProfile = cache(async () => {
  const action = authenticatedAction.handler(async ({ ctx }) => {
    const profile = await getProfileUserService(ctx.user.id);
    if (!profile) throw new Error('Profile not found');
    const { name, image } = profile;
    return {
      name,
      image,
      email: ctx.user.email,
    };
  });

  const [profile, error] = await action();
  if (error) {
    throw error;
  }
  return profile;
});

const Header = async () => {
  const user = await protectedRoute();
  const profile = await getCurrentProfile();

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between md:justify-end '>
      <MobileMenu isUserAdmin={user.role == 'admin'} />
      <div className='flex items-center justify-between gap-2'>
        <ThemeSelectorDropdown />
        <ProfileDropdown userImage={profile.image ?? undefined} />
      </div>
    </header>
  );
};

export default Header;
