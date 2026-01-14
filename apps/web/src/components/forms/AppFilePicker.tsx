"use client"

import { useRef, useState } from "react"
import { Cross1Icon } from "@radix-ui/react-icons"
import { PaperclipIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { z } from "zod"

import { logPlaceholderUsage } from "@/lib/general-helpers"
import { cn } from "@/lib/styles"
import { Tooltip } from "@/components/elementary/Tooltip"
import { AppFormDescription } from "@/components/forms/AppFormDescription"
import { AppFormLabel } from "@/components/forms/AppFormLabel"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

type FileSchemaOptions = {
  readonly required?: boolean
  readonly validTypes?: string[]
  readonly maxSizeInBytes?: number
  readonly messages?: {
    readonly required?: string
    readonly invalidType?: string
    readonly tooLarge?: string
  }
}

export const createFileSchema = ({
  required = false,
  validTypes = [],
  maxSizeInBytes,
  messages,
}: FileSchemaOptions) => {
  const fileSchema = z
    .instanceof(File, {
      message: messages?.required ?? "File is required",
    })
    .superRefine((file, ctx) => {
      if (validTypes.length > 0 && !validTypes.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages?.invalidType ?? "Invalid file type",
        })
      }

      if (maxSizeInBytes && file.size > maxSizeInBytes) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages?.tooLarge ?? "File is too large",
        })
      }
    })

  if (required) {
    return fileSchema
  }

  return z.union([fileSchema, z.null()]).optional()
}

interface Props {
  readonly name: string
  readonly tabIndex?: number
  readonly validTypes?: string[]
  readonly accept?: string
  readonly containerClassName?: string
  readonly fieldClassName?: string
  readonly label?: string
  readonly required?: boolean
  readonly description?: React.ReactNode
}

export function AppFilePicker({
  name,
  tabIndex,
  validTypes = [],
  accept,
  containerClassName,
  fieldClassName,
  label,
  required,
  description,
}: Props) {
  logPlaceholderUsage("AppFilePicker")

  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const t = useTranslations("comps.fileInput")
  const { control, trigger } = useFormContext()

  const acceptedTypes =
    accept ?? (validTypes.length > 0 ? validTypes.join(",") : undefined)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedFile = field.value ?? null

        const setFile = async (file: File | null) => {
          field.onChange(file)
          await trigger(name)
        }

        const handleFileInputChange = async (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const file = e.target.files?.[0] || null
          await setFile(file)
        }

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          setIsDraggingOver(true)
        }

        const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          setIsDraggingOver(false)
        }

        const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          setIsDraggingOver(false)

          const file = e.dataTransfer.files[0] || null
          await setFile(file)
        }

        const openFileInput = () => {
          if (fileInputRef.current) {
            fileInputRef.current.click()
          }
        }

        const removeSelectedFile = async () => {
          await setFile(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
        }

        return (
          <FormItem className={containerClassName}>
            <AppFormLabel
              label={label}
              required={required}
              fieldState={fieldState}
            />
            <FormControl>
              <div
                className={cn(fieldClassName, "w-full rounded-lg border-2", {
                  "bg-gray-100": isDraggingOver,
                  "cursor-pointer": !selectedFile,
                  "border-red-600": fieldState.invalid,
                })}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept={acceptedTypes}
                  onChange={handleFileInputChange}
                  onBlur={field.onBlur}
                  className="hidden"
                  ref={fileInputRef}
                  tabIndex={tabIndex}
                />
                <div className="flex size-full items-center justify-center">
                  {selectedFile ? (
                    <div>
                      <div className="flex w-full items-center justify-between gap-5">
                        <span className="flex items-center gap-1">
                          <PaperclipIcon size={16} /> {selectedFile.name}
                        </span>
                        <Tooltip
                          contentProps={{ side: "left" }}
                          content={t("removeFile")}
                        >
                          <button
                            type="button"
                            tabIndex={tabIndex}
                            onClick={(event) => {
                              event.preventDefault()
                              void removeSelectedFile()
                            }}
                          >
                            <Cross1Icon />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      tabIndex={tabIndex}
                      onClick={(event) => {
                        event.preventDefault()
                        openFileInput()
                      }}
                      className="size-full text-sm text-gray-500"
                    >
                      {t("dragAndDrop")}
                    </button>
                  )}
                </div>
              </div>
            </FormControl>
            <AppFormDescription description={description} />
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
