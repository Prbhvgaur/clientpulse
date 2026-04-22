import { PrismaClient, ProjectStatus, Visibility, MilestoneStatus, UpdateType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.user.upsert({
    where: { email: "demo@clientpulse.app" },
    update: { name: "Alex Mason" },
    create: {
      email: "demo@clientpulse.app",
      name: "Alex Mason",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    },
  });

  const organization = await prisma.organization.upsert({
    where: { slug: "northstar-studio" },
    update: {},
    create: {
      name: "Northstar Studio",
      slug: "northstar-studio",
      brandColor: "#0f766e",
      logoUrl: "https://dummyimage.com/128x128/0f766e/ffffff.png&text=NS",
      supportEmail: "hello@northstar.studio",
      footerMessage: "Questions? Email hello@northstar.studio.",
      ownerId: owner.id,
      members: {
        create: {
          userId: owner.id,
          role: "OWNER",
        },
      },
    },
  });

  const client = await prisma.client.upsert({
    where: {
      id: "demo-client-id",
    },
    update: {},
    create: {
      id: "demo-client-id",
      name: "Sophie Carter",
      email: "sophie@lumenlabs.co",
      company: "Lumen Labs",
      avatarUrl: "https://dummyimage.com/96x96/164e63/ffffff.png&text=LC",
      organizationId: organization.id,
    },
  });

  const project = await prisma.project.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "clientpulse-launch",
      },
    },
    update: {},
    create: {
      name: "ClientPulse Launch",
      slug: "clientpulse-launch",
      description: "Launch-ready client status portal with milestone visibility, integrations, and white-label branding.",
      status: ProjectStatus.IN_PROGRESS,
      visibility: Visibility.PUBLIC,
      startDate: new Date("2026-04-01T00:00:00.000Z"),
      dueDate: new Date("2026-05-10T00:00:00.000Z"),
      organizationId: organization.id,
      clientId: client.id,
    },
  });

  await prisma.milestone.deleteMany({ where: { projectId: project.id } });
  await prisma.projectUpdate.deleteMany({ where: { projectId: project.id } });

  const milestoneInputs = [
    ["Discovery workshop", "Stakeholder interviews and delivery roadmap", MilestoneStatus.COMPLETED, "2026-04-05"],
    ["Design system", "Moodboard, palette, and reusable UI kit", MilestoneStatus.COMPLETED, "2026-04-12"],
    ["Core dashboard", "Project editor and collaboration workspace", MilestoneStatus.IN_PROGRESS, "2026-04-20"],
    ["Public status page", "Polished client-facing progress page", MilestoneStatus.PENDING, "2026-04-28"],
    ["Launch and QA", "Cross-browser QA, billing, and analytics", MilestoneStatus.PENDING, "2026-05-06"],
  ] as const;

  await prisma.milestone.createMany({
    data: milestoneInputs.map(([title, description, status, dueDate], index) => ({
      title,
      description,
      status,
      dueDate: new Date(`${dueDate}T00:00:00.000Z`),
      completedAt: status === MilestoneStatus.COMPLETED ? new Date(`${dueDate}T16:00:00.000Z`) : null,
      order: index,
      projectId: project.id,
    })),
  });

  const updateInputs = [
    ["Kickoff complete and roadmap approved.", UpdateType.MANUAL, "Alex Mason"],
    ["Repository scaffolded and deployment pipeline connected.", UpdateType.GITHUB_COMMIT, "GitHub Sync"],
    ["Shared component library ready for dashboard implementation.", UpdateType.MANUAL, "Alex Mason"],
    ["Milestone \"Discovery workshop\" marked complete.", UpdateType.MILESTONE_COMPLETED, "Alex Mason"],
    ["Brand system approved by client.", UpdateType.MANUAL, "Alex Mason"],
    ["Merged pull request for initial auth and middleware setup.", UpdateType.GITHUB_PR_MERGED, "GitHub Sync"],
    ["Milestone \"Design system\" marked complete.", UpdateType.MILESTONE_COMPLETED, "Alex Mason"],
    ["Client requested analytics summary card on the public page.", UpdateType.MANUAL, "Alex Mason"],
    ["Dashboard editor now supports drag-and-drop milestone ordering.", UpdateType.MANUAL, "Alex Mason"],
    ["Release candidate queued for QA review.", UpdateType.STATUS_CHANGED, "Alex Mason"],
  ] as const;

  for (const [index, [content, type, authorName]] of updateInputs.entries()) {
    await prisma.projectUpdate.create({
      data: {
        content,
        type,
        authorName,
        projectId: project.id,
        createdAt: new Date(Date.now() - (updateInputs.length - index) * 1000 * 60 * 60 * 6),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
