import { prisma } from "@/lib/prisma";
import { products } from "@/lib/products";

function getCategoriesCount(): number {
  const uniqueCategories = new Set(products.map((p) => p.categoryEn));
  return uniqueCategories.size;
}

export default async function AdminDashboardPage() {
  const totalSubmissions = await prisma.contactSubmission.count();
  const totalFranchise = await prisma.franchiseSubmission.count();
  const totalProducts = products.length;
  const totalCategories = getCategoriesCount();
  const totalInquiries = totalSubmissions + totalFranchise;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-800">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Products"
          value={totalProducts.toString()}
          color="bg-emerald-500"
        />
        <StatCard
          label="Categories"
          value={totalCategories.toString()}
          color="bg-blue-500"
        />
        <StatCard
          label="Contact Inquiries"
          value={totalSubmissions.toString()}
          color="bg-violet-500"
        />
        <StatCard
          label="Franchise Requests"
          value={totalFranchise.toString()}
          color="bg-amber-500"
        />
      </div>

      {totalInquiries === 0 && (
        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-3xl">📭</p>
          <p className="mt-3 text-lg font-medium text-stone-600">
            No inquiries yet
          </p>
          <p className="mt-1 text-sm text-stone-400">
            Contact form submissions and franchise requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className={`mb-3 h-1.5 w-12 rounded-full ${color}`} />
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-stone-800 truncate">{value}</p>
    </div>
  );
}
