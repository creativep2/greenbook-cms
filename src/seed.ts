import { Config } from 'payload'

export const seed: NonNullable<Config['onInit']> = async (payload): Promise<void> => {
  try {
    console.log('🌱 Starting database seed...')
    
    // Create tenants
    console.log('📋 Creating tenants...')
    const tenant1 = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Tenant 1',
        slug: 'gold',
        domain: 'gold.localhost',
      },
    })
    console.log('✅ Created tenant 1')

    const tenant2 = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Tenant 2',
        slug: 'silver',
        domain: 'silver.localhost',
      },
    })
    console.log('✅ Created tenant 2')

    const tenant3 = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Tenant 3',
        slug: 'bronze',
        domain: 'bronze.localhost',
      },
    })
    console.log('✅ Created tenant 3')

    // Create super admin user
    console.log('👤 Creating super admin user...')
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com', // Using a proper email format
          password: 'demo',
          roles: ['super-admin'],
          username: 'super-admin',
        },
      })
      console.log('✅ Created super admin user')
    } catch (error) {
      console.error('❌ Failed to create super admin user:', error)
      throw error
    }

    // Create tenant-specific users
    console.log('👥 Creating tenant users...')
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'tenant1@example.com',
          password: 'demo',
          tenants: [
            {
              roles: ['tenant-admin'],
              tenant: tenant1.id,
            },
          ],
          username: 'tenant1',
        },
      })
      console.log('✅ Created tenant 1 admin')
    } catch (error) {
      console.error('❌ Failed to create tenant 1 user:', error)
      // Continue with other operations
    }

    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'tenant2@example.com',
          password: 'demo',
          tenants: [
            {
              roles: ['tenant-admin'],
              tenant: tenant2.id,
            },
          ],
          username: 'tenant2',
        },
      })
      console.log('✅ Created tenant 2 admin')
    } catch (error) {
      console.error('❌ Failed to create tenant 2 user:', error)
      // Continue with other operations
    }

    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'tenant3@example.com',
          password: 'demo',
          tenants: [
            {
              roles: ['tenant-admin'],
              tenant: tenant3.id,
            },
          ],
          username: 'tenant3',
        },
      })
      console.log('✅ Created tenant 3 admin')
    } catch (error) {
      console.error('❌ Failed to create tenant 3 user:', error)
      // Continue with other operations
    }

    // Create multi-tenant admin
    console.log('👤 Creating multi-tenant admin...')
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'multi@example.com',
          password: 'demo',
          tenants: [
            {
              roles: ['tenant-admin'],
              tenant: tenant1.id,
            },
            {
              roles: ['tenant-admin'],
              tenant: tenant2.id,
            },
            {
              roles: ['tenant-admin'],
              tenant: tenant3.id,
            },
          ],
          username: 'multi-admin',
        },
      })
      console.log('✅ Created multi-tenant admin')
    } catch (error) {
      console.error('❌ Failed to create multi-tenant admin:', error)
      // Continue with other operations
    }

    // Create pages for each tenant
    console.log('📄 Creating pages...')
    try {
      await payload.create({
        collection: 'pages',
        data: {
          slug: 'home',
          tenant: tenant1.id,
          title: 'Page for Tenant 1',
          layout: [
            {
              blockType: 'content',
              columns: [
                {
                  size: 'full',
                  richText: [
                    {
                      children: [
                        {
                          text: 'Welcome to Tenant 1',
                        },
                      ],
                      type: 'h2',
                    },
                    {
                      children: [
                        {
                          text: 'This is a sample page for Tenant 1.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
      console.log('✅ Created page for tenant 1')
    } catch (error) {
      console.error('❌ Failed to create page for tenant 1:', error)
      // Continue with other operations
    }

    try {
      await payload.create({
        collection: 'pages',
        data: {
          slug: 'home',
          tenant: tenant2.id,
          title: 'Page for Tenant 2',
          layout: [
            {
              blockType: 'content',
              columns: [
                {
                  size: 'full',
                  richText: [
                    {
                      children: [
                        {
                          text: 'Welcome to Tenant 2',
                        },
                      ],
                      type: 'h2',
                    },
                    {
                      children: [
                        {
                          text: 'This is a sample page for Tenant 2.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
      console.log('✅ Created page for tenant 2')
    } catch (error) {
      console.error('❌ Failed to create page for tenant 2:', error)
      // Continue with other operations
    }

    try {
      await payload.create({
        collection: 'pages',
        data: {
          slug: 'home',
          tenant: tenant3.id,
          title: 'Page for Tenant 3',
          layout: [
            {
              blockType: 'content',
              columns: [
                {
                  size: 'full',
                  richText: [
                    {
                      children: [
                        {
                          text: 'Welcome to Tenant 3',
                        },
                      ],
                      type: 'h2',
                    },
                    {
                      children: [
                        {
                          text: 'This is a sample page for Tenant 3.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
      console.log('✅ Created page for tenant 3')
    } catch (error) {
      console.error('❌ Failed to create page for tenant 3:', error)
      // Continue with other operations
    }

    console.log('✅ Seed data successfully created')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}
