import type { MutableRefObject } from "react";

import type { Challenge } from "@/data/types";

export type Status = "none" | "correct" | "wrong";

export type CheckResult = { correct: boolean; message?: string };

export type ChallengeApi = { check: () => Promise<CheckResult> };

export type ChallengeProps = {
  challenge: Challenge;
  status: Status;
  setCanCheck: (v: boolean) => void;
  apiRef: MutableRefObject<ChallengeApi | undefined>;
};
