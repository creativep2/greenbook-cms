import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Pages } from './collections/Pages'
import { Tenants } from './collections/Tenants'
import Users from './collections/Users'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { isSuperAdmin } from './access/isSuperAdmin'
import type { Config } from './payload-types'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import { seed } from './seed'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Media } from './collections/Media'
// Import translations
import { enTranslations, esTranslations, frTranslations, deTranslations } from '@payloadcms/translations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Pages, Users, Tenants, Media],
  // db: mongooseAdapter({
  //   url: process.env.DATABASE_URI as string,
  // }),
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  onInit: async (args) => {
    if (process.env.SEED_DB) {
      await seed(args)
    }
  },
  editor: defaultLexical,
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  // Add localization configuration
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Spanish',
        code: 'es',
      },
      {
        label: 'French',
        code: 'fr',
      },
      {
        label: 'German',
        code: 'de',
      },
      {
        label: 'Arabic',
        code: 'ar',
        rtl: true,
      },
      {
        label: 'Vietnamese',
        code: 'vi',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
    // Filter available locales based on tenant configuration
    filterAvailableLocales: async ({ req, locales }) => {
      // For super admins, show all locales
      if (isSuperAdmin(req.user)) {
        return locales;
      }
      
      // Get user's tenant IDs
      const tenantIDs = getUserTenantIDs(req.user);
      
      if (tenantIDs.length > 0) {
        // Get the first tenant for simplicity (you might want to improve this logic)
        const tenant = await req.payload.findByID({
          collection: 'tenants',
          id: tenantIDs[0],
        });
        
        // If tenant has supportedLocales field, filter by those
        if (tenant && tenant.supportedLocales?.length) {
          return locales.filter(locale => 
            tenant.supportedLocales.includes(locale.code)
          );
        }
      }
      
      // Default fallback - show all locales
      return locales;
    },
  },
  // Add i18n configuration for admin UI translations
  i18n: {
    // We'll load translations dynamically 
    translationImportMode: 'dynamic',
  },
  plugins: [
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
        media: {}, // Add media to multi-tenant plugin
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) {
              return true
            }
            return getUserTenantIDs(req.user).length > 0
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],
})
