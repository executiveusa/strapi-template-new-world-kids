import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldValues, Controller, UseFormSetValue, FieldPath } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  type?: string;
  name: FieldPath<T>;
  control: any;
  error?: string;
}

/**
 * Renders a controlled text input for react-hook-form with an optional label and inline error message.
 *
 * @template T - The form values shape used for the field `name`.
 * @param label - Optional label text displayed above the input.
 * @param placeholder - Optional placeholder text for the input.
 * @param type - HTML input type (defaults to `"text"`).
 * @param name - Path to the form field within the form values.
 * @param control - react-hook-form `control` object used to register the field.
 * @param error - Optional error message displayed below the input; when present the input receives an error border.
 * @returns A JSX element containing the labeled, controller-bound input and an optional error message.
 */
export function TextField<T extends FieldValues>({
  label,
  placeholder,
  type = 'text',
  name,
  control,
  error,
}: TextFieldProps<T>) {
  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className={error ? 'border-red-500' : ''}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}