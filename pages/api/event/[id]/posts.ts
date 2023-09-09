import prisma from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany({
          where: { event: { id: Number(req.query.id) } },
        });
        res.status(200).json({ posts });
      } catch (error) {
        res.status(400).json({});
      }
      break;
    default:
      res.status(400).json({
        message: "Only GET requests allowed",
      });
  }
};

export default handler;
