import prisma from "@/utils/db";
import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PUT":
      const { name, description, date, location } = req.body;
      try {
        await prisma.event.update({
          where: { id: Number(req.query.id) },
          data: {
            name,
            description,
            date,
            location,
          },
        });
        res.status(200).json({});
      } catch (error) {
        res.status(400).json({});
      }
      break;
    case "DELETE":
      try {
        await prisma.event.delete({
          where: { id: Number(req.query.id) },
        });
        res.status(200).json({});
      } catch (error) {
        res.status(400).json({});
      }
      break;
    case "POST":
      try {
        const { title, content } = req.body;
        await prisma.post.create({
          data: {
            title,
            content,
            event: { connect: { id: Number(req.query.id) } },
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

export default auth(handler);
