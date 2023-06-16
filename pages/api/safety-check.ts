// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { runSafetyCheck } from "@/lib/safety-check/runSafetyCheck";
import { PiServerSafetyCheck } from "@/lib/safety-check/PiServerSafetyCheck";
import { PiServerSafetyCheckResult } from "@/lib/safety-check/PiServerSafetyCheckResult";
import { getRequestPayload } from "@/lib/config/getRequestPayload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PiServerSafetyCheckResult>
) {
  const options = getRequestPayload<PiServerSafetyCheck[]>(req);
  const invalidBody = !options || !Array.isArray(options);

  if (invalidBody) {
    throw new Error("Missing or invalid body");
  }

  const result = await runSafetyCheck(options);
  res.status(200).json(result);
}
