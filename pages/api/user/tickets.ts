import prisma from "@/utils/db";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const tickets = await prisma.ticket.findMany({
          where: {
            userId: req.user.id,
          },
        });
        res.status(200).json(tickets);
      } catch (error) {
        res.status(400).json({});
      }
      break;
    default:
      res.status(400).json({
        message: "Only GET requests allowed",
      });
      break;
  }
};

export default auth(handler);
