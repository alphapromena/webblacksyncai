import { useRef } from "react";

/**
 * Honeypot anti-spam. Renders a field that's invisible to humans but that bots
 * (which auto-fill every input) tend to populate. If it has a value on submit,
 * treat the submission as spam and drop it silently.
 *
 * Usage:
 *   const { ref, isBot } = useHoneypot();
 *   ...<form onSubmit={...}><HoneypotInput inputRef={ref} /> ... </form>
 *   if (isBot()) { // mimic success, don't send }
 */
export function useHoneypot() {
  const ref = useRef<HTMLInputElement>(null);
  const isBot = () => !!ref.current && ref.current.value.trim().length > 0;
  return { ref, isBot };
}

const hiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
  opacity: 0,
};

export function HoneypotInput({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div aria-hidden="true" style={hiddenStyle}>
      {/* Plausible name so bots fill it; humans never see it. */}
      <label>
        Company website
        <input
          ref={inputRef}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}
