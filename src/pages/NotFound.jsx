import { Link } from "react-router-dom";
import Container from "../components/layout/Container.jsx";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-9xl font-extrabold tracking-tighter text-brand/20 md:text-[10rem]">
              404
            </h1>

            <div className="relative -mt-12 md:-mt-16">
              <h2 className="text-3xl font-bold tracking-tight text-dark md:text-4xl">
                Page not found
              </h2>

              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                Sorry, the page you are looking for doesn't exist or has been moved.
                Let's get you back to shopping!
              </p>

              <Link
                to="/"
                className="group mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:scale-105 hover:bg-dark"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
