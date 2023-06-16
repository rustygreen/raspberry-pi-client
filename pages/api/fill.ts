// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Filler } from "@/lib/fill/Filler";
import { FillStatus } from "@/lib/fill/FillStatus";
import { FillOptions } from "@/lib/fill/FillOptions";
import { getRequestPayload } from "@/lib/config/getRequestPayload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FillStatus>
) {
  const options = getRequestPayload<FillOptions>(req);
  const filler = new Filler(options);

  try {
    filler.fill();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    res.status(200).json(filler.status);
  }
}
