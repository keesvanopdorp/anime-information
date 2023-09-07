import { NextResponse } from "next/server";
import { getSeries } from "./helper";

export async function GET() {
	try {
		return NextResponse.json(await getSeries());
	} catch (e) {
		return NextResponse.json({ message: "A unkown server error has occurred", status: 500 }, { status: 500 });
	}
}
