import type { Activity } from "../types";

export type ActivityActions =
  | { type: "SAVE_ACTIVITY"; payload: { newActivity: Activity } }
  | { type: "SET_ACTIVE_ID"; payload: { id: Activity["id"] } }
  | { type: "DELETE_ACTIVITY"; payload: { id: Activity["id"] } }
  | { type: "RESTART_APP" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  // if(action.type === 'SAVE_ACTIVITY') {
  //     return {
  //         ...state,
  //         activities: [...state.activities, action.payload.newActivity]
  //     }
  // }

  switch (action.type) {
    case "SAVE_ACTIVITY": {
      let updateActivities: Activity[] = [];
      if (state.activeId) {
        updateActivities = state.activities.map((activity) =>
          activity.id === state.activeId ? action.payload.newActivity : activity
        );
      } else {
        updateActivities = [...state.activities, action.payload.newActivity];
      }
      return {
        ...state,
        activities: updateActivities,
        activeId: "",
      };
    }
    case "SET_ACTIVE_ID":
      return {
        ...state,
        activeId: action.payload.id,
      };
    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload.id
        ),
      };
    case "RESTART_APP":
      return {
        activities: [],
        activeId: "",
      };
    default:
      return state;
  }

  return state;
};
