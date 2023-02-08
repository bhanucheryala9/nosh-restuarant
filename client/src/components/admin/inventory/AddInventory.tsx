import React, { useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "set_name":
      return { ...state, name: action.payload };
    case "set_email":
      return { ...state, email: action.payload };
    case "set_message":
      return { ...state, message: action.payload };
    case "reset":
      return { name: "", email: "", message: "" };
    default:
      return state;
  }
};

function Form() {
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    dispatch({ type: "reset" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={state.name}
          onChange={(event) =>
            dispatch({ type: "set_name", payload: event.target.value })
          }
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={state.email}
          onChange={(event) =>
            dispatch({ type: "set_email", payload: event.target.value })
          }
        />
      </label>
      <label>
        Message:
        <textarea
          value={state.message}
          onChange={(event) =>
            dispatch({ type: "set_message", payload: event.target.value })
          }
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
