import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const franchises = await prisma.franchiseSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = ["Date", "Type", "Name", "Contact Info", "Details", "Status"];
    const rows = [
      ...contacts.map((s) =>
        [
          escapeCsvField(s.createdAt.toISOString()),
          "Contact",
          escapeCsvField(s.name),
          escapeCsvField(s.email),
          escapeCsvField(s.message),
          escapeCsvField(s.status),
        ].join(",")
      ),
      ...franchises.map((s) =>
        [
          escapeCsvField(s.createdAt.toISOString()),
          "Franchise",
          escapeCsvField(s.name),
          escapeCsvField(s.phone),
          escapeCsvField(`City: ${s.city}${s.message ? ` | ${s.message}` : ""}`),
          escapeCsvField(s.status),
        ].join(",")
      ),
    ];

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="mrs-agro-submissions.csv"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to export submissions" },
      { status: 500 }
    );
  }
}
