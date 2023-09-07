import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { getSerie } from "./helper";

export async function GET(req: Request, { params: { id } }: { params: { id: number } }) {
	try {
		return NextResponse.json(await getSerie(parseInt(id.toString())));
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
			return NextResponse.json({ message: "Serie not found", status: 404 }, { status: 404 });
		}
	}
}
