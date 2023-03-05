export interface Prediction {
    predictionId: string; // sub + id, just like scorecard
    id: string // convenience when querying
    prediction: string;
    createdAt: string;
    updatedAt: string;
  }