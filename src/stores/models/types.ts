import type { CornerType, DistanceType, JudgeType } from "./enums";
import type { Corner } from "./interfaces";

export type AcceptCornerInvite = {
  id: string; // inviteId, used to delete invite.
  cornerId: string; // used to find Corner for update.
  displayName: string; // used for TeamMember info in Corner.
  sub: string;
};

export type DistanceMetas = {
  id: string;
  judges?: Judge[] | null;
  predictions?: Prediction[] | null;
  props?: Props | null;
  syncs?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Judge = {
  id: string;
  bio?: string | null;
  firstName: string;
  lastName: string;
  tagline?: string | null;
  type: JudgeType;
  createdAt?: string;
  updatedAt?: string;
};

export type Manager = {
  id: string;
  chatKey?: string | null;
  notes?: string | null;
};

export type Prediction = {
  id: string; // sub + fightIdd
  distanceId: string;
  prediction: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Props = {
  id: string; // distanceId.
  moneyline?: Record<string, string>[] | null;
  overUnder?: Record<string, Record<string, string>> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RoundScore = {
  isDirty?: boolean;
  notes?: string | null;
  round: number;
  scores: Record<string, number>[];
};

export type ScorecardMetas = {
  analysis?: string | null;
  corners?: Corner[];
  displayName: string;
  finalScore?: number | null;
  prediction?: Prediction | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ScoringType = CornerType | DistanceType;

export type Syncs = {
  chatkey?: string | null;
  video?: boolean;
};

export type TeamMember = {
  displayName: string;
  id: string;
  notes?: string | null;
};

export type UIMetas = {
  description: string | null;
  parent: string | null;
  storyline: string | null;
  subtitle: string | null;
  title: string;
  typeIds: string[];
  starts: string;
  ends: string | null;
  createdAt?: string;
  updatedAt?: string;
};
