import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    if (deletedUser) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  await prisma.$disconnect();
}
