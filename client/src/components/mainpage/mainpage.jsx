import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ALL_TODOS } from "../../redux/types/index";
import Todo from "../ToDo";

function ToDos() {
  const toDos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch("//localhost:3001/todos",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const serverResponse = await response.json();
      dispatch({
        type: ALL_TODOS,
        payload: serverResponse,
      });
    })();
  }, []);

  return (
    <div>
      <Todo toDoValue={toDos} />;
    </div>
  );
}

export default ToDos;
