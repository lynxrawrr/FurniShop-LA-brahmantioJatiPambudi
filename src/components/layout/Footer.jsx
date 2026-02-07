import Container from "./Container.jsx";
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from "react-icons/fi";

export default function Footer() {
  const socialLinks = [
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiGithub, href: "#", label: "Github" },
  ];

  const footerColumns = [
    {
      title: "Our Products",
      items: ["The Support Suite", "The Sales Suite", "Support", "Guide"],
    },
    {
      title: "Top Features",
      items: [
        "Ticketing System",
        "Knowledge Base",
        "Community Forums",
        "Help Desk Software",
      ],
    },
    {
      title: "Resources",
      items: ["Product Support", "Request Demo", "Library", "Peoplepower Blog"],
    },
    {
      title: "Company",
      items: ["About Us", "Press", "Investors", "Events"],
    },
    {
      title: "Favourite Things",
      items: [
        "For Enterprise",
        "For Startups",
        "For Benchmark",
        "For Small Business",
      ],
    },
  ];

  return (
    <footer className="bg-[#23262f] text-white">
      <Container className="pt-16 pb-8">
        
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 pb-8 md:flex-row md:items-center">
          <div>
            <div className="text-2xl font-bold tracking-tight">FurniShop</div>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2b2b3f] text-white transition-colors hover:bg-[#3b3b52]"
              >
                <social.icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        <hr className="border-white" />

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-3 lg:flex lg:justify-between">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-base font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} FurniShop - All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}