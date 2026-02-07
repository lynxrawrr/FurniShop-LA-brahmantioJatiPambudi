import { useEffect } from "react";
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from "react-icons/fi";

export default function Toast({ 
  open, 
  message, 
  type = "success", 
  onClose, 
  duration = 4000,
  action 
}) {
  
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open) return null;

  const icons = {
    success: <FiCheckCircle className="text-emerald-400" />,
    error: <FiAlertCircle className="text-rose-400" />,
    info: <FiInfo className="text-blue-400" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999">
      <div 
        role="alert"
        className="
          flex items-center gap-3 
          rounded-full bg-[#23262f] pl-5 pr-3 py-3 
          text-sm font-medium text-white 
          shadow-xl shadow-black/20 
          border border-white/10
          animate-in slide-in-from-right-full fade-in duration-300
        "
      >
        {/* Icon */}
        <div className="text-lg shrink-0">
          {icons[type] || icons.success}
        </div>

        {/* Message */}
        <span className="flex-1 truncate">{message}</span>

        {/* Action Button */}
        {action && (
          <>
            <div className="h-4 w-px bg-white/10 mx-1" aria-hidden="true" />
            <button
              onClick={action.onClick}
              className="shrink-0 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-all"
            >
              {action.label}
            </button>
          </>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="shrink-0 rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
          aria-label="Close notification"
        >
          <FiX className="text-lg" />
        </button>
      </div>
    </div>
  );
}