import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/configureStore";

interface UserCredentia {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<UserCredentia>({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
    generic: "",
  });

  const validateForm = () => {
    const errors: any = {};

    if (!inputValue.email.trim()) {
      errors.email = "Email is required";
    }    if (!inputValue.password.trim()) {
      errors.password = "Password is required";
    } else if (inputValue.password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
    }

    setErrorMsg(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInputValue((prevValue) => ({ ...prevValue, [name]: value }));
    setErrorMsg((prevError) => ({ ...prevError, [name]: "", generic: "" }));
  };

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      dispatch(loginUser(inputValue))
      .then((result:any) => {
        if (result.payload) {
          setInputValue({ email: "", password: "" });
          navigate("/home");
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl mb-4">Login</h2>

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
            {errorMsg.generic && (
              <p className="text-red-500 text-xs italic">{errorMsg.generic}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="checkbox"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <span>~ Create account</span>
              <span className="ml-1">
                <u onClick={()=>navigate('/register')}>Click here</u>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
