import isEqual from "lodash/isEqual";
import { useCallback, useEffect } from "react";

const excludedTags = ["INPUT", "TEXTAREA", "SELECT"];

const useShortcut = (keys = [], callbackFn, dependencies = []) => {
  const callback = useCallback(callbackFn, dependencies);
  const targetKeys = new Set(keys.map((key) => key.toLowerCase()));
  const pressedKeys = new Set();

  const keyDownListener = useCallback(({ key, target, repeat }) => {
    if (repeat || excludedTags.includes(target.tagName)) return;

    pressedKeys.add(key.toLowerCase());

    if (isEqual(pressedKeys, targetKeys)) {
      callback();
    }
  }, []);

  const keyUpListener = useCallback(({ key, target }) => {
    if (excludedTags.includes(target.tagName)) return;

    pressedKeys.delete(key.toLowerCase());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyDownListener, true);
    window.addEventListener("keyup", keyUpListener, true);

    return () => {
      window.removeEventListener("keydown", keyDownListener, true);
      window.removeEventListener("keyup", keyUpListener, true);
    };
  }, [callback]);
};

export default useShortcut;
