import { AuditLogTable } from "@/features/audit-log/audit-log-table";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold mb-8">Audit Logs</h1>

        <AuditLogTable />
      </main>
    </div>
  );
}
