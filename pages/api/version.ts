// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as pack from "../../package.json";

type AppInfo = {
  name: string;
  version: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppInfo>
) {
  res.status(200).json({
    name: pack.name,
    version: pack.version
  });
}
