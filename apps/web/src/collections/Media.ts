import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: { read: () => true, create: ({ req: { user } }) => !!user, update: ({ req: { user } }) => !!user, delete: ({ req: { user } }) => !!user },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [{ name: 'thumbnail', width: 400, height: 300 }, { name: 'card', width: 768, height: 1024 }],
  },
  fields: [{ name: 'alt', type: 'text', required: true, localized: true }],
  timestamps: true,
}
