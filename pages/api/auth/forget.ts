import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailSubject, EmailTemplate } from "@/constants/emails/ForgetPassword";
import sendEmail from "@/helpers/sendEmail";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(400).json({});
        return;
      } else {
        const data = { id: user.id };
        const expiresIn = "25m";
        const result = jwt.sign(
          data,
          (user.password + process.env.JWT_SECRET) as string,
          {
            expiresIn,
          }
        );

        const link = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset/${user.id}/${result}`;
        const body = EmailTemplate(link);
        const message = await sendEmail(email, EmailSubject, body);
        if (message === undefined || message === null) {
          res.status(500).json({
            message: "حدث خطأ أثناء إرسال البريد الإلكتروني",
          });
          return;
        }
        res.status(200).json(message);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { id, token, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        res.status(400).json({});
        return;
      } else {
        const payload: any = jwt.verify(
          token,
          user.password + process.env.JWT_SECRET
        );
        if (payload.id !== user.id) {
          res.status(400).json({});
          return;
        }
        await prisma.user.update({
          where: { id },
          data: { password },
        });
        res.status(200).json({});
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  } else if (req.method === "GET") {
    const { token, id } = req.query;
    try {
      const user = await prisma.user.findUnique({
        where: { id: id as string },
      });
      if (!user) {
        res.status(400).json({
          message: "لا يوجد مستخدم بهذا الرابط",
          error: 1,
        });
        return;
      }
      const payload: any = jwt.verify(
        token as string,
        (user.password + process.env.JWT_SECRET) as string
      );
      if (!payload || !payload.id) {
        res.status(400).json({
          message: "رابط إعادة تعيين كلمة المرور غير صالح",
          error: 1,
        });
        return;
      }
      res.status(200).json({});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({});
    return;
  }
};

export default handler;
