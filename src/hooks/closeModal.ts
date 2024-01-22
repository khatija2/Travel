import { ReactComponentElement, ReactElement, ReactEventHandler, useEffect } from "react";

export default function useOnClickOutside(ref: React.MutableRefObject<HTMLInputElement>, closeModal: () => void) {
    useEffect(
      () => {
        const listener = (event: any ) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          closeModal();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
    
      [ref, closeModal]
    );
  }
  
