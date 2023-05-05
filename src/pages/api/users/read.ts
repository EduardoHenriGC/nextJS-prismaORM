import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const user = await prisma.user.findMany();

    res.status(201).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  await prisma.$disconnect();
}
