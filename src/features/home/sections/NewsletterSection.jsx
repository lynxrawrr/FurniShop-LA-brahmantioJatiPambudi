import SubscribeForm from "../../subscribe/components/SubscribeForm.jsx";
import newsletterImg from "../../../assets/gallery/newsletter.png";

export default function NewsletterSection() {
  return (
    <section id="contact" className="w-full">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${newsletterImg})` }}
      >
        {/* Overlay */}
        <div className="bg-black/10" aria-hidden="true" />

        {/* Content */}
        <div className="container-x min-h-88 md:min-h-96 lg:min-h-112">
          <div className="grid min-h-[inherit] items-center lg:grid-cols-2">
            {/* Left spacer (desktop) */}
            <div className="hidden lg:block" />

            {/* Right content */}
            <div className="py-10 lg:py-0">
              <div className="mx-auto w-full max-w-md text-center text-white lg:mx-0 lg:max-w-xl lg:text-left">
                <h2 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                  Get more discount
                  <br />
                  Off your order
                </h2>

                <p className="mt-3 text-lg text-white/80">Join our mailing list</p>

                <div className="mt-6 lg:mt-7">
                  <SubscribeForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
