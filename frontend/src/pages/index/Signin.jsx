import axios from "axios";
import { BottomWarning } from "../../components/BottomWarning";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { InputBox } from "../../components/InputBox";
import { SubHeading } from "../../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../../components/Loader.css";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true); // Show loader while signing in
    try {
      const response = await axios.post("https://art-gallery-five-tan.vercel.app/api/v1/user/signin", {
        email: username,
        password,
      });
      if (response.status === 200) {
        const { role } = response.data; // Assuming backend sends { role: "admin" | "user" }
        localStorage.setItem("role", role);

        // Redirect to respective dashboard
        navigate(role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Hide loader when done
    }
  };

  return (
    <div>
      
      <div className="h-screen flex items-center justify-center bg-black from-green-400 via-blue-500 to-indigo-600">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-xl shadow-2xl rounded-3xl relative">
          <Heading label={"Sign in"} className="text-pink-600 text-4xl font-bold text-center shadow-md mb-4" />
          <SubHeading
            label={"Enter your credentials to access your account"}
            className="text-yellow-600 text-lg text-center mt-2 mb-4"
          />

          {/* Email Input */}
          <InputBox
            placeholder="nitin@gmail.com"
            label={"Email"}
            onchange={(e) => setUsername(e.target.value)}
            className="mt-6"
          />

          {/* Password Input */}
          <InputBox
            type="password"
            placeholder="••••••"
            label={"Password"}
            onchange={(e) => setPassword(e.target.value)}
            className="mt-4"
          />

          {/* Sign-in Button */}
          <div className="pt-6">
            <Button
              label={"Sign in"}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleSignIn}
            />
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 rounded-lg">
              <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
              </div>
            </div>
          )}

          {/* Sign-up Prompt */}
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
            className="mt-4 text-center text-white"
          />
        </div>
      </div>
    </div>
  );
};