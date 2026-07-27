import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existing = await prisma.user.findUnique({ where: { email: "admin@spa.com" } });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: "admin@spa.com",
          password: await bcrypt.hash("admin123", 10),
          name: "Admin",
        },
      });
    }

    // Reset database to ensure new widgets populate cleanly
    await prisma.widget.deleteMany();
    await prisma.page.deleteMany();
    await prisma.themeSetting.deleteMany();

    const home = await prisma.page.create({
      data: {
        slug: "home",
        title: "Home",
        metaTitle: "Luxury Spa & Wellness | Relax & Rejuvenate",
        metaDesc: "Experience premium spa treatments, massages, and wellness therapies. Book your session today for ultimate relaxation.",
      },
    });

    const about = await prisma.page.create({
      data: {
        slug: "about",
        title: "About Us",
        metaTitle: "About Our Spa | Our Story & Team",
        metaDesc: "Learn about our spa's journey, our expert therapists, and our commitment to your wellness.",
      },
    });

    const contact = await prisma.page.create({
      data: {
        slug: "contact",
        title: "Contact Us",
        metaTitle: "Contact Our Spa | Book an Appointment",
        metaDesc: "Get in touch with us. Book appointments, ask questions, or visit our spa location.",
      },
    });

    const widgets = [
      { type: "hero", pageId: home.id, order: 0, title: "Welcome Hero", content: JSON.stringify({ heading: "Everyone deserves a good massage", subheading: "Sephoraspa", description: "Discover unparalleled relaxation and luxury at Sephoraspa, with premium locations. Experience our exquisite interiors, expert therapists, and exceptional hospitality.", buttonText: "CALL NOW", buttonLink: "/contact", image: "/hero-bg.png" }) },
      { type: "features", pageId: home.id, order: 1, title: "Our Services", content: JSON.stringify({ heading: "Our Premium Services", items: [{ title: "Swedish Massage", description: "Gentle full-body massage for deep relaxation", icon: "💆" }, { title: "Hot Stone Therapy", description: "Warm basalt stones to melt away tension", icon: "🪨" }, { title: "Aromatherapy", description: "Essential oils tailored to your needs", icon: "🌸" }, { title: "Facial Treatments", description: "Rejuvenating facials for glowing skin", icon: "✨" }] }) },
      { type: "video", pageId: home.id, order: 2, title: "Spa Experience Video", content: JSON.stringify({ heading: "Experience The Serenity", description: "Take a virtual tour of our state-of-the-art facilities and witness the luxury relaxation journey that awaits you.", buttonLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200" }) },
      { type: "gallery", pageId: home.id, order: 3, title: "Spa Gallery", content: JSON.stringify({ heading: "Our Relaxation Sanctuary", description: "A glimpse inside our premium day spa rooms, healing therapy suites, and calming lounge areas." }) },
      { type: "packages", pageId: home.id, order: 4, title: "Spa Packages", content: JSON.stringify({ heading: "Our Wellness Packages", description: "Choose the perfect package tailored to your body and mind's rejuvenation needs." }) },
      { type: "testimonials", pageId: home.id, order: 5, title: "Testimonials", content: JSON.stringify({ heading: "What Our Clients Say", items: [{ title: "Sarah Johnson", description: "The best spa experience I've ever had. The atmosphere was incredible and the staff were wonderful." }, { title: "Michael Chen", description: "I feel completely renewed after every visit. The hot stone therapy is a must-try!" }, { title: "Emily Davis", description: "Professional, relaxing, and luxurious. This is my go-to place for self-care." }] }) },
      { type: "content", pageId: about.id, order: 0, title: "About Content", content: JSON.stringify({ heading: "Our Story", description: "Founded in 2010, Serenity Spa has been dedicated to providing world-class wellness experiences. Our team of certified therapists brings together traditional techniques and modern innovations to create the perfect relaxation journey for every client.\n\nWe believe that self-care is not a luxury—it's a necessity. Our carefully curated treatments are designed to restore balance, reduce stress, and enhance your natural well-being." }) },
      { type: "features", pageId: about.id, order: 1, title: "Why Choose Us", content: JSON.stringify({ heading: "Why Choose Us", items: [{ title: "Expert Therapists", description: "Certified professionals with years of experience", icon: "👩‍⚕️" }, { title: "Organic Products", description: "Natural and eco-friendly products only", icon: "🌿" }, { title: "Peaceful Ambiance", description: "Calming environment designed for relaxation", icon: "🕯️" }, { title: "Customized Care", description: "Treatments tailored to your unique needs", icon: "❤️" }] }) },
      { type: "contact", pageId: contact.id, order: 0, title: "Contact Form", content: JSON.stringify({ heading: "Get In Touch", description: "We'd love to hear from you. Reach out for bookings, inquiries, or just to say hello." }) },
      { type: "content", pageId: contact.id, order: 1, title: "Location Info", content: JSON.stringify({ heading: "Visit Us", description: "123 Wellness Avenue\nSuite 100\nNew York, NY 10001\n\nPhone: (555) 123-4567\nEmail: hello@serenityspa.com\n\nMon-Fri: 9AM - 8PM\nSat: 10AM - 6PM\nSun: Closed" }) },
    ];

    for (const w of widgets) {
      await prisma.widget.create({ data: w as any });
    }

    const themeKeys = ["primaryColor", "secondaryColor", "accentColor", "fontFamily", "borderRadius", "logoText", "phone", "email"];
    for (const key of themeKeys) {
      let val = "";
      if (key === "primaryColor") val = "#0e1311";
      else if (key === "secondaryColor") val = "#d4af37";
      else if (key === "accentColor") val = "#f7f4eb";
      else if (key === "fontFamily") val = "'Playfair Display', 'Inter', sans-serif";
      else if (key === "borderRadius") val = "8px";
      else if (key === "logoText") val = "Sephoraspa";
      else if (key === "phone") val = "(555) 123-4567";
      else if (key === "email") val = "hello@sephoraspa.com";

      await prisma.themeSetting.upsert({
        where: { key },
        update: { value: val },
        create: { key, value: val },
      });
    }

    return Response.json({ success: true, message: "Seed data recreated successfully" });
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
