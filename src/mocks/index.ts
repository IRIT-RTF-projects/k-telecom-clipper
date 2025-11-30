export { mockStreams } from "./streams";
export { mockUsers } from "./users";

import { mockStreams as _mockStreams } from "./streams";
import type { Domofon } from "../types/Domofon";

export const mockDomofons: Domofon[] = _mockStreams.map((s) => ({
  id: s.id,
  address: s.address,
  entrance: s.entrance,
  isOnline: s.isOnline,
  lastActive: s.lastActive ?? "",
}));
