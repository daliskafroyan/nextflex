
import CardWrapper from '@/components/CardWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const VERIFIED_STRINGS = {
  title: 'Email Verified',
  label:
    'Your email has been verified successfully! you can now login into your account.',
  backButtonLabel: 'Do you want to login into your account?',
  linkLabel: 'Go to login page',
};

const VerifiedPage = () => {
  return (
    <CardWrapper
      label={VERIFIED_STRINGS.label}
      title={VERIFIED_STRINGS.title}
      backButtonHref='/sign-in'
      backButtonLabel={VERIFIED_STRINGS.backButtonLabel}>
      <Button className='w-full' asChild>
        <Link href={{
          pathname: '/sign-in',
        }}>{VERIFIED_STRINGS.linkLabel}</Link>
      </Button>
    </CardWrapper>
  );
};


export default function VerifySuccessPage() {
  return (
    <VerifiedPage />
  );
}
