import { useCallback, useState } from "react";
import { subscribeEmail } from "../api/subscribe.api.js";
import { isEmail } from "../../../utils/validate.js";
import { sanitizeEmail } from "../../../utils/sanitize.js";

export function useSubscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = useCallback(async (rawEmail) => {
    const email = sanitizeEmail(rawEmail);

    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required.");
      return { ok: false };
    }
    if (!isEmail(email)) {
      setError("Please enter a valid email.");
      return { ok: false };
    }

    setLoading(true);
    try {
      const res = await subscribeEmail({ email });
      setSuccess(res?.message || "Subscribed successfully.");
      return { ok: true, res };
    } catch (e) {
      setError(e?.message || "Failed to subscribe. Please try again.");
      return { ok: false, error: e };
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, submit, setError, setSuccess };
}
