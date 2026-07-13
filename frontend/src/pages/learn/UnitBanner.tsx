import { NotebookText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";

type UnitBannerProps = {
  title: string;
  description: string;
  activeLessonId?: string;
};

export const UnitBanner = ({
  title,
  description,
  activeLessonId,
}: UnitBannerProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-coral p-5 text-white">
      <div className="space-y-1.5">
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="text-lg opacity-90">{description}</p>
      </div>

      {activeLessonId && (
        <Button
          size="lg"
          variant="secondaryOutline"
          onClick={() => navigate(`/lesson/${activeLessonId}`)}
          className="hidden xl:flex"
        >
          <NotebookText className="mr-2 h-5 w-5" />
          이어하기
        </Button>
      )}
    </div>
  );
};
