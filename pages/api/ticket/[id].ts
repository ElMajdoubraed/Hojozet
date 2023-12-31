import prisma from "@/utils/db";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "DELETE":
      try {
        const { id } = req.query;
        const ticket = await prisma.ticket.deleteMany({
          where: {
            code: Number(id),
          },
        });
        res.status(200).json(ticket);
      } catch (error) {
        res.status(400).json({ message: "Something went wrong" });
      }
      break;
    case "GET":
      try {
        const { id } = req.query;
        const ticket = await prisma.ticket.findFirst({
          where: {
            code: Number(id),
          },
          include: {
            event: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });
        res.status(200).json(ticket);
      } catch (error) {
        res.status(400).json({ message: "Something went wrong" });
      }
      break;
    default:
      res.status(400).json({ message: "Something went wrong" });
      break;
  }
};

export default auth(handler);
