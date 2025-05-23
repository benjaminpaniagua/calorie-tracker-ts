import { useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"

function App() {

  const [state ,dispatch] = useReducer(activityReducer, initialState)
  console.log(state)
  return (
    <div>
      <header className="bg-lime-500 py-3 border-b-2 border-lime-100 ">
        <div className="mx-auto flex justify-between">
          <a href="/" className="text-center text-lg font-bold text-white uppercase">Calories Tracker</a>
        </div>
      </header>


      <section className="bg-lime-500 py-20 px-5">
        <div className="mx-auto max-w-2xl">
            <Form 
            dispatch={dispatch}
            />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
            <ActivityList 
              activities={state.activities}
            />
      </section>


    </div>
  )
}

export default App
