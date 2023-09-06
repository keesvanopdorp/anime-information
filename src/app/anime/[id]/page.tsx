import { getSerie } from "@/app/api/anime/[id]/route";
import prisma from "@/libs/prisma";
import { Prisma, Serie } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: number;
  };
}

async function getData(id: number) {
  try {
    return await getSerie(id);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        notFound();
      }
    }
  }
}

export default async function ShowSerieDetails({ params: { id } }: PageProps) {
  const { title } = (await getData(parseInt(id.toString()))) as Serie;
  return (
    <div className="container px-2 py-3">
      <h1 className="text-4xl">{title}</h1>
    </div>
  );
}
