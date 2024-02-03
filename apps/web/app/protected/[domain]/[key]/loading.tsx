import { Background, LoadingSpinner } from "@imgpt/ui";

export default function Loading() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
      <Background />
    </main>
  );
}
