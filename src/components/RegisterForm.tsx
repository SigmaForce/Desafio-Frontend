import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function RegisterForm() {
  return (
    <form className="w-full max-w-md p-4 flex flex-col gap-4 bg-mauve-dark-800 rounded-sm">
      <Input type="text" label="Nome" placeholder="Digite seu nome" />{" "}
      <Input type="email" label="E-mail" placeholder="Digite seu e-mail" />
      <Input type="password" label="Senha" placeholder="Digite sua senha" />
      <Input
        type="password"
        label="Confirmação de senha"
        placeholder="Digite sua senha novamente"
      />
      <div className="flex justify-end items-center">
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
