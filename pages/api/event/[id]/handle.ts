import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const event = await prisma.event.findUnique({
          where: { id: Number(req.query.id) },
        });
        res.status(200).json({ event });
      } catch (error) {
        res.status(400).json({});
      }
      break;
    case "POST":
      try {
        const { name, user_id, event_id } = req.body;
        await prisma.ticket.create({
          data: {
            ticketName: name,
            user: { connect: { id: user_id } },
            event: { connect: { id: Number(event_id) } },
          },
        });
        res.status(200).json({});
      } catch (error) {
        res.status(400).json({});
      }
      break;
    default:
      res.status(400).json({
        message: "Only GET and POST requests allowed",
      });
      break;
  }
};

export default handler;
