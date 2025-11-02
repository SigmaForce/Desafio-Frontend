import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError("");

    const result = await login(data.email, data.password);

    if (result.success) {
      navigate("/movies");
    } else {
      setApiError(result.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-4 flex flex-col gap-4 bg-mauve-dark-800 rounded-sm"
    >
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {apiError}
        </div>
      )}
      <div>
        <Input
          {...register("email")}
          className={`${errors.email && "border-red-500"}`}
          type="text"
          label="Nome/E-mail"
          placeholder="Digite seu nome/E-mail"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          {...register("password")}
          className={`${errors.password && "border-red-500"}`}
          label="Senha"
          placeholder="Digite sua senha"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Link
          to="/register"
          className="text-[#8E4EC6] underline underline-offset-2 cursor-pointer "
        >
          Não tem uma conta? Registre-se
        </Link>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </form>
  );
}
