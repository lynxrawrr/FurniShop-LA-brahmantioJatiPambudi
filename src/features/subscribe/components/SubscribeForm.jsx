import { useState } from "react";
import { useSubscribe } from "../hooks/useSubscribe.js";
import Toast from "../../../components/Toast.jsx";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const { submit, loading, error, success, setSuccess } = useSubscribe();

  async function onSubmit(e) {
    e.preventDefault();
    const result = await submit(email);
    if (result.ok) setEmail("");
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mt-6 w-full">
        <div className="flex items-center gap-4">
          <label htmlFor="subscribe-email" className="sr-only">
            Email address
          </label>

          <input
            id="subscribe-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            aria-invalid={Boolean(error) || undefined}
            aria-describedby="subscribe-feedback"
            className="h-12 flex-1 rounded-lg bg-white px-6 text-sm text-dark placeholder:text-muted focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 shrink-0 rounded-lg bg-[#23262f] px-8 text-sm font-semibold text-white transition-colors hover:bg-dark/90 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Subscribe"}
          </button>
        </div>

        {/* Feedback */}
        <div id="subscribe-feedback" aria-live="polite" className="mt-2">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-green-600">{success}</p> : null}
        </div>
      </form>

      {/* Toast Success */}
      <Toast
        open={Boolean(success)}
        message={success}
        onClose={() => setSuccess?.("")}
      />
    </>
  );
}
