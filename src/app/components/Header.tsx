export default function Header() {
  return (
    <header className="w-full p-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">LOGO</h1>
        <nav className="flex gap-6">
          <a href="#">Women</a>
          <a href="#">Men</a>
          <a href="#">Kids</a>
          <a href="#">Essentials</a>
          <a href="#">Stories</a>
        </nav>
      </div>
    </header>
  );
}
