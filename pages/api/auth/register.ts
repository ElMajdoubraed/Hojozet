import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookies from "@/utils/cookies";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({});
    return;
  }
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        username: name,
        email,
        password: hash,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error,
    });
  }
};

export default cookies(handler);
