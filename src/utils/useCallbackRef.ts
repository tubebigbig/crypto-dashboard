import { useRef, useCallback } from "react";

export type OnInput<T = any> = (
  newInput?: T | null,
  prevInput?: T | null
) => void;

export default function useCallbackRef<T = any>(
  cb: OnInput<T>
): [React.RefObject<T>, React.Ref<T>] {
  const ref = useRef<T | null>(null);

  const setRef = useCallback<
    (newInput: T | null) => React.MutableRefObject<T | null>
  >((newInput) => {
    if (ref.current !== newInput) {
      const prevInput = ref.current;
      ref.current = newInput;

      if (!!cb) {
        cb(newInput, prevInput);
      }
    }

    return ref;
  }, []);

  return [ref, setRef];
}
