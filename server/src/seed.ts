import prisma from "./db.ts";

await prisma.user.create({
  data: {
    email: "a@b.com",
    name: "Arpan Das",
    password: "12345678"
  },
});
