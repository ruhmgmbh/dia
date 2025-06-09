export default function Footer() {
  return (
    <footer className="bg-black relative text-white container py-12 flex justify-between flex-col lg:flex-row gap-10">
      <nav className="flex gap-7">
        <a href="/contact">Kontakt</a>
        <a href="/career">Karriere</a>
        <a href="/legal">Rechtliche Hinweise</a>
      </nav>
      <div>© 2025 Dia alle Rechte vorbehalten</div>
    </footer>
  );
}
