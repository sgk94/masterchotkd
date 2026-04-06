import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const tinyTigers = await prisma.program.upsert({
    where: { slug: "tiny-tigers" },
    update: {},
    create: {
      name: "Tiny Tigers",
      slug: "tiny-tigers",
      description:
        "Designed for our youngest students in mind, this program focuses on teaching foundational life skills accompanied by listening, following directions, and self-confidence.",
      ageRange: "Ages 4-6",
      order: 1,
    },
  });

  const blackBeltClub = await prisma.program.upsert({
    where: { slug: "black-belt-club" },
    update: {},
    create: {
      name: "Black Belt Club",
      slug: "black-belt-club",
      description:
        "Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace.",
      ageRange: "All ages",
      order: 2,
    },
  });

  const leadershipClub = await prisma.program.upsert({
    where: { slug: "leadership-club" },
    update: {},
    create: {
      name: "Leadership Club",
      slug: "leadership-club",
      description:
        "For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand.",
      ageRange: "Advanced students",
      order: 3,
    },
  });

  const competitionTeam = await prisma.program.upsert({
    where: { slug: "competition-team" },
    update: {},
    create: {
      name: "Competition Team",
      slug: "competition-team",
      description:
        "For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques.",
      ageRange: "Tournament athletes",
      order: 4,
    },
  });

  await prisma.classSchedule.createMany({
    data: [
      {
        programId: tinyTigers.id,
        dayOfWeek: 1,
        startTime: "16:00",
        endTime: "16:45",
        instructor: "Master Cho",
        capacity: 15,
      },
      {
        programId: tinyTigers.id,
        dayOfWeek: 3,
        startTime: "16:00",
        endTime: "16:45",
        instructor: "Master Cho",
        capacity: 15,
      },
      {
        programId: blackBeltClub.id,
        dayOfWeek: 1,
        startTime: "17:00",
        endTime: "18:00",
        instructor: "Master Cho",
        capacity: 25,
      },
      {
        programId: blackBeltClub.id,
        dayOfWeek: 3,
        startTime: "17:00",
        endTime: "18:00",
        instructor: "Master Cho",
        capacity: 25,
      },
      {
        programId: blackBeltClub.id,
        dayOfWeek: 5,
        startTime: "17:00",
        endTime: "18:00",
        instructor: "Master Cho",
        capacity: 25,
      },
      {
        programId: leadershipClub.id,
        dayOfWeek: 2,
        startTime: "18:00",
        endTime: "19:00",
        instructor: "Master Cho",
        capacity: 20,
      },
      {
        programId: leadershipClub.id,
        dayOfWeek: 4,
        startTime: "18:00",
        endTime: "19:00",
        instructor: "Master Cho",
        capacity: 20,
      },
      {
        programId: competitionTeam.id,
        dayOfWeek: 6,
        startTime: "10:00",
        endTime: "12:00",
        instructor: "Master Cho",
        capacity: 15,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Christina Michelle",
        rating: 5,
        text: "Great for kids and great discipline! Great instructors as well.",
        featured: true,
        order: 1,
      },
      {
        name: "Louis Good",
        rating: 5,
        text: "Chief Master Cho is a excellent and patient instructor that runs a fantastic school!",
        featured: true,
        order: 2,
      },
      {
        name: "Julana Phan",
        rating: 5,
        text: "Great instructor. If you want your kid to learn confident, self-defense & discipline. Good place to go.",
        featured: true,
        order: 3,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
