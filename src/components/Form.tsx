import { useState, Dispatch } from "react";

import { v4 as uuidv4 } from "uuid";

import { Activity } from "../types";
import { categories } from "../data/categories";
import type { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
};

const initialState : Activity = {
    id: uuidv4(),
  category: 0,
  name: "",
  calories: 0,
};

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    //this line says that parameter e can be either a select or an input element
    const isNumberField = ["category", "calories"].includes(e.target.id); //check if the id of the element is either category or calories

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? parseInt(e.target.value) : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { category, name, calories } = activity;
    return name.trim() !== "" && category !== 0 && calories > 0; //check if the name is not empty, the category is not 0 and the calories are greater than 0
  };

  const addActivity = () => {
    const { category } = activity;
    if (category === 0) {
      return "Select a category";
    } else if (category === 1) {
      return "Add Meal";
    } else if (category === 2) {
      return "Add Exercise";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent the default behavior of the form

    dispatch({
      type: "SAVE_ACTIVITY",
      payload: { newActivity: activity },
    });
    setActivity({
        ...initialState,
        id: uuidv4(), //inyect a new id
    }); //reset the form
  };

  return (
    <form
      className="space-y-4 bg-white shadow-md rounded-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="category" className="font-bold text-lg">
          Categories:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          <option key={0} value={0} selected>
            Select a category
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="name" className="font-bold text-lg">
          Activity:
        </label>
        <input
          id="name"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          type="text"
          placeholder="Running, Walking, Cycling, Salad, Breakfast, Lunch, Dinner..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="calories" className="font-bold text-lg">
          Calories:
        </label>
        <input
          id="calories"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          type="number"
          placeholder="300, 400, 500..."
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-400 hover:bg-gray-600 text-white font-bold py-2 rounded-lg uppercase w-full cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        value={addActivity()}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
