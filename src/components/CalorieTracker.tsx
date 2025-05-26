import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};
export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(() => {
    return activities.reduce(
      (total, activity) =>
        activity.category === 1 ? total + +activity.calories : total,
      0
    );
  }, [activities]);

  const caloriesBurned = useMemo(() => {
    return activities.reduce(
      (total, activity) =>
        activity.category === 2 ? total + +activity.calories : total,
      0
    );
  }, [activities]);

  const diferenceCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calorie Summary
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 mt-10">
        <CalorieDisplay text="Consumed" calories={caloriesConsumed} />
        <CalorieDisplay text="Burned" calories={caloriesBurned} />
        <CalorieDisplay text="Diference" calories={diferenceCalories} />
      </div>
    </>
  );
}
