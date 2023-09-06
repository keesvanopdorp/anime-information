import { NextResponse } from "next/server";
import { getSeries } from "./helper";



export async function GET() {
    return NextResponse.json(await getSeries());
}