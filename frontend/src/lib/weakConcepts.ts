import { allChallenges } from "@/data/content";
import { CONCEPT_LABEL, type ConceptTag } from "@/data/types";
import type { WeakConcept } from "@/lib/api";

export type ConceptStat = {
  tag: ConceptTag;
  label: string;
  attempts: number;
  wrong: number;
  accuracy: number; // 0~1
};

/**
 * 서버는 challenge_id 별 오답 수만 준다 (개념 태그는 content.ts 가 갖고 있으므로).
 * 여기서 태그별로 굴려 합쳐 "반복문에서 자주 틀려요" 같은 문구를 만들 재료를 만든다.
 */
export const rollUpByConcept = (rows: WeakConcept[]): ConceptStat[] => {
  const byId = new Map(allChallenges().map((c) => [c.id, c]));
  const acc = new Map<ConceptTag, { attempts: number; wrong: number }>();

  for (const row of rows) {
    const tags = byId.get(row.challengeId)?.conceptTags;
    if (!tags) continue; // 콘텐츠에서 사라진 문제 (기록만 남은 경우)

    for (const tag of tags) {
      const cur = acc.get(tag) ?? { attempts: 0, wrong: 0 };
      cur.attempts += row.attemptCount;
      cur.wrong += row.wrongCount;
      acc.set(tag, cur);
    }
  }

  return [...acc.entries()]
    .map(([tag, { attempts, wrong }]) => ({
      tag,
      label: CONCEPT_LABEL[tag],
      attempts,
      wrong,
      accuracy: attempts === 0 ? 0 : (attempts - wrong) / attempts,
    }))
    .sort((a, b) => b.wrong - a.wrong || a.accuracy - b.accuracy);
};
