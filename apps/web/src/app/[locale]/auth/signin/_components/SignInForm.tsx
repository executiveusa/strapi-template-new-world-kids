'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { AppForm } from '@/components/forms/AppForm';
import { PasswordField } from '@/components/forms/fields/PasswordField';
import { TextField } from '@/components/forms/fields/TextField';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAppRouter } from '@/hooks/useAppRouter';
import { useAppSearchParams } from '@/hooks/useAppSearchParams';
import { useTranslatedZod } from '@/hooks/useTranslatedZod';
import { APP_ROUTES } from '@/lib/constants';
import { Link } from '@/lib/navigation';

export function SignInForm() {
  const { router } = useAppRouter();
  const { searchParams } = useAppSearchParams();
  const { tZod } = useTranslatedZod();

  const schema = z.object({
    email: tZod.string().email(),
    password: tZod.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resolveSignInError = (error: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Incorrect email or password. Please try again.';
      case 'AccessDenied':
        return 'Access denied. Please contact support if this continues.';
      default:
        return 'Unable to sign in right now. Please try again.';
    }
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    form.clearErrors('root');

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.ok) {
        router.push(searchParams.get('callbackUrl') || APP_ROUTES.home);
        return;
      }

      if (response?.error) {
        form.setError('root', {
          type: 'server',
          message: resolveSignInError(response.error),
        });
        return;
      }

      form.setError('root', {
        type: 'server',
        message: 'Unable to sign in right now. Please try again.',
      });
    } catch (error) {
      form.setError('root', {
        type: 'server',
        message: 'Something went wrong while signing you in. Please try again.',
      });
    }
  };

  return (
    <AppForm
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col items-stretch gap-6"
    >
      <div className="flex flex-col gap-4">
        <TextField control={form.control} name="email" label="Email" />
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
        />
      </div>
      {form.formState.errors.root?.message ? (
        <Alert variant="destructive">
          <AlertDescription>
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      ) : null}
      <Link
        href={APP_ROUTES.forgotPassword}
        className="text-right text-sm font-medium text-primary underline"
      >
        Forgot password?
      </Link>

      <div className="flex flex-col gap-2">
        <Button type="submit">Sign in</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => signIn('google')}
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Sign in with Google
        </Button>
      </div>
    </AppForm>
  );
}
