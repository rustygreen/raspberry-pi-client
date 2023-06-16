// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Drainer } from "@/lib/drain/Drainer";
import { DrainStatus } from "@/lib/drain/DrainStatus";
import { DrainOptions } from "@/lib/drain/DrainOptions";
import { getRequestPayload } from "@/lib/config/getRequestPayload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DrainStatus>
) {
  const options = getRequestPayload<DrainOptions>(req);
  const drainer = new Drainer(options);

  try {
    drainer.drain();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    res.status(200).json(drainer.status);
  }
}
