import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true, create: ({ req: { user } }) => !!user, update: ({ req: { user } }) => !!user, delete: ({ req: { user } }) => !!user },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', required: true, localized: true, maxLength: 200 },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'affiliateLinks', type: 'relationship', relationTo: 'affiliate-links', hasMany: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'draft', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }] },
    { name: 'aiGenerated', type: 'checkbox', defaultValue: false },
    { name: 'aiModel', type: 'text' },
  ],
  timestamps: true,
}
