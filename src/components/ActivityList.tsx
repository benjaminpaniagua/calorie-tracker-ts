import React from "react";
import type { Activity } from "../types";

type ActivityListProps = {
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
  console.log(activities);
  return (
    <>
      <h1 className="text-4xl font-bold text-zinc-700 text-center">
        Meals and Exercises
      </h1>
      {activities.map((activity) => (
        <div
          className="bg-white shadow shadow-current rounded-lg p-6 my-4"
          key={activity.id}
        >
          <div className="space-y-2 relative">
            <p className="text-2xl font-bold">
              {activity.category}
            </p>
            <h4 className="text-lg font-bold">{activity.name}</h4>
            <h5 className="text-3xl font-black text-lime-500">
              {activity.calories} {''}<span>Calories</span>
            </h5>
          </div>
          <div></div>
        </div>
      ))}
    </>
  );
}
