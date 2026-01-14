'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { AppForm } from '@/components/forms/AppForm';
import { PasswordField } from '@/components/forms/fields/PasswordField';
import { TextField } from '@/components/forms/fields/TextField';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTranslatedZod } from '@/hooks/useTranslatedZod';
import { registerWithEmailAndPassword } from '@/lib/firebase-api/auth/client'; // Placeholder

export function RegisterForm() {
  const { tZod } = useTranslatedZod();
  const [statusMessage, setStatusMessage] = useState<{
    variant: 'success' | 'error';
    message: string;
  } | null>(null);

  const schema = z.object({
    email: tZod.string().email(),
    password: tZod.string().min(8),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setStatusMessage(null);

    try {
      await registerWithEmailAndPassword(values.email, values.password); // Placeholder
      setStatusMessage({
        variant: 'success',
        message:
          'Registration successful! Check your inbox for a verification email, then sign in to continue.',
      });
      form.reset();
    } catch (error) {
      const fallbackMessage =
        'Registration failed. Please verify your details and try again, or use Google sign up.';
      const errorMessage =
        error instanceof Error && error.message
          ? `${error.message} ${fallbackMessage}`
          : fallbackMessage;
      setStatusMessage({
        variant: 'error',
        message: errorMessage,
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

      {statusMessage ? (
        <Alert
          variant={statusMessage.variant === 'error' ? 'destructive' : 'default'}
        >
          <AlertTitle>
            {statusMessage.variant === 'error'
              ? 'Unable to register'
              : 'Account created'}
          </AlertTitle>
          <AlertDescription>{statusMessage.message}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Create account
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting}
          onClick={() => signIn('google')}
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Sign up with Google
        </Button>
      </div>
    </AppForm>
  );
}
