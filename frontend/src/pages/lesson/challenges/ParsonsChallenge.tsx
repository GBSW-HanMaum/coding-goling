import { useCallback, useEffect, useMemo, useState } from "react";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { cn, shuffle } from "@/lib/utils";

import type { ChallengeProps } from "../types";

type Line = { key: number; text: string };
type Zone = "answer" | "bank";

/**
 * Parsons 문제 — 줄을 드래그해 순서를 맞춘다 (@dnd-kit).
 * 정답 영역 ↔ 라인 은행 사이를 끌어 옮길 수 있고, 각 영역 안에서 재정렬도 된다.
 * 드래그가 어려운 환경(터치/키보드)을 위해 클릭 한 번으로 옮기는 기존 방식도 유지한다.
 */
export const ParsonsChallenge = ({
  challenge,
  status,
  setCanCheck,
  apiRef,
}: ChallengeProps) => {
  const correct = challenge.parsonsLines ?? [];

  const initialBank = useMemo<Line[]>(() => {
    const lines = correct.map((text, i) => ({ key: i, text }));
    // 원래 순서와 다르게 섞기 (운 나쁘면 재시도)
    let s = shuffle(lines);
    if (correct.length > 1 && s.every((l, i) => l.key === i)) s = shuffle(lines);
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.id]);

  const [bank, setBank] = useState<Line[]>(initialBank);
  const [answer, setAnswer] = useState<Line[]>([]);
  const [draggingKey, setDraggingKey] = useState<number | null>(null);

  useEffect(
    () => setCanCheck(answer.length === correct.length),
    [answer, correct.length, setCanCheck]
  );

  const check = useCallback(async () => {
    const ok =
      answer.length === correct.length &&
      answer.every((l, i) => l.text === correct[i]);
    return { correct: ok };
  }, [answer, correct]);
  apiRef.current = { check };

  const locked = status !== "none";

  const sensors = useSensors(
    // 살짝 움직여야 드래그로 인정 → 클릭으로 옮기는 동작과 충돌하지 않게
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const zoneOf = (key: number): Zone =>
    answer.some((l) => l.key === key) ? "answer" : "bank";

  const listOf = (zone: Zone) => (zone === "answer" ? answer : bank);
  const setList = (zone: Zone, next: Line[]) =>
    zone === "answer" ? setAnswer(next) : setBank(next);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggingKey(null);
    if (!over) return;

    const activeKey = Number(active.id);
    const from = zoneOf(activeKey);

    // over가 줄이면 그 줄이 속한 영역, 컨테이너면 그 컨테이너
    const overId = String(over.id);
    const to: Zone =
      overId === "answer" || overId === "bank"
        ? (overId as Zone)
        : zoneOf(Number(over.id));

    const fromList = listOf(from);
    const oldIndex = fromList.findIndex((l) => l.key === activeKey);
    if (oldIndex === -1) return;

    if (from === to) {
      const newIndex = fromList.findIndex((l) => l.key === Number(over.id));
      if (newIndex === -1 || newIndex === oldIndex) return;
      setList(from, arrayMove(fromList, oldIndex, newIndex));
      return;
    }

    // 다른 영역으로 이동 — 놓은 줄의 자리에 끼워넣기 (컨테이너 자체에 놓으면 맨 뒤)
    const line = fromList[oldIndex];
    const toList = listOf(to);
    const overIndex = toList.findIndex((l) => l.key === Number(over.id));
    const insertAt = overIndex === -1 ? toList.length : overIndex;

    setList(
      from,
      fromList.filter((l) => l.key !== activeKey)
    );
    setList(to, [...toList.slice(0, insertAt), line, ...toList.slice(insertAt)]);
  };

  /** 클릭 한 번으로 반대편 영역으로 이동 (드래그 대체 수단) */
  const move = (line: Line) => {
    if (locked) return;
    if (zoneOf(line.key) === "bank") {
      setBank((b) => b.filter((l) => l.key !== line.key));
      setAnswer((a) => [...a, line]);
    } else {
      setAnswer((a) => a.filter((l) => l.key !== line.key));
      setBank((b) => [...b, line]);
    }
  };

  const dragging =
    draggingKey === null
      ? undefined
      : [...answer, ...bank].find((l) => l.key === draggingKey);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }: DragStartEvent) =>
        setDraggingKey(Number(active.id))
      }
      onDragCancel={() => setDraggingKey(null)}
      onDragEnd={onDragEnd}
    >
      <div className="space-y-4">
        <Zone
          id="answer"
          lines={answer}
          locked={locked}
          status={status}
          onLineClick={move}
          empty="아래에서 줄을 끌어오거나 눌러서 순서대로 배치하세요"
        />

        <Zone
          id="bank"
          lines={bank}
          locked={locked}
          status="none"
          onLineClick={move}
          empty="모든 줄을 배치했어요. ‘확인’을 눌러 채점하세요."
        />
      </div>

      {/* 드래그 중 커서를 따라다니는 미리보기 */}
      <DragOverlay>
        {dragging ? (
          <div className="flex items-center gap-x-2 rounded-lg border-2 border-macaw bg-white px-3 py-2 font-mono text-sm text-eel shadow-lg">
            <GripVertical className="h-4 w-4 shrink-0 text-macaw" />
            {dragging.text || " "}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

type ZoneProps = {
  id: Zone;
  lines: Line[];
  locked: boolean;
  status: ChallengeProps["status"];
  empty: string;
  onLineClick: (line: Line) => void;
};

const Zone = ({ id, lines, locked, status, empty, onLineClick }: ZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });
  const isAnswer = id === "answer";

  return (
    <SortableContext
      items={lines.map((l) => l.key)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className={cn(
          "space-y-1.5 rounded-2xl p-3 transition-colors",
          isAnswer
            ? "min-h-[120px] border-2 border-dashed border-swan bg-[#fbfbfb]"
            : "border-2 border-transparent",
          isOver && !locked && "border-macaw bg-macaw-light",
          status === "correct" && "border-feather bg-feather-light",
          status === "wrong" && "border-cardinal bg-cardinal-light"
        )}
      >
        {lines.length === 0 ? (
          <p
            className={cn(
              "text-center text-hare",
              isAnswer ? "py-6 text-sm" : "text-xs"
            )}
          >
            {empty}
          </p>
        ) : (
          lines.map((line) => (
            <SortableLine
              key={line.key}
              line={line}
              zone={id}
              locked={locked}
              onClick={() => onLineClick(line)}
            />
          ))
        )}
      </div>
    </SortableContext>
  );
};

type SortableLineProps = {
  line: Line;
  zone: Zone;
  locked: boolean;
  onClick: () => void;
};

const SortableLine = ({ line, zone, locked, onClick }: SortableLineProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: line.key, disabled: locked });

  return (
    <button
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      onClick={onClick}
      disabled={locked}
      {...attributes}
      {...listeners}
      className={cn(
        "flex w-full touch-none items-center gap-x-2 rounded-lg border-2 bg-white px-3 py-2 text-left font-mono text-sm text-eel transition disabled:opacity-50",
        zone === "bank"
          ? "border-b-4 border-swan hover:bg-polar active:border-b-2"
          : "border-swan hover:border-macaw/60",
        !locked && "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      {!locked && <GripVertical className="h-4 w-4 shrink-0 text-hare" />}
      {line.text || " "}
    </button>
  );
};
