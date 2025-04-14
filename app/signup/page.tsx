"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password != form.confirmPassword) {
      alert("As senhas não são idênticas.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        alert(`Erro: ${error.message || "Não foi possível criar a conta"}`);
      } else {
        alert("Conta criada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#141414] px-4 pt-8">
      <div className="w-[330px]">
        {/* Header com Logo */}
        <div className="relative h-[120px]">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={330}
            height={26}
            priority
            className="absolute -top-13 left-0"
          />

          <div className="mt-10 space-y-6">
            <h1 className="h-[26px] text-[24px] leading-none font-semibold text-white">
              Criar sua conta
            </h1>
            <p className="text-[14px] text-gray-400">
              Se já possui uma conta, você consegue fazer
              <Link
                href="/login"
                className="font-semibold text-green-500 underline decoration-green-500 decoration-2 underline-offset-4 hover:text-green-400"
              >
                Login aqui!
              </Link>
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              required
              className="h-[62px] w-full rounded-[12px] border-0 bg-white px-[22px] text-black placeholder-transparent focus:outline-none"
              placeholder="Nome"
            />
            <Label
              htmlFor="first_name"
              className="pointer-events-none absolute top-1/2 left-[22px] -translate-y-1/2 text-gray-500 transition-all duration-200"
            ></Label>
          </div>

          <div className="relative">
            <Input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              required
              className="h-[62px] w-full rounded-[12px] border-0 bg-white px-[22px] text-black placeholder-transparent focus:outline-none"
              placeholder="Sobrenome"
            />

            <Label
              htmlFor="last_name"
              className="pointer-events-none absolute top-1/2 left-[22px] -translate-y-1/2 text-gray-500 transition-all duration-200"
            ></Label>
          </div>

          <div className="relative">
            <Input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              required
              className="h-[62px] w-full rounded-[12px] border-0 bg-white px-[22px] text-black placeholder-transparent focus:outline-none"
              placeholder="E-mail"
            />

            <Label
              htmlFor="email"
              className="pointer-events-none absolute top-1/2 left-[22px] -translate-y-1/2 text-gray-500 transition-all duration-200"
            ></Label>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              className="h-[62px] w-full rounded-[12px] border-0 bg-white px-[22px] pr-12 text-black placeholder:text-transparent focus:border-0 focus:ring-0 focus:outline-none"
              placeholder="Senha"
            />
            {form.password === "" && (
              <Label
                htmlFor="password"
                className="pointer-events-none absolute top-1/2 left-[22px] -translate-y-1/2 text-gray-500 transition-all duration-200"
              >
                Senha
              </Label>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="h-[62px] w-full rounded-[12px] border-0 bg-white px-[22px] pr-12 text-black placeholder:text-transparent focus:border-0 focus:ring-0 focus:outline-none"
              placeholder="Confirme a senha"
            />
            {form.confirmPassword === "" && (
              <Label
                htmlFor="confirmPassword"
                className="pointer-events-none absolute top-1/2 left-[22px] -translate-y-1/2 text-gray-500 transition-all duration-200"
              >
                Confirmar Senha
              </Label>
            )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="h-[62px] w-full cursor-pointer rounded-[12px] bg-green-600 text-white transition-colors duration-200 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Criar Conta
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#141414] px-2 text-gray-400">
                ou continue com
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-3 pb-8">
            {/* Facebook Button */}
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded-full border-0 bg-gradient-to-b from-[#18acfe] to-[#0163e0] p-0 hover:opacity-90"
              asChild
            >
              <Link
                href="/auth/facebook"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={12}
                  height={12}
                  className="brightness-0 invert"
                />
              </Link>
            </Button>

            {/* Apple Button */}
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded-full border-0 bg-[#283544] p-0 hover:opacity-90"
              asChild
            >
              <Link
                href="/auth/apple"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/apple.svg"
                  alt="Apple"
                  width={16}
                  height={16}
                  className="brightness-0 invert"
                />
              </Link>
            </Button>
            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded-full border-0 bg-black p-0 hover:opacity-90"
              asChild
            >
              <Link
                href="/auth/google"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={32}
                  height={32}
                />
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
