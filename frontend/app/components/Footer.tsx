import Link from "next/link";

const footerLinks =  [
  {
    label: "Kontakt",
    url: "/kontakt"
  },
  {
    label: "Karriere",
    url: "/career"
  },
  {
    label: "Rechtliche Hinweise",
    url: "/legal"
  },
]

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="bg-black relative text-white container py-12 flex justify-between flex-col lg:flex-row gap-10">
      <nav className="flex gap-7">
        {footerLinks.map((link, i) => {
          return(
            <Link href={link.url} key={i}>{link.label}</Link>
          )
        })}
      </nav>
      <div>© 2025 Dia alle Rechte vorbehalten</div>
      </div>

    </footer>
  );
}
