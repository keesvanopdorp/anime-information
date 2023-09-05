import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const selectOptions: Prisma.SerieFindManyArgs = {
    include: {
        seasons: {
            select: {
                season: true,
                name: true,
                episodes: true,
            },
        },
        alternativeTitles: {
            select: {
                lang: true,
                title: true,
            }
        }
    }
}

export async function GET() {
    return NextResponse.json(await prisma.serie.findMany(selectOptions));
}