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
