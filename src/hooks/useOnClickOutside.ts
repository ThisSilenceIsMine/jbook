import React, { useEffect } from 'react';

type Handler = (event: any) => void;
type EventType = MouseEvent | TouchEvent;
type ReactHTMLRefType = React.RefObject<HTMLElement>;

const useOnClickOutside = (ref: ReactHTMLRefType, handler: Handler) => {
  useEffect(() => {
    const options = { capture: true };

    const listener = (event: EventType) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener, options);
    document.addEventListener('touchstart', listener, options);

    return () => {
      document.removeEventListener('mousedown', listener, options);
      document.removeEventListener('touchstart', listener, options);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
