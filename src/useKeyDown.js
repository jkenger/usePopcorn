import { useEffect } from "react";

export function useKeyDown(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
