import { useMemo } from "react";
import type { Dispatch } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions } from "../reducers/activity-reducer";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const categoryName = (categoryId: Activity["category"]) => {
  const found = categories.find(cat => cat.id === categoryId);
  return found ? found.name : "";
};

  const isEmpty = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      <h2 className="text-4xl font-black text-gray-800 text-center">
        Meals and Exercises
      </h2>

      {isEmpty ? (
        <p className="text-center mt-12 text-gray-800/60">
          No meals or exercises yet..
        </p>
      ) : (
        activities.map((activity) => (
          <div
            className="bg-white mt-5 flex justify-between gap-12 shadow-current drop-shadow-lg  rounded-lg p-6 my-4 text-sky-800"
            key={activity.id}
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-6 -left-6 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-green-600" : "bg-orange"
                } rounded-br-xl rounded-tl-lg`}
              >
                {categoryName(activity.category)}
              </p>
              <div className="flex flex-col justify-center gap-2 mt-8">
                <h3 className="text-xl font-black text-black">
                  {activity.name}
                </h3>
                <h2 className={`text-3xl font-black ${
                  activity.category === 1 ? "text-green-600" : "text-orange"
                }`}>
                  {activity.calories} {""}
                  <span>Calories</span>
                </h2>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_ACTIVE_ID",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="w-8 h-8 text-sky-950 hover:text-sky-950/65 cursor-pointer transition duration-200" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "DELETE_ACTIVITY",
                    payload: { id: activity.id },
                  })
                }
              >
                <TrashIcon className="w-8 h-8 text-red-500 hover:text-red-500/65 cursor-pointer transition duration-200" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
