import prisma from "@/utils/db";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const reservations = await prisma.ticket.findMany({
          where: {
            eventId: Number(req.query.id),
          },
        });
        res.status(200).json(reservations);
      } catch (error) {
        res.status(400).json({
          message: "Something went wrong",
          error,
        });
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
