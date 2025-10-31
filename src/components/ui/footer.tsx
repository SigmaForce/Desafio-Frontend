export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t p-6 border-[#F1E6FD]/18 text-[#B5B2BC] text-center font-mono">
      {year} © Todos os direitos reservados a &nbsp;
      <strong>Cubos Movies</strong>
    </footer>
  );
}
