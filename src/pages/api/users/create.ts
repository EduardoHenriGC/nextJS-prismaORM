import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
      },
    });

    res.status(201).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  await prisma.$disconnect();
}
