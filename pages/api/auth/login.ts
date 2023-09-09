import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookies from "@/utils/cookies";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({});
    return;
  }
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return res.status(400).json({});

  const match = await bcrypt.compareSync(password, user.password);
  if (!match) return res.status(400).json({});

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  res.cookie("accessToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });
  res.status(200).json({});
};

export default cookies(handler);
