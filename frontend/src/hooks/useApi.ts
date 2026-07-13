import { useCallback, useEffect, useState } from "react";

/**
 * 서버 데이터 조회용 최소 훅 — { data, loading, error, reload }.
 * (react-query 를 새로 들이기엔 화면 3개뿐이라 과함)
 */
export const useApi = <T>(fetcher: () => Promise<T>, deps: unknown[] = []) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fetcher, deps);

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setData(await run());
    } catch (e) {
      setError(e instanceof Error ? e.message : "불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  }, [run]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
