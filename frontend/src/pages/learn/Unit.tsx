import type { Unit as UnitType } from "@/data/types";

import { LessonButton } from "./LessonButton";
import { UnitBanner } from "./UnitBanner";

type UnitProps = {
  unit: UnitType;
  statusOf: (lessonId: string) => "done" | "active" | "locked";
  activeLessonId?: string;
  activePercentage: number;
  finalLessonId?: string;
};

export const Unit = ({
  unit,
  statusOf,
  activeLessonId,
  activePercentage,
  finalLessonId,
}: UnitProps) => (
  <>
    <UnitBanner
      title={unit.title}
      description={unit.description}
      activeLessonId={activeLessonId}
    />

    <div className="relative flex flex-col items-center pt-2">
      {unit.lessons.map((lesson, i) => {
        const status = statusOf(lesson.id);
        return (
          <LessonButton
            key={lesson.id}
            id={lesson.id}
            index={i}
            status={status}
            isFinal={lesson.id === finalLessonId}
            percentage={status === "active" ? activePercentage : 0}
          />
        );
      })}
    </div>
  </>
);
