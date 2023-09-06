import prisma from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function getSerie(id: number) {
  return await prisma.serie.findFirstOrThrow({
    where: {
      id: {
        equals:id,
      },
    },
      include: {
        seasons: true,
        alternativeTitles: true,
        tags: true,
    }
  });
}

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: number } }
) {
  try {
    return NextResponse.json(await getSerie(parseInt(id.toString())));
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { message: "Serie not found", status: 404 },
          { status: 404 }
        );
      }
    }
  }
}
