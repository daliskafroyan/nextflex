'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { signUpAction } from './sign-up.action';
import { SignUpInputSchema } from './sign-up.schema';
import GoogleIcon from '@/components/GoogleIcon';

const REGISTER_FORM_STRINGS = {
  title: 'Register',
  label: 'Create an account',
  backButtonLabel: 'Already have an account? Login here.',
  successMessage: 'You have successfully registered',
  loadingMessage: 'Registering...',
  errorMessage: "We couldn't register you.",
  errorDescription: 'An error occurred while registering you.',
  emailFormLabel: 'Email',
  passwordFormLabel: 'Password',
  confirmPasswordFormLabel: 'Confirm Password',
  pendingButton: 'Loading...',
  submitButton: 'Register',
};

const SignUpForm = () => {
  const { isPending, execute, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast.error(err.message);
    },
    onSuccess({ data }) {
      toast.success(REGISTER_FORM_STRINGS.successMessage);
      toast.message(data.message, {
        description: data.emailLink,
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(SignUpInputSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordWatcher = form.watch('password');
  const { confirmPassword } = form.getValues();

  useEffect(() => {
    if (confirmPassword) {
      form.setValue('confirmPassword', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordWatcher]);

  async function onSubmit(values: z.infer<typeof SignUpInputSchema>) {
    toast.loading(REGISTER_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-start">
          <h1 className="text-3xl font-bold">{REGISTER_FORM_STRINGS.title}</h1>
          <p className="text-balance text-muted-foreground">
            {REGISTER_FORM_STRINGS.label}
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{REGISTER_FORM_STRINGS.emailFormLabel}</FormLabel>
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
                <FormLabel>
                  {REGISTER_FORM_STRINGS.passwordFormLabel}
                </FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='******' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {REGISTER_FORM_STRINGS.confirmPasswordFormLabel}
                </FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='******' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>{REGISTER_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || REGISTER_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? REGISTER_FORM_STRINGS.pendingButton
              : REGISTER_FORM_STRINGS.submitButton}
          </Button>
          <Link
            href={{
              pathname: '/api/sign-up/google',
            }}
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
              'w-full'
            )}>
            <GoogleIcon className='mr-2 h-5 w-5' />
            Sign up with Google
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href={{
            pathname: '/sign-in',
          }} className="underline">
            {REGISTER_FORM_STRINGS.backButtonLabel}
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
