import { DataType, FilterType } from "./common";
import { DropBaruHarianData } from "./dropbaruharian";
import { DropLamaHarianData } from "./droplamaharian";

/**
 * Combined Data Interface
 * For displaying mixed drop baru and drop lama data
 */
export interface CombinedData {
  id: string;
  type: DataType;
  data: DropLamaHarianData | DropBaruHarianData;
  timestamp: string;
}

// Re-export FilterType from common for backward compatibility
export { FilterType };
