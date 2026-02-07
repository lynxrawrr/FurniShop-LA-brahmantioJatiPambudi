import Container from "../../../components/layout/Container.jsx";
import { FaCheckCircle } from "react-icons/fa";
import chairImg from "../../../assets/gallery/chair.png";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <Container>
        {/* Layout: image (left) + content (right) */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* Left: Image */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={chairImg}
              alt="Living room furniture"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              We Create Your Home <br className="hidden md:block" /> More
              Aesthetic
            </h2>

            <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
              Furniture power is a software as services for multipurpose
              business management system.
            </p>

            {/* Feature list */}
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <FaCheckCircle className="mt-1 shrink-0 text-xl text-slate-900" />
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    Valuation Services
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Sometimes features require a short description. This can be
                    detailed description.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <FaCheckCircle className="mt-1 shrink-0 text-xl text-slate-900" />
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    Development of Furniture Models
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Sometimes features require a short description. This can be
                    detailed description.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
