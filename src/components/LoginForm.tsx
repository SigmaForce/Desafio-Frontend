import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginForm() {
  return (
    <form className="w-full max-w-md p-4 flex flex-col gap-4 bg-mauve-dark-800 rounded-sm">
      <Input
        type="text"
        label="Nome/E-mail"
        placeholder="Digite seu nome/E-mail"
      />
      <Input type="password" label="Senha" placeholder="Digite sua senha" />
      <div className="flex justify-between items-center">
        <a className="text-[#8E4EC6] underline underline-offset-2 cursor-pointer ">
          Esqueci minha senha
        </a>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
}
