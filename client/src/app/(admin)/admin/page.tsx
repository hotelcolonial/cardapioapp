"use client";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/app/redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedLanguage = useAppSelector(
    (state) => state.global.selectedLanguage
  );

  console.log("selectedLa" + selectedLanguage);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Login User");
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center font-quicksand h-screen">
      <div className="w-full mx-3 shadow-2xl bg-gray-200 px-4 py-12 lg:w-[40rem] padding-container flex flex-col justify-center gap-5 text-center">
        <div className="space-y-1 text-center">
          <h1 className="font-vibes text-5xl">Hotel Colonial</h1>
          <p className="text-primary-gray font-quicksand text-xs">
            Restaurant - Bar - Cocktail bar
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-md font-semibold uppercase">Admin Panel</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 lg:px-6 2xl:px-14 text-left "
        >
          <InputField
            type="Username"
            label="Username"
            placeholder="Digite seu username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            required
            customClasses="bg-white"
          />
          <InputField
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            customClasses="bg-white"
            icon={
              <div
                onClick={handleTogglePasswordVisibility}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <FaEye className="text-gray-400" />
                ) : (
                  <FaEyeSlash className="text-gray-400" />
                )}
              </div>
            }
          />
          <div className="flex justify-between items-center text-[12px]">
            <div className="flex items-center relative gap-1">
              <input type="checkbox" className="checkbox checkbox-xs" />{" "}
              <p>Lembrar usuário</p>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="btn bg-primary-green text-primary-white font-normal"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
            ) : (
              "Acessar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
