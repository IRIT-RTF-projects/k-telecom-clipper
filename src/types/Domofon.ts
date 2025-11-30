// src/types/Domofon.ts
import type { Stream } from "./Admin";

/**
 * Domofon — публичная (пользовательская) версия Stream.
 * Убираем приватные/админские поля: rtspUrl, assignedUsers, userCount.
 */
export type Domofon = Omit<Stream, "rtspUrl" | "assignedUsers" | "userCount"> & {
  // Можно расширить публичную модель дополнительными полями для UI,
  // например: shortLabel?: string;
};
