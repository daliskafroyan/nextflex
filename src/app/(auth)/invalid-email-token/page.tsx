import CardWrapper from '@/components/CardWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const INVALID_TOKEN_STRINGS = {
  label:
    'We are sorry, but the verification token is invalid. Please generate another token',
  title: 'Invalid Verification Token',
  backButtonLabel: 'Do you want to generate another token?',
  buttonLabel: 'Generate token',
};

const InvalidTokenPage = () => {
  return (
    <CardWrapper
      label={INVALID_TOKEN_STRINGS.label}
      title={INVALID_TOKEN_STRINGS.title}
      backButtonHref='/email-verification'
      backButtonLabel={INVALID_TOKEN_STRINGS.backButtonLabel}>
      <Button className='w-full' asChild>
        <Link href='/email-verification'>
          {INVALID_TOKEN_STRINGS.buttonLabel}
        </Link>
      </Button>
    </CardWrapper>
  );
};


export default function InvalidEmailTokenPage() {
  return (
    <InvalidTokenPage />
  );
}
