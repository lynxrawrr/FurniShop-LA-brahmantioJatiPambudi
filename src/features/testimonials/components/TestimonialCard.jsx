import { safeText } from "../../../utils/format.js";

export default function TestimonialCard({ item }) {
  const name = safeText(item?.name, "Anonymous");
  const title = safeText(item?.title, "");
  const message = safeText(item?.message, "");
  const image = item?.image;

  return (
    <div className="flex flex-col">
      {/* Profile */}
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-14 w-14 rounded-full object-cover shadow-sm"
            loading="lazy"
          />
        ) : (
          <div
            className="h-14 w-14 rounded-full bg-gray-100"
            aria-hidden="true"
          />
        )}

        <div>
          <p className="text-xl font-bold text-dark">{name}</p>
          {title ? <p className="text-sm text-muted">{title}</p> : null}
        </div>
      </div>

      {/* Message */}
      <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
        “{message}”
      </p>
    </div>
  );
}
