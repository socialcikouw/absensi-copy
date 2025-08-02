import { useEffect, useState } from "react";
import { dropLamaHarianService } from "../../services/droplama/dropLamaHarianService";
import { DropLamaHarianData } from "../../types/droplamaharian";

export const useDropLamaHarianList = () => {
  const [dropLamaHarianList, setDropLamaHarianList] = useState<
    DropLamaHarianData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDropLamaHarianList = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: serviceError } =
        await dropLamaHarianService.getDropLamaHarianList();

      if (serviceError) {
        console.error("Error fetching drop lama harian list:", serviceError);
        setError("Gagal memuat data drop lama harian");
        setDropLamaHarianList([]);
      } else {
        setDropLamaHarianList(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Terjadi kesalahan yang tidak terduga");
      setDropLamaHarianList([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteDropLamaHarian = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } =
        await dropLamaHarianService.deleteDropLamaHarian(id);

      if (deleteError) {
        console.error("Error deleting drop lama harian:", deleteError);
        return false;
      }

      // Update local state
      setDropLamaHarianList((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error("Unexpected error during deletion:", err);
      return false;
    }
  };

  const refreshList = () => {
    fetchDropLamaHarianList();
  };

  useEffect(() => {
    fetchDropLamaHarianList();
  }, []);

  return {
    dropLamaHarianList,
    loading,
    error,
    refreshList,
    deleteDropLamaHarian,
  };
};
