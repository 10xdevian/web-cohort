import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function App() {
  return (
    <div className=" h-screen bg-[#040710]  text-white">
      <Home />
    </div>
  );
}

export default App;

function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Todo />
      <ToggelModal />
    </div>
  );
}

function Todo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [isLoggedIn]);

  function checkLoginStatus() {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }

  async function fetchTodos() {
    const todosData = await getAllTodos();
    setTodos(todosData);
  }
  return (
    <>
      {isLoggedIn ? (
        <>
          <CreateTodo fetchTodos={fetchTodos} />
          <GetAllTodos todos={todos} />
        </>
      ) : (
        <>
          <div className="">
            <h1>Log in to see the todo</h1>
          </div>
        </>
      )}
      {/* <Navbar setIsLoggedIn={setIsLoggedIn} /> */}
    </>
  );
}

async function getAllTodos() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  const data = await response.json();
  const todos = data.todos;

  console.log(todos[0].title);
  console.log(todos[0].description);
  return todos;
}

function GetAllTodos({ todos }) {
  return (
    <>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <>
            <div key={index} className="bg-gray-400 text-white">
              <h1>{todo.title}</h1>
              <p >{todo.description}</p>
            </div>
          </>
        ))
      ) : (
        <>
          <h1>hy there is no todos</h1>
        </>
      )}
      <div className="flex flex-col">
        {/* <div>{data.title}</div>
          <div>{data.description}</div> */}
        <h1>hy todo</h1>
      </div>
    </>
  );
}

function CreateTodo({ fetchTodos }) {
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });

    
    if (response.ok) {
      const result = await response.json();

      alert(result.msg);
      fetchTodos();
    } else {
      alert("Cant add todo");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-auto flex justify-center mt-10 gap-6"
      >
        <div className="mb-2">
          <label
            for="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            description
          </label>
          <input
            type="text"
            id="description"
            {...register("description")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  px-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </>
  );
}

function Navbar() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedInLocal(!!token); // convert token into boolean
  }, []);

  function handleSignup() {
    setSignupOpen(true);
  }

  function handleLoggedIn() {
    setLoginOpen(true);
  }
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedInLocal(false);
    // setIsLoggedIn(false);
    alert("User Log out");
  }

  return (
    <>
      <div className="flex justify-between p-5 mt-1  ">
        <div>TodoBaba</div>
        <div className="flex justify-between gap-10">
          {!isLoggedInLocal ? (
            <>
              <button
                onClick={handleSignup}
                className="p-3  pl-10 pr-10 rounded-full bg-[#0e1014] cursor-pointer duration-100 outline-[1px] outline-gray-700 hover:outline-gray-500"
              >
                Signup
              </button>

              <button
                onClick={handleLoggedIn}
                className="p-3  pl-10 pr-10 rounded-full bg-[#0e1014] cursor-pointer duration-100 outline-[1px] outline-gray-700 hover:outline-gray-500"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="p-3  pl-10 pr-10 rounded-full bg-[#0e1014] cursor-pointer duration-100 outline-[1px] outline-gray-700 hover:outline-gray-500"
              >
                Logout
              </button>
            </>
          )}
          <ToggelModal
            signupOpen={signupOpen}
            onClose={() => setSignupOpen(false)}
          >
            <div>
              <SignupInput setIsLoggedIn={setIsLoggedInLocal} />
            </div>
          </ToggelModal>

          <ToggelModal
            loginOpen={loginOpen}
            onClose={() => setLoginOpen(false)}
          >
            <div>
              <LoginInput setIsLoggedIn={setIsLoggedInLocal} />
            </div>
          </ToggelModal>
        </div>
      </div>
    </>
  );
}

function LoginInput({ setIsLoggedIn }) {
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); // its return promise add await
    console.log(responseData.token);
    if (responseData.token) {
      localStorage.setItem("token", responseData.token); // store token
      // console.log("Token is Added to the localStorage" + responseData.token);
      setIsLoggedIn(true);
      alert(responseData.msg);
      getAllTodos();
    } else {
      console.log("Signin Failed ", responseData.msg);
      alert("Signin in Failed");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem]">
        <div className="mb-6">
          <label
            for="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User name
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

function SignupInput({ setIsLoggedIn }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = response.json();
      console.log("Signup Sucessfully" + result);

      if (response.ok) {
        setIsLoggedIn(true);
        alert("Signup Sucessfull");
      } else {
        alert("Signup Failed");
      }
    } catch (e) {
      console.error("Signup Error " + e);
      alert("Signup Failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem]">
        <div className="mb-6">
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full name
          </label>
          <input
            type="name"
            id="name"
            {...register("fullname")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Jhon Due"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User name
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

function ToggelModal({ signupOpen, onClose, children, loginOpen }) {
  return (
    <>
      <div
        
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          signupOpen || loginOpen ? "visible bg-black/70" : "invisible"
        }`}
      >
        {/* modal  */}
        {/* pl-10 pr-10 pt-5 pb-5 */}
        <div
          
          onClick={(e) => e.stopPropagation()}
          className={`bg-gray-800 rounded-xl shadow  w-auto h-auto transition-all p-6 ${
            signupOpen || loginOpen
              ? "scale-100 opacity-100 "
              : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="bg-gray-900  absolute top-2 pl-4 pr-4 right-2 rounded-md   hover:text-gray-600 cursor-pointer"
          >
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
