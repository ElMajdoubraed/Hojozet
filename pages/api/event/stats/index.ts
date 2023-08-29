// get all events for user authentificated and calculate balance and sats
import { PrismaClient } from "@prisma/client";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(400).json({});
  try {
    const events = await prisma.event.findMany({
      where: { user: { id: req.user.id } },
    });
    const balance = events.reduce((acc, event) => {
      const price = Number(event.price) || 0;
      const number_of_tickets = Number(event.number_of_tickets) || 0;
      return acc + price * number_of_tickets;
    }, 0);
    const sats = balance * 100;
    res.status(200).json({ balance, sats });
  } catch (error) {
    res.status(400).json({});
  }
};

export default auth(handler);
