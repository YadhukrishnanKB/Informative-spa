import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'pages',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'published', 'updatedAt'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL path for this page (e.g., "home", "about", "contact")',
          },
        },
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title tag',
          },
        },
        {
          name: 'metaDesc',
          type: 'textarea',
          admin: {
            description: 'SEO meta description',
          },
        },
        {
          name: 'published',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'widgets',
          type: 'blocks',
          blocks: [
            {
              slug: 'hero',
              labels: { singular: 'Hero', plural: 'Hero' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'subheading', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'buttonText', type: 'text' },
                { name: 'buttonLink', type: 'text' },
                { name: 'image', type: 'text' },
                {
                  name: 'locations',
                  type: 'array',
                  admin: { description: 'Location pins shown on the hero' },
                  fields: [
                    { name: 'name', type: 'text' },
                  ],
                },
              ],
            },
            {
              slug: 'features',
              labels: { singular: 'Features', plural: 'Features' },
              fields: [
                { name: 'heading', type: 'text' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    { name: 'icon', type: 'text', admin: { description: 'Emoji icon (e.g. 💆). Ignored if image URL is set.' } },
                    { name: 'image', type: 'text', admin: { description: 'Image URL. Overrides the emoji icon when set.' } },
                  ],
                },
              ],
            },
            {
              slug: 'testimonials',
              labels: { singular: 'Testimonials', plural: 'Testimonials' },
              fields: [
                { name: 'heading', type: 'text' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', label: 'Name' },
                    { name: 'description', type: 'textarea', label: 'Quote' },
                  ],
                },
              ],
            },
            {
              slug: 'content',
              labels: { singular: 'Content', plural: 'Content' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              slug: 'gallery',
              labels: { singular: 'Gallery', plural: 'Gallery' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'image', type: 'text' },
                  ],
                },
              ],
            },
            {
              slug: 'video',
              labels: { singular: 'Video', plural: 'Video' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'coverImage', type: 'text' },
                { name: 'videoUrl', type: 'text' },
              ],
            },
            {
              slug: 'packages',
              labels: { singular: 'Packages', plural: 'Packages' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'price', type: 'text' },
                    { name: 'duration', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    {
                      name: 'features',
                      type: 'array',
                      fields: [
                        { name: 'feature', type: 'text' },
                      ],
                    },
                    { name: 'popular', type: 'checkbox', defaultValue: false },
                  ],
                },
              ],
            },
            {
              slug: 'contact',
              labels: { singular: 'Contact', plural: 'Contact' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'contact-messages',
      access: {
        create: () => true,
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
      },
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'read', 'createdAt'],
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'text', required: true },
        { name: 'phone', type: 'text' },
        { name: 'message', type: 'textarea', required: true },
        { name: 'read', type: 'checkbox', defaultValue: false },
      ],
    },
  ],

  globals: [
    {
      slug: 'theme-settings',
      admin: {
        group: 'Settings',
      },
      fields: [
        { name: 'primaryColor', type: 'text', defaultValue: '#0a3d3d' },
        { name: 'secondaryColor', type: 'text', defaultValue: '#d4a373' },
        { name: 'accentColor', type: 'text', defaultValue: '#e8c7a7' },
        { name: 'fontFamily', type: 'text', defaultValue: 'Inter, sans-serif' },
        { name: 'borderRadius', type: 'text', defaultValue: '8px' },
        { name: 'footerText', type: 'text' },
      ],
    },
  ],

  secret: process.env.PAYLOAD_SECRET || 'super-secret-change-me',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  onInit: async (payload) => {
    // Check if already seeded
    const existingPages = await payload.find({ collection: 'pages', limit: 1 })
    if (existingPages.docs.length > 0) return

    // Create admin user
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@spa.com',
          password: 'admin123',
          name: 'Admin',
        },
      })
    }

    // Create home page
    const home = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        metaTitle: 'Luxury Spa & Wellness | Relax & Rejuvenate',
        metaDesc: 'Experience premium spa treatments, massages, and wellness therapies.',
        published: true,
        widgets: [
          {
            blockType: 'hero',
            subheading: 'Experience Ultimate Relaxation',
            description: 'Discover unparalleled relaxation and luxury at Protone Day Spa, with premium locations. Experience our exquisite interiors, expert therapists, and exceptional hospitality.',
            buttonText: 'CALL NOW',
            buttonLink: '/contact',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200',
            locations: [
              { name: 'Edappally' },
              { name: 'MG Road' },
              { name: 'Thoppumpady' },
              { name: 'Thrippunithura' },
            ],
          },
          {
            blockType: 'features',
            heading: 'Our Premium Services',
            items: [
              { title: 'Swedish Massage', description: 'Gentle full-body massage for deep relaxation', icon: '💆' },
              { title: 'Hot Stone Therapy', description: 'Warm basalt stones to melt away tension', icon: '🪨' },
              { title: 'Aromatherapy', description: 'Essential oils tailored to your needs', icon: '🌸' },
              { title: 'Facial Treatments', description: 'Rejuvenating facials for glowing skin', icon: '✨' },
            ],
          },
          {
            blockType: 'testimonials',
            heading: 'What Our Clients Say',
            items: [
              { title: 'Sarah Johnson', description: 'The best spa experience ever!' },
              { title: 'Michael Chen', description: 'I feel completely renewed after every visit.' },
              { title: 'Emily Davis', description: 'Professional, relaxing, and luxurious.' },
            ],
          },
        ],
      },
    })

    // Create about page
    await payload.create({
      collection: 'pages',
      data: {
        title: 'About Us',
        slug: 'about',
        metaTitle: 'About Our Spa | Our Story & Team',
        metaDesc: 'Learn about our spa journey and our expert therapists.',
        published: true,
        widgets: [
          {
            blockType: 'content',
            heading: 'Our Story',
            description: 'Founded in 2010, Serenity Spa has been dedicated to providing world-class wellness experiences.',
          },
          {
            blockType: 'features',
            heading: 'Why Choose Us',
            items: [
              { title: 'Expert Therapists', description: 'Certified professionals', icon: '👩‍⚕️' },
              { title: 'Organic Products', description: 'Natural and eco-friendly', icon: '🌿' },
              { title: 'Peaceful Ambiance', description: 'Calming environment', icon: '🕯️' },
              { title: 'Customized Care', description: 'Treatments tailored to you', icon: '❤️' },
            ],
          },
        ],
      },
    })

    // Create contact page
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Contact Us',
        slug: 'contact',
        metaTitle: 'Contact Our Spa | Book an Appointment',
        metaDesc: 'Get in touch with us.',
        published: true,
        widgets: [
          {
            blockType: 'contact',
            heading: 'Get In Touch',
            description: 'We would love to hear from you.',
          },
          {
            blockType: 'content',
            heading: 'Visit Us',
            description: '123 Wellness Avenue\nNew York, NY 10001\n\nPhone: (555) 123-4567\nEmail: hello@serenityspa.com',
          },
        ],
      },
    })

    // Seed theme settings
    await payload.updateGlobal({
      slug: 'theme-settings',
      data: {
        primaryColor: '#0a3d3d',
        secondaryColor: '#d4a373',
        accentColor: '#e8c7a7',
        fontFamily: 'Inter, sans-serif',
        borderRadius: '8px',
      },
    })
  },
})
