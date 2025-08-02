import { DropBaruHarianData } from "./dropbaruharian";
import { DropLamaHarianData } from "./droplamaharian";

export type FilterType = "all" | "lama" | "baru";

export interface CombinedData {
  id: string;
  type: "lama" | "baru";
  data: DropLamaHarianData | DropBaruHarianData;
  timestamp: string;
}