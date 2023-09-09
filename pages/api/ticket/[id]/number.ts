import prisma from "@/utils/db";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const ticket = await prisma.ticket.findMany({
          where: {
            event: {
              id: Number(id),
            },
          },
        });
        res.status(200).json(ticket.length);
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
