// prisma/seed.ts
import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      // Sample bcrypt-hashed password string
      password: "$2a$12$eImiTXuWVxfM37uY4JANjO5E/1rQGj01lJ9m/iQO4e2ZgY.1X1mK.",
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user seeded: ${adminUser.email}`);

  // 2. Seed Categories
  const webDevCategory = await prisma.category.upsert({
    where: { slug: "web-development" },
    update: {},
    create: {
      title: "Web Development",
      slug: "web-development",
    },
  });

  const fullStackCategory = await prisma.category.upsert({
    where: { slug: "full-stack" },
    update: {},
    create: {
      title: "Full Stack",
      slug: "full-stack",
    },
  });
  console.log("✅ Categories seeded");

  // 3. Seed Images
  const heroCover = await prisma.postImage.create({
    data: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
      key: "sample-hero-cover-key",
    },
  });

  const galleryImage1 = await prisma.postImage.create({
    data: {
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
      key: "sample-gallery-1-key",
    },
  });
  console.log("✅ PostImages seeded");

  // 4. Seed Projects
  const portfolioProject = await prisma.project.upsert({
    where: { slug: "customizable-portfolio-cms" },
    update: {},
    create: {
      title: "Customizable Portfolio CMS",
      slug: "customizable-portfolio-cms",
      description:
        "A dynamic portfolio platform with an interactive viewer interface and an administrative CMS back-office built with Next.js App Router, Prisma, PostgreSQL, and UploadThing.",
      featured: true,
      order: 1,
      mainImageId: heroCover.id,
      categories: {
        connect: [{ id: webDevCategory.id }, { id: fullStackCategory.id }],
      },
      images: {
        connect: [{ id: galleryImage1.id }],
      },
    },
  });
  console.log(`✅ Sample Project seeded: ${portfolioProject.title}`);

  console.log("🎉 Seeding finished successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });