export default function Footer() {
  return (
    <footer className="w-full mt-20 p-10 bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-3">Support</h3>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Returns</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Company</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Store Locator</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Follow Us</h3>
          <ul className="space-y-2">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>

      <p className="text-center mt-10 opacity-70">
        © 2025 Appscrip Task — Varsha Juluri
      </p>
    </footer>
  );
}
