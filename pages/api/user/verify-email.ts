import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import sendEmail from "@/helpers/sendEmail";
import { EmailSubject, EmailTemplate } from "@/constants/emails/VerifEmail";
import auth from "@/utils/auth";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.user;
  if (req.method === "POST") {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(400).json({});
        return;
      } else {
        if (user.emailVerified) {
          res.status(400).json({
            message: "تم التحقق من البريد الإلكتروني بالفعل",
            error: 1,
          });
          return;
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const body = EmailTemplate(code.toString());
        const message = await sendEmail(email, EmailSubject, body);
        if (message === undefined || message === null) {
          res.status(500).json({
            message: "حدث خطأ أثناء إرسال البريد الإلكتروني",
          });
          return;
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerificationCode: code.toString() },
        });
        res.status(200).json(message);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { code } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(400).json({});
        return;
      } else {
        if (user.emailVerified) {
          res.status(400).json({
            message: "تم التحقق من البريد الإلكتروني بالفعل",
            error: 1,
          });
          return;
        }
        if (user.emailVerificationCode !== code) {
          res.status(400).json({
            message: "رمز التحقق غير صحيح",
            error: 1,
          });
          return;
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
        res.status(200).json({
          message: "تم التحقق من البريد الإلكتروني بنجاح",
          error: 0,
        });
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  } else {
    res.status(401).json({});
    return;
  }
};

export default auth(handler);
