import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["new", "contacted", "closed"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const submission = await prisma.formSubmission.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json({ success: true, submission });
  } catch {
    return NextResponse.json(
      { error: "Failed to update submission status" },
      { status: 500 }
    );
  }
}
