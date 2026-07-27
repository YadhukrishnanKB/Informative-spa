const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: "admin@spa.com" } });
  if (!existing) {
    await prisma.user.create({
      data: { email: "admin@spa.com", password: await bcrypt.hash("admin123", 10), name: "Admin" },
    });
    console.log("Admin user created");
  }

  const home = await prisma.page.upsert({
    where: { slug: "home" }, update: {},
    create: { slug: "home", title: "Home", metaTitle: "Luxury Spa & Wellness | Relax & Rejuvenate", metaDesc: "Experience premium spa treatments, massages, and wellness therapies." },
  });
  const about = await prisma.page.upsert({
    where: { slug: "about" }, update: {},
    create: { slug: "about", title: "About Us", metaTitle: "About Our Spa | Our Story & Team", metaDesc: "Learn about our spa journey and our expert therapists." },
  });
  const contact = await prisma.page.upsert({
    where: { slug: "contact" }, update: {},
    create: { slug: "contact", title: "Contact Us", metaTitle: "Contact Our Spa | Book an Appointment", metaDesc: "Get in touch with us." },
  });

  const count = await prisma.widget.count();
  if (count === 0) {
    const widgets = [
      { type: "hero", pageId: home.id, order: 0, title: "Welcome Hero", content: JSON.stringify({ heading: "Welcome to Serenity Spa", subheading: "Experience Ultimate Relaxation", description: "Indulge in our premium spa treatments designed to rejuvenate your body, mind, and soul.", buttonText: "Book Now", buttonLink: "/contact", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200" }) },
      { type: "features", pageId: home.id, order: 1, title: "Our Services", content: JSON.stringify({ heading: "Our Premium Services", items: [{ title: "Swedish Massage", description: "Gentle full-body massage for deep relaxation", icon: "💆" }, { title: "Hot Stone Therapy", description: "Warm basalt stones to melt away tension", icon: "🪨" }, { title: "Aromatherapy", description: "Essential oils tailored to your needs", icon: "🌸" }, { title: "Facial Treatments", description: "Rejuvenating facials for glowing skin", icon: "✨" }] }) },
      { type: "testimonials", pageId: home.id, order: 2, title: "Testimonials", content: JSON.stringify({ heading: "What Our Clients Say", items: [{ title: "Sarah Johnson", description: "The best spa experience ever!" }, { title: "Michael Chen", description: "I feel completely renewed after every visit." }, { title: "Emily Davis", description: "Professional, relaxing, and luxurious." }] }) },
      { type: "content", pageId: about.id, order: 0, title: "About Content", content: JSON.stringify({ heading: "Our Story", description: "Founded in 2010, Serenity Spa has been dedicated to providing world-class wellness experiences." }) },
      { type: "features", pageId: about.id, order: 1, title: "Why Choose Us", content: JSON.stringify({ heading: "Why Choose Us", items: [{ title: "Expert Therapists", description: "Certified professionals", icon: "👩‍⚕️" }, { title: "Organic Products", description: "Natural and eco-friendly", icon: "🌿" }, { title: "Peaceful Ambiance", description: "Calming environment", icon: "🕯️" }, { title: "Customized Care", description: "Treatments tailored to you", icon: "❤️" }] }) },
      { type: "contact", pageId: contact.id, order: 0, title: "Contact Form", content: JSON.stringify({ heading: "Get In Touch", description: "We would love to hear from you." }) },
      { type: "content", pageId: contact.id, order: 1, title: "Location Info", content: JSON.stringify({ heading: "Visit Us", description: "123 Wellness Avenue\nNew York, NY 10001\n\nPhone: (555) 123-4567\nEmail: hello@serenityspa.com" }) },
    ];
    for (const w of widgets) { await prisma.widget.create({ data: w }); }
    console.log("Widgets created");
  }

  const themeSettings = { primaryColor: "#0a3d3d", secondaryColor: "#d4a373", accentColor: "#e8c7a7", fontFamily: "Inter, sans-serif", borderRadius: "8px" };
  for (const [key, value] of Object.entries(themeSettings)) {
    await prisma.themeSetting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log("Theme settings created");
  console.log("Seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
