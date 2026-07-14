import { FeedWrapper, StickyWrapper } from "@/components/Layout";
import { Promo } from "@/components/Promo";
import { QuestsRail } from "@/components/QuestsRail";
import { UserProgress } from "@/components/UserProgress";
import { Button } from "@/components/ui/Button";
import { courseById, courses } from "@/data/content";
import { cn } from "@/lib/utils";
import { useGame } from "@/store/useGame";

import { Unit } from "./learn/Unit";

export const Learn = () => {
  const activeCourse = useGame((s) => s.activeCourse);
  const setCourse = useGame((s) => s.setCourse);
  const completedLessons = useGame((s) => s.completedLessons);
  const completedChallenges = useGame((s) => s.completedChallenges);

  const course = courseById(activeCourse);

  // 코스 전체 레슨을 순서대로 평탄화해 진행 상태를 계산
  const flat = course.units.flatMap((u) => u.lessons);
  const activeIdx = flat.findIndex((l) => !completedLessons[l.id]);
  const activeLessonId = activeIdx === -1 ? undefined : flat[activeIdx].id;
  const finalLessonId = flat[flat.length - 1]?.id;

  const statusOf = (lessonId: string): "done" | "active" | "locked" => {
    const idx = flat.findIndex((l) => l.id === lessonId);
    if (activeIdx === -1 || idx < activeIdx) return "done";
    if (idx === activeIdx) return "active";
    return "locked";
  };

  const activeLesson = activeIdx === -1 ? undefined : flat[activeIdx];
  const activePercentage = activeLesson
    ? Math.round(
        (activeLesson.challenges.filter((c) => completedChallenges[c.id])
          .length /
          activeLesson.challenges.length) *
          100
      )
    : 0;

  return (
    <div className="flex flex-row-reverse gap-x-12">
      <StickyWrapper>
        <UserProgress />

        {/* 코스 스위처 */}
        <div className="space-y-2 rounded-2xl border-2 border-swan p-3">
          <p className="px-1 text-xs font-bold uppercase tracking-wide text-hare">
            코스
          </p>
          {courses.map((co) => (
            <Button
              key={co.id}
              variant={co.id === activeCourse ? "sidebarActive" : "sidebar"}
              onClick={() => setCourse(co.id)}
              className="h-12 w-full justify-start gap-x-3 normal-case"
            >
              <span className="text-xl">{co.emoji}</span>
              <span className="font-bold">{co.title}</span>
            </Button>
          ))}
        </div>

        <Promo />
        <QuestsRail />
      </StickyWrapper>

      <FeedWrapper>
        <div className="sticky top-0 z-30 -mx-4 mb-4 flex items-center gap-x-3 border-b-2 border-swan bg-white px-4 py-3 lg:mx-0 lg:rounded-b-2xl lg:px-5">
          <span className="text-2xl">{course.emoji}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-hare">
              코딩고링 · {course.title}
            </p>
            <h1 className="text-lg font-extrabold text-eel">
              {course.description}
            </h1>
          </div>
        </div>

        {course.units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              unit={unit}
              statusOf={statusOf}
              activeLessonId={
                unit.lessons.some((l) => l.id === activeLessonId)
                  ? activeLessonId
                  : undefined
              }
              activePercentage={activePercentage}
              finalLessonId={finalLessonId}
            />
          </div>
        ))}

        <div className={cn("py-6 text-center text-sm text-hare")}>
          {activeIdx === -1
            ? "🎉 이 코스의 모든 레슨을 완료했어요!"
            : "레슨을 눌러 학습을 시작하세요."}
        </div>
      </FeedWrapper>
    </div>
  );
};
