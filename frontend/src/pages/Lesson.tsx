import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { findLesson } from "@/data/content";

import { Quiz } from "./lesson/Quiz";

export const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const found = lessonId ? findLesson(lessonId) : undefined;

  if (!found) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <p className="text-lg font-bold text-wolf">레슨을 찾을 수 없어요.</p>
        <Button variant="primary" onClick={() => navigate("/learn")}>
          학습으로 돌아가기
        </Button>
      </div>
    );
  }

  return <Quiz key={found.lesson.id} lesson={found.lesson} />;
};
