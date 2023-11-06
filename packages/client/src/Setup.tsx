import { ReactNode, useEffect, useState } from "react";
import { MUDProvider } from "./MUDContext";
import { setup } from "./mud/setup";

type Props = {
  children: ReactNode;
};

export function Setup({ children }: Props) {
  const [result, setResult] = useState<Awaited<ReturnType<typeof setup>>>();

  useEffect(() => {
    setup().then((res) => setResult(res));
  }, []);

  return (
    <div>
      {result ? (
        <MUDProvider value={result}>{children}</MUDProvider>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
