import { useState } from "react";
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
    <div className="ml-30 mr-30 ">
      <Navbar />
      <ToggelModal />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between p-5 mt-1  ">
        <div>TodoBaba</div>
        <div className="flex justify-between gap-10">
          <button
            onClick={() => setOpen(true)}
            className="p-3  pl-10 pr-10 rounded-full bg-[#0e1014] cursor-pointer duration-100 outline-[1px] outline-gray-700 hover:outline-gray-500"
          >
            Signup
          </button>

          <button
            onClick={() => setOpen(true)}
            className="p-3  pl-10 pr-10 rounded-full bg-[#0e1014] cursor-pointer duration-100 outline-[1px] outline-gray-700 hover:outline-gray-500"
          >
            Login
          </button>

          <ToggelModal open={open} onClose={() => setOpen(false)}>
            <div>
              <SignupInput />
            </div>
          </ToggelModal>
        </div>
      </div>
    </>
  );
}

function LoginInput() {
  return (
    <>
      <h1>Hello i am Login </h1>
    </>
  );
}

function SignupInput() {
  const { register, handleSubmit } = useForm();

  const onSumbit = async (data) => {
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
      <form onSubmit={handleSubmit(onSumbit)} className="w-[20rem]">
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

function ToggelModal({ open, onClose, children }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/70" : "invisible"
        }`}
      >
        {/* modal  */}
        {/* pl-10 pr-10 pt-5 pb-5 */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-gray-800 rounded-xl shadow  w-auto h-auto transition-all p-6 ${
            open ? "scale-100 opacity-100 " : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="bg-gray-900  absolute top-2 pl-4 pr-4 right-2 rounded-full   hover:text-gray-600 cursor-pointer"
          >
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
