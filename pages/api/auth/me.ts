import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: {
    id: string;
    username: string;
    email: string;
  };
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id, username, email } = req.user;
  res.status(200).json({
    data: {
      id,
      name: username,
      email,
    },
  });
};

export default auth(handler);
