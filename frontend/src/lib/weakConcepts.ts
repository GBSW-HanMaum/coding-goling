import { allChallenges, findChallengeContext } from "@/data/content";
import { CONCEPT_LABEL, type ConceptTag } from "@/data/types";
import type { WeakConcept } from "@/lib/api";

export type ConceptStat = {
  tag: ConceptTag;
  label: string;
  attempts: number;
  wrong: number;
  accuracy: number; // 0~1
};

/** 오답노트 한 줄 — 개념 집계가 아니라 "이 문제를 몇 번 틀렸는지"를 그대로 보여준다 */
export type WrongNoteEntry = {
  challengeId: string;
  question: string;
  lessonId: string;
  lessonTitle: string;
  conceptLabels: string[];
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

/**
 * 오답노트 — 한 번이라도 틀린 "개별 문제"를 그 문제·레슨 정보와 함께 늘어놓는다.
 * rollUpByConcept이 "반복문에서 자주 틀려요" 같은 개념 단위 요약이라면,
 * 이건 "이 문제를 다시 풀어보세요" 처럼 구체적인 문제 단위 목록이다.
 */
export const buildWrongNotes = (rows: WeakConcept[]): WrongNoteEntry[] =>
  rows
    .filter((row) => row.wrongCount > 0)
    .map((row) => {
      const ctx = findChallengeContext(row.challengeId);
      if (!ctx) return null; // 콘텐츠에서 사라진 문제 (기록만 남은 경우)
      return {
        challengeId: row.challengeId,
        question: ctx.challenge.question,
        lessonId: ctx.lesson.id,
        lessonTitle: ctx.lesson.title,
        conceptLabels: (ctx.challenge.conceptTags ?? []).map((t) => CONCEPT_LABEL[t]),
        attempts: row.attemptCount,
        wrong: row.wrongCount,
        accuracy: row.attemptCount === 0 ? 0 : (row.attemptCount - row.wrongCount) / row.attemptCount,
      };
    })
    .filter((x): x is WrongNoteEntry => x !== null)
    .sort((a, b) => b.wrong - a.wrong || a.accuracy - b.accuracy);
