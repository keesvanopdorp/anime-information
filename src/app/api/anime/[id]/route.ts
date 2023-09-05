import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params: {id}}: {params: {id: number}}) {
    try {
        const serie = await prisma.serie.findFirstOrThrow({
            where: {
              id: {
                equals: id
              }
            },
            include: {
                seasons: true,
                alternativeTitles: true,
                tags: true,    
            }
        });
        return NextResponse.json(serie);
    } catch (e) {   
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === 'P2025') {
                return NextResponse.json({message: "Serie not found", status: 404}, {status: 404})
            }
        }
    }
}