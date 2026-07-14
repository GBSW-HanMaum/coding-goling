import { Button } from "./ui/Button";

/** 우측 레일 업셀 카드 (초안: 데모용). */
export const Promo = () => (
  <div className="space-y-3 rounded-2xl border-2 border-swan p-4">
    <div className="flex items-center gap-x-2">
      <span className="text-2xl">💎</span>
      <h3 className="text-lg font-extrabold text-eel">코딩고링 Super</h3>
    </div>
    <p className="text-sm text-wolf">
      에너지 무한 · 광고 없이 학습에 집중하세요.
    </p>
    <Button variant="super" size="lg" className="w-full">
      무료로 체험하기
    </Button>
  </div>
);
