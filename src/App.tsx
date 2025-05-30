import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );
  return (
    <div>
      <header className="bg-green" >
        <div className="flex justify-between p-2 items-center mx-auto max-w-4xl">
          <a
            href="/"
            className="text-center text-lg font-bold text-white uppercase"
          >
            Calories Tracker
          </a>
          <button
            className="bg-green-600 hover:bg-green-600/80 text-white font-bold px-4 py-2 rounded-lg uppercase transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canRestartApp}
            title="Restart the app"
            onClick={() => dispatch({ type: "RESTART_APP" })}
          >
            Restart App
          </button>
        </div>
      </header>

      <section className="bg-green/90 py-20 px-5">
        <div className="mx-auto max-w-2xl">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 p-10 text-white">
        <div className="mx-auto max-w-2xl">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </div>
  );
}

export default App;
