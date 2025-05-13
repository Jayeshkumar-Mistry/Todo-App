import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbCircleArrowRightFilled } from "react-icons/tb";

import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let savedTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(savedTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = (e) => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id == id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos);
    saveToLS();
  };

  const toggleFinished = (params) => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="Todos flex flex-col items-center w-10/12 md:w-1/2 container bg-[#00CED1] mx-auto my-4 min-h-[80vh] p-4 rounded-lg shadow-lg text-[#003153]">
        <h1 className="font-bold text-lg md:text-2xl text-[#000f89] text-center">
          TaskPoint – Organize. Prioritize. Accomplish.
        </h1>
        <div className="w-full p-3 flex flex-col gap-2 ">
          <h2 className="font-bold tex-md md:text-xl">Add a Todo</h2>
          <div className="flex gap-3 items-center">
            <input
              onChange={handleChange}
              type="text"
              className="bg-white w-full rounded-2xl h-8 px-5 font-bold text-[#003153] border-none"
              value={todo}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="   rounded-4xl  hover:bg-[#15f4ee]  cursor-pointer "
            >
              <TbCircleArrowRightFilled size={40} color="000f89" />
            </button>
          </div>
        </div>
        <div className=" todos w-full flex flex-col p-3 gap-y-4">
          <div className="flex gap-2 font-bold text-[#275656] text-mdTt">
            <input
              type="checkbox"
              checked={showFinished}
              onClick={toggleFinished}
              className="w-4 "
            />
            Show Finished
          </div>
          <div className="border-2 w-11/12 mx-auto opacity-30 bg-[#051119]"></div>
          <h2 className="font-bold text-lg md:text-xl">Your Todos</h2>
          {todos.length === 0 && (
            <div className="text-[#3F00FF]">You have no Todo</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="flex my-2  justify-between  items-center text-[#003153] font-bold text-md md:text-lg"
                >
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name={item.id}
                      checked={item.isCompleted}
                      className="w-4 "
                    />
                    <span className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </span>
                  </div>
                  <div className="buttons flex gap-3 justify-center items-center">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="  cursor-pointer"
                    >
                      <FaRegEdit size={25} color="000f89" />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="  cursor-pointer"
                    >
                      <MdDelete size={25} color="000f89" />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
