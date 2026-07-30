import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { parse as parseConnectionString } from 'pg-connection-string'
import {
  revalidatePage,
  revalidatePageDelete,
  revalidateThemeSettings,
} from './src/payload/hooks/revalidate'

const parsed = parseConnectionString(process.env.DATABASE_URL || '')
const poolOptions = {
  host: parsed.host || undefined,
  port: parsed.port ? Number(parsed.port) : undefined,
  database: parsed.database || undefined,
  user: parsed.user || undefined,
  password: parsed.password || undefined,
  ssl: { rejectUnauthorized: false },
}
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
      hooks: {
        afterChange: [revalidatePage],
        afterDelete: [revalidatePageDelete],
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
            {
              slug: 'map',
              labels: { singular: 'Map', plural: 'Map' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'address', type: 'text' },
                { name: 'embedUrl', type: 'text', admin: { description: 'Google Maps embed iframe src URL' } },
                { name: 'height', type: 'number', defaultValue: 450, admin: { description: 'Map height in pixels' } },
              ],
            },
            {
              slug: 'faq',
              labels: { singular: 'FAQ', plural: 'FAQ' },
              fields: [
                { name: 'heading', type: 'text' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'question', type: 'text' },
                    { name: 'answer', type: 'textarea' },
                  ],
                },
              ],
            },
            {
              slug: 'stats',
              labels: { singular: 'Stats', plural: 'Stats' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'number', type: 'text', admin: { description: 'e.g. "500+" or "99%"' } },
                    { name: 'label', type: 'text' },
                    { name: 'icon', type: 'text', admin: { description: 'Emoji icon (e.g. 🏆)' } },
                  ],
                },
              ],
            },
            {
              slug: 'process',
              labels: { singular: 'Process', plural: 'Process' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'steps',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    { name: 'icon', type: 'text', admin: { description: 'Emoji icon (e.g. 📅)' } },
                  ],
                },
              ],
            },
            {
              slug: 'promo',
              labels: { singular: 'Promo Banner', plural: 'Promo Banners' },
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'buttonText', type: 'text' },
                { name: 'buttonLink', type: 'text' },
                { name: 'backgroundImage', type: 'text', admin: { description: 'Image URL for the banner background' } },
                { name: 'overlayColor', type: 'text', defaultValue: '#0a3d3d', admin: { description: 'Hex overlay color (e.g. #0a3d3d)' } },
                { name: 'overlayOpacity', type: 'number', defaultValue: 70, min: 0, max: 100, admin: { description: 'Overlay opacity 0–100' } },
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
      hooks: {
        afterChange: [revalidateThemeSettings],
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
    {
      slug: 'bgm-settings',
      admin: {
        group: 'Settings',
      },
      fields: [
        { name: 'enableBgm', type: 'checkbox', defaultValue: false, label: 'Enable Background Music' },
        { name: 'audioUrl', type: 'text', admin: { description: 'YouTube link or direct MP3/OGG audio URL' } },
        { name: 'volume', type: 'number', defaultValue: 30, min: 0, max: 100, admin: { description: 'Volume 0–100' } },
      ],
    },
  ],

  secret: process.env.PAYLOAD_SECRET || 'super-secret-change-me',

  db: postgresAdapter({
    pool: poolOptions,
  }),

  sharp,

  onInit: async (payload) => {
    // Always ensure admin@spa.com / admin123 exists
    const adminEmail = 'admin@spa.com'
    const adminPass = 'admin123'
    const existingAdmin = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } }, limit: 1 })
    if (existingAdmin.docs.length > 0) {
      await payload.update({ collection: 'users', id: existingAdmin.docs[0].id, data: { password: adminPass } })
    } else {
      await payload.create({ collection: 'users', data: { email: adminEmail, password: adminPass, name: 'Admin' } })
    }

    // Skip remaining seed if pages already exist
    const existingPages = await payload.find({ collection: 'pages', limit: 1 })
    if (existingPages.docs.length > 0) return

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
          {
            blockType: 'stats',
            heading: 'Our Spa by Numbers',
            description: 'Years of excellence in wellness and relaxation.',
            items: [
              { number: '500+', label: 'Happy Clients', icon: '😊' },
              { number: '10+', label: 'Years Experience', icon: '🌟' },
              { number: '50+', label: 'Expert Therapists', icon: '👩‍⚕️' },
              { number: '4.9', label: 'Average Rating', icon: '⭐' },
            ],
          },
          {
            blockType: 'promo',
            heading: 'Special Spring Offer',
            description: 'Enjoy 20% off on all massage therapies this season. Book your appointment today and experience true relaxation.',
            buttonText: 'Claim Offer',
            buttonLink: '/contact',
            backgroundImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200',
            overlayColor: '#0a3d3d',
            overlayOpacity: 70,
          },
          {
            blockType: 'faq',
            heading: 'Frequently Asked Questions',
            items: [
              { question: 'What should I wear for my massage?', answer: 'We provide comfortable robes and slippers. You can undress to your comfort level; your therapist will drape you professionally throughout the treatment.' },
              { question: 'How early should I arrive?', answer: 'We recommend arriving 15 minutes before your appointment to check in, change, and relax in our waiting area.' },
              { question: 'Do you offer gift certificates?', answer: 'Yes! We offer digital and physical gift certificates for any amount or specific treatment.' },
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
          {
            blockType: 'stats',
            heading: 'Our Journey',
            description: 'Dedicated to wellness since day one.',
            items: [
              { number: '10+', label: 'Years', icon: '📅' },
              { number: '50+', label: 'Therapists', icon: '👩‍⚕️' },
              { number: '500+', label: 'Clients', icon: '😊' },
              { number: '4.9', label: 'Rating', icon: '⭐' },
            ],
          },
          {
            blockType: 'process',
            heading: 'Your Spa Journey',
            description: 'From booking to bliss — here is how it works.',
            steps: [
              { title: 'Choose Your Treatment', description: 'Browse our wide range of spa therapies and select the one that speaks to you.', icon: '📋' },
              { title: 'Book Your Slot', description: 'Pick a convenient date and time through our easy booking system or call us directly.', icon: '📅' },
              { title: 'Arrive & Relax', description: 'Arrive 15 minutes early, change into your robe, and let the stress melt away in our calming lounge.', icon: '🧘' },
              { title: 'Enjoy & Rejuvenate', description: 'Let our expert therapists pamper you with a tailored treatment. You will leave feeling renewed.', icon: '✨' },
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
          {
            blockType: 'map',
            heading: 'Find Us Here',
            address: '123 Wellness Avenue, New York, NY 10001',
            embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919406!2d-73.985428!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU1LjgiTiA3M8KwNTknMDcuNSJX!5e0!3m2!1sen!2sus!4v1!4m8!1m7!1s0x89c259af5b8e3c7f:0x0!2sNew+York!3b1!8m2!3d40.7127753!4d-74.0059728',
            height: 400,
          },
          {
            blockType: 'faq',
            heading: 'Quick Answers',
            items: [
              { question: 'What are your opening hours?', answer: 'We are open Monday to Saturday, 9 AM to 8 PM. Sundays by appointment only.' },
              { question: 'Do I need to book in advance?', answer: 'We recommend booking at least 24 hours in advance to secure your preferred time slot.' },
              { question: 'What payment methods do you accept?', answer: 'We accept cash, all major credit cards, and digital payments.' },
            ],
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

    // Seed BGM settings
    await payload.updateGlobal({
      slug: 'bgm-settings',
      data: {
        enableBgm: true,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        volume: 30,
      },
    })
  },
})
