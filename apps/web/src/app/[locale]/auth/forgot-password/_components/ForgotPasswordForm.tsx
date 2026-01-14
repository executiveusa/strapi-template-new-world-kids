'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AppForm } from '@/components/forms/AppForm';
import { TextField } from '@/components/forms/fields/TextField';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslatedZod } from '@/hooks/useTranslatedZod';
import { sendPasswordResetEmail } from '@/lib/firebase-api/auth/client'; // Placeholder

export function ForgotPasswordForm() {
  const { tZod } = useTranslatedZod();
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const schema = z.object({
    email: tZod.string().email(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setStatus(null);
    try {
      await sendPasswordResetEmail(values.email); // Placeholder
      setStatus({
        type: 'success',
        message:
          'If an account exists for this email, a reset link has been sent.',
      });
      form.reset({ email: '' });
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : 'We could not send the reset link. Please try again.';
      setStatus({
        type: 'error',
        message: errorMessage,
      });
      form.setError('email', {
        type: 'server',
        message: 'Please double-check your email and try again.',
      });
    }
  };

  return (
    <AppForm
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col items-stretch gap-6"
    >
      {status && (
        <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
          <AlertTitle>
            {status.type === 'error' ? 'Something went wrong' : 'Check your inbox'}
          </AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}

      <TextField
        control={form.control}
        name="email"
        label="Email"
        error={form.formState.errors.email?.message}
      />

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>
    </AppForm>
  );
}
