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
    const submissions = await prisma.formSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = ["Date", "Name", "Contact Info", "Message", "Status"];
    const rows = submissions.map((s) =>
      [
        escapeCsvField(s.createdAt.toISOString()),
        escapeCsvField(s.name),
        escapeCsvField(s.contactInfo),
        escapeCsvField(s.message),
        escapeCsvField(s.status),
      ].join(",")
    );

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
