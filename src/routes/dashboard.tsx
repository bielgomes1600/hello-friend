import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | WEBNOVA IA" },
      { name: "description", content: "Dashboard original da WEBNOVA IA para prospecção e gestão de leads." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[#05080e]">
      <iframe
        title="Dashboard original WEBNOVA IA"
        src="/dashboard.html"
        className="h-full w-full border-0"
      />
    </main>
  );
}
