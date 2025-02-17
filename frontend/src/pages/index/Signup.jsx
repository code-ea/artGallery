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

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const isValidName = (name) => /^[A-Za-z]+$/.test(name);

  const handleSignup = async () => {
    if (firstName == "" || lastName == "" || email == "" || password == "") {
      toast.error("Fields cannot be empty");
      return;
    }
    if (!isValidName(firstName)) {
      toast.error("First name must contain only letters");
      return;
    }
    if (!isValidName(lastName)) {
      toast.error("Last name must contain only letters");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://art-gallery-five-tan.vercel.app/api/v1/user/signup",
        {
          email,
          firstName,
          lastName,
          password,
          role
        }
      );
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        const { role } = response.data; // Assuming backend sends { role: "admin" | "user" }
        localStorage.setItem("role", role);

        // Redirect to respective dashboard
        navigate(role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center bg-black from-blue-500 via-purple-500 to-pink-500">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-opacity-90 relative">
          <Heading label={"Sign up"} className="text-4xl font-bold text-center text-indigo-600 mb-6" />
          <SubHeading label={"Enter your information to create an account"} className="text-lg text-gray-600 text-center mb-6" />

          {/* First Name */}
          <InputBox
            placeholder="Nitin"
            label={"First Name"}
            onchange={(e) => setFirstName(e.target.value)}
            className="mb-4"
          />

          {/* Last Name */}
          <InputBox
            placeholder="Singh"
            label={"Last Name"}
            onchange={(e) => setLastName(e.target.value)}
            className="mb-4"
          />

          {/* Email */}
          <InputBox
            placeholder="nitin@gmail.com"
            label={"Email"}
            onchange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />

          {/* Password */}
          <InputBox
            placeholder="********"
            type="password"
            label={"Password"}
            onchange={(e) => setPassword(e.target.value)}
            className="mb-6"
          />

          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">role</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={role === "USER"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-5 w-5 text-indigo-600"
                />
                <span className="ml-2">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === "ADMIN"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-5 w-5 text-indigo-600"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="pt-6">
            <Button
              onClick={handleSignup}
              label={"Sign up"}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg"
              disabled={loading}
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

          {/* Already have an account */}
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
            className="mt-6 text-center text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};