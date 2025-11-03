import { ShieldOff } from "lucide-react";
import { Link } from "react-router-dom";
import ChevronLeft from "../assets/icons/chevron-left.png";
import { Button } from "./ui/button";

export function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/10 p-4 rounded-full">
              <ShieldOff className="w-16 h-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">Acesso Negado</h1>

          <p className="text-gray-400 mb-6">
            Você não tem permissão para acessar os detalhes deste filme. Apenas
            o criador do filme pode visualizar essas informações.
          </p>

          <Link to="/movies">
            <Button variant="primary" size="lg">
              <img src={ChevronLeft} aria-label="Próximo" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
