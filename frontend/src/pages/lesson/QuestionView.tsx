import type { Challenge } from "@/data/types";

/**
 * 질문 프롬프트 + (선택적) 코드 블록.
 * 예전에는 question 을 "\n\n" 으로 쪼개 코드를 뽑았는데, 구분자를 빠뜨린 문제는
 * 코드가 아예 안 보이는 버그가 났다. 이제 codeSnippet 필드로 명시한다.
 */
export const QuestionView = ({ challenge }: { challenge: Challenge }) => (
  <div className="space-y-3">
    <h1 className="whitespace-pre-wrap text-xl font-extrabold leading-snug text-eel lg:text-2xl">
      {challenge.question}
    </h1>
    {challenge.codeSnippet && (
      <pre className="overflow-x-auto rounded-2xl border-2 border-swan bg-[#1f2937] p-4 font-mono text-sm leading-6 text-[#e5e7eb]">
        {challenge.codeSnippet}
      </pre>
    )}
  </div>
);
