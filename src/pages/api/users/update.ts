import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { name } = req.body;

    const updateUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: String(name),
      },
    });
    if (updateUser) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  await prisma.$disconnect();
}
