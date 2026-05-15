import type { InvestigationScene } from "../../core/types";

export interface OfficeProgress {
  foundCount: number;
  totalCount: number;
  complete: boolean;
}

export function getOfficeProgress(scene: InvestigationScene, foundHotspotIds: readonly string[]): OfficeProgress {
  const totalCount = scene.hotspots.length;
  const foundCount = scene.hotspots.filter((hotspot) => foundHotspotIds.includes(hotspot.id)).length;

  return {
    foundCount,
    totalCount,
    complete: totalCount > 0 && foundCount >= totalCount
  };
}
