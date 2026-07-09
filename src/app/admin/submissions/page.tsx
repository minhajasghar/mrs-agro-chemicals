import { prisma } from "@/lib/prisma";
import AdminSubmissionsTable from "@/components/AdminSubmissionsTable";

export default async function AdminSubmissionsPage() {
  const contactSubmissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const franchiseSubmissions = await prisma.franchiseSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const combined = [
    ...contactSubmissions.map((s) => ({
      id: s.id,
      formType: "contact" as const,
      name: s.name,
      contactInfo: s.email,
      message: s.message,
      status: s.status,
      createdAt: s.createdAt,
    })),
    ...franchiseSubmissions.map((s) => ({
      id: s.id + 10000,
      formType: "franchise" as const,
      name: s.name,
      contactInfo: s.phone,
      message: `City: ${s.city}${s.message ? `\nMessage: ${s.message}` : ""}`,
      status: s.status,
      createdAt: s.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Submissions</h1>
      </div>
      <AdminSubmissionsTable submissions={combined} />
    </div>
  );
}
