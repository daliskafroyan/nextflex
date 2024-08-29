'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { ERROR_MESSAGES } from '@/lib/errors';
import { cn, getDevOnlyErrorMsg } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import BackButton from '@/components/BackButton';
import GoogleIcon from '@/components/GoogleIcon';
import { Button, buttonVariants } from '@/components/ui/button';
import { signInAction } from './sign-in.action';
import { SignInSchema } from './sign-in.schema';

const LOGIN_FORM_STRINGS = {
  label: 'Welcome!',
  title: 'Please input your credential first',
  backButtonLabel: "Don't have an account? Register here.",
  successMessage: 'You have successfully logged in',
  loadingMessage: 'Logging you in...',
  errorMessage: "We couldn't log you in.",
  errorDescription: 'An error occurred while logging you in.',
  unverifiedMessage:
    'Your account is not verified. Please check your email for the verification link.',
  emailFormLabel: 'Email',
  passwordFormLabel: 'Password',
  forgotPasswordLabel: 'Forgot password?',
  resendVerificationLabel: 'Resend verification email',
  resendVerificationCountdown: 'Resend verification email in',
  googleLogin: 'Login with Google',
  pendingButton: 'Loading...',
  submitButton: 'Login',
};

const DEFAULT_COUNT = 30;

export const LoginForm = () => {
  const [isUnverified, setIsUnverified] = useState(false);
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!startCount) return;
    const timer = setInterval(() => {
      if (count === 0) {
        setStartCount(false);
        return clearInterval(timer);
      }
      setCount((prevCount) => prevCount - 1);
      console.log(count);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startCount, count]);

  const { isPending, execute, error } = useServerAction(signInAction, {
    onError({ err }) {
      toast.error(err.message);
      if (
        err?.message == ERROR_MESSAGES.UnverifiedAccountError ||
        err?.message ==
        getDevOnlyErrorMsg(ERROR_MESSAGES.UnverifiedAccountError)
      ) {
        setIsUnverified(true);
        setStartCount(true);
      }
    },
    onSuccess() {
      toast.success(LOGIN_FORM_STRINGS.successMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetUnverified = () => {
    setIsUnverified(false);
    setStartCount(false);
    setCount(DEFAULT_COUNT);
  };

  async function onSubmit(
    values: z.infer<typeof SignInSchema>
  ) {
    resetUnverified();
    toast.loading(LOGIN_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-start">
          <h1 className="text-3xl font-bold">{LOGIN_FORM_STRINGS.label}</h1>
          <p className="text-balance text-muted-foreground">
            {LOGIN_FORM_STRINGS.title}
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{LOGIN_FORM_STRINGS.emailFormLabel}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='johndoe@gmail.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>
                    {LOGIN_FORM_STRINGS.passwordFormLabel}
                  </FormLabel>
                  <BackButton
                    isInline
                    href='/forgot-password'
                    label={LOGIN_FORM_STRINGS.forgotPasswordLabel}
                  />
                </div>

                <FormControl>
                  <Input {...field} type='password' placeholder='******' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isUnverified && (
            <div className='text-center'>
              <p className='text-sm text-muted-foreground'>
                {LOGIN_FORM_STRINGS.unverifiedMessage}
              </p>
              <BackButton
                href='/email-verification'
                label={
                  count > 0
                    ? `${LOGIN_FORM_STRINGS.resendVerificationCountdown} ${count}s`
                    : LOGIN_FORM_STRINGS.resendVerificationLabel
                }
                isInline
                disabled={isPending || count > 0}
              />
            </div>
          )}
          {error && (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>{LOGIN_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || LOGIN_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? LOGIN_FORM_STRINGS.pendingButton
              : LOGIN_FORM_STRINGS.submitButton}
          </Button>
          <Link
            href={{
              pathname: '/api/sign-in/google',
            }}
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
              'w-full'
            )}>
            <GoogleIcon className='mr-2 h-5 w-5' />
            {LOGIN_FORM_STRINGS.googleLogin}
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href={{
            pathname: '/sign-up',
          }} className="underline">
            {LOGIN_FORM_STRINGS.backButtonLabel}
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm;
