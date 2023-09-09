import prisma from "@/utils/db";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const {
        logo,
        name,
        description,
        date,
        price,
        location,
        number_of_tickets,
        primary_color,
        secondary_color,
      } = req.body;
      try {
        await prisma.event.create({
          data: {
            name,
            logo,
            description,
            date,
            price,
            number_of_tickets,
            location,
            primary_color,
            secondary_color,
            user: { connect: { id: req.user.id } },
          },
        });
        res.status(200).json({
          message: "Event created successfully",
        });
      } catch (error) {
        res.status(400).json({
          message: "Something went wrong",
          error,
        });
      }
      break;
    case "GET":
      try {
        const events = await prisma.event.findMany({
          where: { user: { id: req.user.id } },
        });
        res.status(200).json({ events });
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

export default auth(handler);
