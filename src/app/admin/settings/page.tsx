import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const subscriberCount = await prisma.newsletterSubscriber.count();
  const adminUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-800">Settings</h1>

      <div className="space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-stone-700">Admin Account</h2>
          <div className="space-y-2 text-sm">
            <p className="text-stone-500">
              <span className="font-medium text-stone-700">Username:</span>{" "}
              {adminUser?.username || "N/A"}
            </p>
            <p className="text-stone-500">
              <span className="font-medium text-stone-700">Password:</span>{" "}
              ********
            </p>
            <p className="text-xs text-stone-400 mt-2">
              To change password, update the seed file and re-run seed.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-stone-700">Newsletter Subscribers</h2>
          <p className="text-3xl font-bold text-stone-800">{subscriberCount}</p>
          <p className="text-sm text-stone-500 mt-1">Total subscribers</p>
        </div>
      </div>
    </div>
  );
}
