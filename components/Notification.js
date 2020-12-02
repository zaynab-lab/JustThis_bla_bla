import { useEffect, useState } from "react";
export default function Notification({ message, emit }) {
  const [start, setStart] = useState(emit);
  useEffect(() => {
    setTimeout(setStart(false), 3000);
  }, [setStart]);
  return (
    <>
      {start && <div className="message">{message}</div>}
      <style jsx>{`
        .message {
          position: absolute;
          top: 2rem;
          padding: 1rem;
          color: white;
          background: grey;
          border-radius: 10rem;
        }
      `}</style>
    </>
  );
}
