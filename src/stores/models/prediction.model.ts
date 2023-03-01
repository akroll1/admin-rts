export interface Prediction {
    predictionId: string; // sub + fightId, just like scorecard
    fightId: string // convenience when querying
    prediction: string;
    createdAt: string;
    updatedAt: string;
  }