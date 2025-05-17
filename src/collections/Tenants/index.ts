import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { updateAndDeleteAccess } from './access/updateAndDelete'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: ({ req }) => Boolean(req.user),
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Used for domain-based tenant handling',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Used for url paths, example: /tenant-slug/page-slug',
      },
      index: true,
      required: true,
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      admin: {
        description:
          'If checked, logging in is not required to read. Useful for building public pages.',
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
    {
      name: 'supportedLocales',
      type: 'select',
      hasMany: true,
      admin: {
        description: 'Select which languages this tenant can use',
        position: 'sidebar',
      },
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Spanish',
          value: 'es',
        },
        {
          label: 'French',
          value: 'fr',
        },
        {
          label: 'German',
          value: 'de',
        },
        {
          label: 'Arabic',
          value: 'ar',
        },
        {
          label: 'Vietnamese',
          value: 'vi',
        },
      ],
      defaultValue: ['en'],
    },
    {
      name: 'defaultLocale',
      type: 'select',
      admin: {
        description: 'Default language for this tenant',
        position: 'sidebar',
      },
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Spanish',
          value: 'es',
        },
        {
          label: 'French',
          value: 'fr',
        },
        {
          label: 'German',
          value: 'de',
        },
        {
          label: 'Arabic',
          value: 'ar',
        },
        {
          label: 'Vietnamese',
          value: 'vi',
        },
      ],
      defaultValue: 'en',
    },
  ],
}
