import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../ContextApi/UserContext";

const initialstate = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const Authentication = () => {
  const [state, setState] = useState(initialstate);
  const [signUp, setSignUp] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = state;
  const { setUser } = useContext(UserContext);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (signUp) {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      if (firstName && lastName && email && password) {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(user, { displayName: `${firstName} ${lastName}` });
          setUser({ displayName: `${firstName} ${lastName}`, email: user.email });
          toast.success("Account created successfully");
          navigate("/");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("All fields are mandatory to fill");
      }
    } else {
      // Sign-in logic
      if (email && password) {
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          setUser({ displayName: user.displayName, email: user.email });
          toast.success("Signed in successfully");
          navigate("/");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Please enter email and password");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 w-full lg:h-screen h-screen items-center p-5 bg-gray-900">
      <div className="w-full  p-5 text-white">
        <h1 className="xl:text-5xl text-3xl font-semibold text-center pb-2">Hii there,</h1>
        <h2 className="text-center xl:text-5xl text-2xl font-semibold mb-4 text-white pb-3">
          {signUp ? "Create your Account" : "Login in to your Accout"}
        </h2>
        <form onSubmit={handleAuth} className="grid gap-4">
          {signUp && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                  onChange={handleChange}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {!signUp && (
            <div className="grid gap-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                className="px-2 py-3 border border-gray-300 bg-gray-800 mb-2"
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit" className="px-2 py-3 border border-gray-300 bg-white text-black mb-2 tracking-wider">
            {signUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {signUp ? (
            <p className="text-lg font-medium tracking-wider">
              Already have an account?{" "}
              <span className="text-blue-500 underline cursor-pointer" onClick={() => setSignUp(false)}>
                Sign In
              </span>
            </p>
          ) : (
            <p className="text-lg font-medium tracking-wider">
              Do not have an account?{" "}
              <span className="text-blue-500 underline cursor-pointer" onClick={() => setSignUp(true)}>
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="">
        <div className="w-full text-center flex justify-center  h-[600px] rounded-2xl">
          <img
            className="w-full max-w-xl h-full object-cover rounded-2xl"
            src="https://fps.cdnpk.net/images/ai/image-generator/gallery/resource-tti-15.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
