import { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/configureStore";

interface InputValue {
  name: string;
  email: string;
  password: string;
}

interface ErrorMsg {
  name: string;
  email: string;
  password: string;
  generic: string;
}

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState<InputValue>({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    name: "",
    email: "",
    password: "",
    generic: "",
  });

  const { loading, error } = useSelector((state: any) => state.user);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInputValue((prevValue) => ({ ...prevValue, [name]: value }));
    setErrorMsg((prevError) => ({ ...prevError, [name]: "", generic: "" }));
  };

  const validateForm = () => {
    const errors: any = {};
    if (!inputValue.name.trim()) {
      errors.name = "Name is required";
    }
    if (!inputValue.email.trim()) {
      errors.email = "Email is required";
    }
    if (!inputValue.password.trim()) {
      errors.password = "Password is required";
    } else if (inputValue.password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
    }

    setErrorMsg(errors);

    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      dispatch(registerUser(inputValue))
      .then((result:any) => {
        if (result.payload) {
          setInputValue({ name: "", email: "", password: "" });
          navigate("/login");
        }
      });
    }
  };



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl mb-4">Register</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              value={inputValue.name}
              onChange={handleChange}
              placeholder="Enter name..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errorMsg.email && (
              <p className="text-red-500 text-xs italic">{errorMsg.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              placeholder="Enter email..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errorMsg.email && (
              <p className="text-red-500 text-xs italic">{errorMsg.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={inputValue.password}
              onChange={handleChange}
              placeholder="Enter password..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errorMsg.password && (
              <p className="text-red-500 text-xs italic">{errorMsg.password}</p>
            )}
            {error && (
              <p className="text-red-500 text-xs italic">{error}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="checkbox"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <span>~ for login</span>
              <span className="ml-1">
                <u>Click here</u>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "loading" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
