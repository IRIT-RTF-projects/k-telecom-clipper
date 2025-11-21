export interface Point {
  x: number;
  y: number;
}

export interface Polygon {
  points: Point[];
  id: string;
}

export interface Domofon {
  id: string;
  address: string;
  entrance: string;
}