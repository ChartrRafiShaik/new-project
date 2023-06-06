import connectDB from "@/app/lib/mongodb";
import Locations from "@/app/models/locations";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { from, to } = await request.json();
  
  
  try {
    await connectDB();
    const existingLocation = await Locations.findOne({
      $or: [
        { from: from.toLowerCase(), to: to.toLowerCase() },
        { from: to.toLowerCase(), to: from.toLowerCase() },
      ],
    });

    if (existingLocation) {
      return NextResponse.json({ msg: "Route already requested" });
    }

    await Locations.create({ from, to });
    return NextResponse.json({ msg: "Route requested successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error });
  }
}
