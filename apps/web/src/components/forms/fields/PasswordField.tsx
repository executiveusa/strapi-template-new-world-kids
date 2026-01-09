import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldValues, Controller, FieldPath } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface PasswordFieldProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  name: FieldPath<T>;
  control: any;
  error?: string;
}

/**
 * Renders a password input field with an optional label, visibility toggle, and react-hook-form binding.
 *
 * @param label - Text label displayed above the input
 * @param placeholder - Placeholder text shown inside the input
 * @param name - Field path used by react-hook-form to register the input
 * @param control - react-hook-form control object that manages the field state
 * @param error - Error message to display below the input and to visually mark the input as invalid
 * @returns A JSX element containing a controlled password input with a show/hide toggle and optional error text
 */
export function PasswordField<T extends FieldValues>({
  label = 'Password',
  placeholder = 'Enter your password',
  name,
  control,
  error,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className={error ? 'border-red-500 pr-10' : 'pr-10'}
            />
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}