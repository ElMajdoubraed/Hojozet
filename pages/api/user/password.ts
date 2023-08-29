import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(400).json({});
  const { password, newPassword } = req.body;

  const match = await bcrypt.compareSync(password, req.user.password);

  if (match) {
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);
    req.user.password = hashedPassword;
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });
    return res.status(200).json({});
  }
  res.status(400).json({});
};

export default auth(handler);
