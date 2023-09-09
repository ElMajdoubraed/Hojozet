import prisma from "@/utils/db";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

interface DecodedInterface {
  id: string;
  iat: number;
  exp: number;
}

async function check(req: NextApiRequest, res: NextApiResponse) {
  const decoded: DecodedInterface = jwt.verify(
    req.cookies?.accessToken as string,
    process.env.JWT_SECRET as string
  ) as DecodedInterface;
  if (decoded?.id) {
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (user) return user;
  }
  throw new Error();
}

const auth =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.user = await check(req, res);
      return handler(req, res);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "أنت غير مصرح لك بالدخول لهذه الصفحة !",
      });
    }
  };

export const isOwner = async (menuId: number, userId: string) => {
  try {
    const menu: any = await prisma.event.findUnique({
      where: { id: menuId },
    });
    if (menu?.owner?.toString() === userId) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export default auth;
