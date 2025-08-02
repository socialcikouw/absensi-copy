import { useEffect, useState } from "react";
import { dropBaruHarianService } from "../../services/dropbaru/dropBaruHarianService";
import { DropBaruHarianData } from "../../types/dropbaruharian";

export const useDropBaruHarianList = () => {
  const [dropBaruHarianList, setDropBaruHarianList] = useState<
    DropBaruHarianData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDropBaruHarianList = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: serviceError } =
        await dropBaruHarianService.getDropBaruHarianList();

      if (serviceError) {
        console.error("Error fetching drop baru harian list:", serviceError);
        setError("Gagal memuat data drop baru harian");
        setDropBaruHarianList([]);
      } else {
        setDropBaruHarianList(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Terjadi kesalahan yang tidak terduga");
      setDropBaruHarianList([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteDropBaruHarian = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } =
        await dropBaruHarianService.deleteDropBaruHarian(id);

      if (deleteError) {
        console.error("Error deleting drop baru harian:", deleteError);
        return false;
      }

      // Update local state
      setDropBaruHarianList((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error("Unexpected error during deletion:", err);
      return false;
    }
  };

  const refreshList = () => {
    fetchDropBaruHarianList();
  };

  useEffect(() => {
    fetchDropBaruHarianList();
  }, []);

  return {
    dropBaruHarianList,
    loading,
    error,
    refreshList,
    deleteDropBaruHarian,
  };
};
