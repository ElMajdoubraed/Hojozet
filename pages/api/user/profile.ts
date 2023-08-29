import { PrismaClient } from "@prisma/client";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(400).json({});
  const { name, email } = req.body;
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { username: name, email },
    });
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({});
  }
};

export default auth(handler);
