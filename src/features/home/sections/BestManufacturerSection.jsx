import Container from "../../../components/layout/Container.jsx";
import kitchenImg from "../../../assets/gallery/kitchen.png";
export default function BestManufacturerSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold leading-tight text-dark md:text-4xl lg:text-5xl">
              The Best Furniture <br className="hidden md:block" />
              Manufacturer Of Your Choice
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Furniture power is a software as services for multipurpose
              business management system, especially for them who are running
              two or more business explore the future Furniture power is a
              software as services.
            </p>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-lg shadow-soft">
            <img
              src={kitchenImg}
              alt="Modern kitchen furniture"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
