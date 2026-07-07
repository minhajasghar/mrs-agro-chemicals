import { prisma } from "@/lib/prisma";
import AdminSubmissionsTable from "@/components/AdminSubmissionsTable";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Submissions</h1>
      </div>
      <AdminSubmissionsTable submissions={submissions} />
    </div>
  );
}
