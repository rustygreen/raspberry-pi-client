// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { AppConfigProperties } from "@/lib/config/AppConfigProperties";
import { configRepository } from "@/lib/config/configRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppConfigProperties>
) {
  const config = configRepository.load();
  res.status(200).json(config);
}
