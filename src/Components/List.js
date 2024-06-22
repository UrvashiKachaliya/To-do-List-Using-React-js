import React, { useEffect, useState } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function List() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  

  useEffect(() => {
    fetchTodos();
  
  }, []);



  async function AddTodos() {
    let data = { todo };

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("message", result);

    if (result) {
      alert("Data added");
      setTodo("");
      fetchTodos();
     
    } else {
      console.error("Error adding todo:", result);
    }
  }

  async function fetchTodos() {
    const result = await fetch("http://localhost:3000/todos");
    const data = await result.json();

    if (result) {
      setTodos(data);
    
    } else {
      console.error("Error fetching todos:", data);
    }
  }
  async function deleteTodo(id) {
    let userid=id;
    console.log(userid)
    
        let result = await fetch(`http://localhost:3000/todos/${userid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

         result = await result.json();

        if (result) {
            alert("Todo deleted successfully");
            fetchTodos(); 
        } 
}

//CLEAR ALL ITEMS
async function clearAllItems() {
  let result = await fetch("http://localhost:3000/todos/clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  result = await result.json();

  if (result) {
    alert("All todos deleted successfully");
    fetchTodos();
  } else {
    console.error("Error clearing all todos:", result);
  }
}


  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        className="p-4 border-0"
        style={{
          width: "32rem",
          height: "auto",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Card.Body style={{ maxHeight: "50vh", overflowY: "auto" }}>
          <h3 className="text-center">Todo List</h3>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Input Your Todo-list"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />

            <InputGroup.Text
              className="bg-primary text-white px-4"
              style={{ cursor: "pointer" }}
              onClick={AddTodos}
            >
              Add
            </InputGroup.Text>
          </InputGroup>
          {todos.map((item) => (
            <InputGroup className="mb-3" key={item.id}>
              <Form.Control value={item.todo} readOnly></Form.Control>
              <InputGroup.Text className="px-3" style={{ cursor: "pointer" }}>
                <EditIcon className="text-success" />
              </InputGroup.Text>
              <InputGroup.Text className="px-3" style={{ cursor: "pointer" }} onClick={() => deleteTodo(item.id)}>
                <DeleteIcon className="text-danger" />
              </InputGroup.Text>
            </InputGroup>
          ))}
       
        </Card.Body>
      </Card>
    </Container>
  );
}