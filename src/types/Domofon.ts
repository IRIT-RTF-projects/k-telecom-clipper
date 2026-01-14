import type { Stream } from './Admin';

export type Domofon = {
  id: number;
  title: string;
  subtitle?: string;
  stream: Stream;
};