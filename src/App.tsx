import Form from "./components/Form"

function App() {

  return (
    <div>
      <header className="bg-lime-600 py-3">
        <div className="mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Calories Tracker</h1>
        </div>
      </header>


      <section className="bg-lime-500 py-20 px-5">
        <div className="mx-auto max-w-2xl">
            <Form />
        </div>
      </section>
    </div>
  )
}

export default App
