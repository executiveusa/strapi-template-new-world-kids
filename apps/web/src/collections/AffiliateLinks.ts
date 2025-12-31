import { CollectionConfig } from 'payload'

export const AffiliateLinks: CollectionConfig = {
  slug: 'affiliate-links',
  admin: { useAsTitle: 'productName' },
  access: { read: ({ req: { user } }) => !!user, create: ({ req: { user } }) => !!user, update: ({ req: { user } }) => !!user, delete: ({ req: { user } }) => !!user },
  fields: [
    { name: 'productName', type: 'text', required: true },
    { name: 'originalUrl', type: 'text', required: true },
    { name: 'cloakedSlug', type: 'text', required: true, unique: true },
    { name: 'program', type: 'select', required: true, options: [{ label: 'Amazon', value: 'amazon' }, { label: 'Impact', value: 'impact' }] },
    { name: 'commission', type: 'number', required: true },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'analytics', type: 'group', fields: [
      { name: 'clicks', type: 'number', defaultValue: 0 },
      { name: 'conversions', type: 'number', defaultValue: 0 },
      { name: 'revenue', type: 'number', defaultValue: 0 },
    ]},
  ],
  timestamps: true,
}
