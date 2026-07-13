import { useState } from "react";

import { Gem, Loader2 } from "lucide-react";

import { Loading, LoadError } from "@/components/AsyncState";
import { FeedWrapper, StickyWrapper } from "@/components/Layout";
import { UserProgress } from "@/components/UserProgress";
import { Button } from "@/components/ui/Button";
import { useApi } from "@/hooks/useApi";
import { ApiError, shopApi, type ShopItem } from "@/lib/api";
import { cn } from "@/lib/utils";
import { MAX_ENERGY, useGame } from "@/store/useGame";

/**
 * 상점 (GET /shop/items, POST /shop/purchase).
 * 젬 검증과 차감은 서버가 한다 — 프론트는 결과로 돌아온 progress 로 스토어를 맞출 뿐이다.
 */
export const Shop = () => {
  const gems = useGame((s) => s.gems);
  const energy = useGame((s) => s.energy);
  const hydrate = useGame((s) => s.hydrate);

  const { data: items, loading, error, reload } = useApi(() => shopApi.items());
  const [buying, setBuying] = useState<string>();
  const [msg, setMsg] = useState<{ text: string; ok: boolean }>();

  const buy = async (item: ShopItem) => {
    setBuying(item.id);
    setMsg(undefined);
    try {
      const result = await shopApi.purchase(item.id);
      hydrate(result.progress); // 서버가 계산한 젬/에너지로 갱신
      setMsg({ text: `‘${item.title}’ 구매 완료!`, ok: true });
      void reload(); // owned 표시 갱신
    } catch (e) {
      setMsg({
        text: e instanceof ApiError ? e.message : "구매하지 못했어요.",
        ok: false,
      });
    } finally {
      setBuying(undefined);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-x-12">
      <StickyWrapper>
        <UserProgress />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex flex-col items-center gap-y-2 pb-6 pt-2">
          <span className="text-5xl">🛍️</span>
          <h1 className="text-2xl font-extrabold text-eel">상점</h1>
          <div className="flex items-center gap-x-1.5 font-extrabold text-macaw">
            <Gem className="h-5 w-5 fill-macaw/20" />
            {gems} 젬
          </div>
        </div>

        {msg && (
          <div
            className={cn(
              "mb-4 rounded-xl px-4 py-2 text-center text-sm font-bold",
              msg.ok
                ? "bg-macaw-light text-macaw"
                : "bg-cardinal-light text-cardinal"
            )}
          >
            {msg.text}
          </div>
        )}

        {loading && <Loading />}
        {error && <LoadError message={error} onRetry={reload} />}

        {items && (
          <ul className="space-y-3">
            {items.map((item) => {
              // 에너지가 가득이면 refill 은 살 이유가 없다 (서버는 허용하지만 젬 낭비 방지)
              const full = item.action === "refill" && energy >= MAX_ENERGY;
              const affordable = gems >= item.costGems && !full;
              const isBuying = buying === item.id;

              return (
                <li
                  key={item.id}
                  className="flex items-center gap-x-4 rounded-2xl border-2 border-swan p-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-polar text-3xl">
                    {item.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-x-2 font-extrabold text-eel">
                      {item.title}
                      {item.owned && (
                        <span className="rounded-full bg-feather-light px-2 py-0.5 text-[10px] font-extrabold text-feather">
                          보유 중
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-wolf">{item.description}</p>
                  </div>
                  <Button
                    variant={affordable ? "primary" : "locked"}
                    disabled={!affordable || isBuying}
                    onClick={() => buy(item)}
                    className="min-w-[96px] gap-x-1"
                  >
                    {isBuying ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : full ? (
                      "가득 참"
                    ) : (
                      <>
                        <Gem className="h-4 w-4" />
                        {item.costGems}
                      </>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </FeedWrapper>
    </div>
  );
};
