import { NextResponse } from "next/server";
import { fetchWeltradeMetrics } from "@/lib/weltrade";

export const revalidate = 60;

export async function GET() {
  try {
    const metrics = await fetchWeltradeMetrics();
    return NextResponse.json(metrics, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("[api/metrics]", error);
    return NextResponse.json(
      {
        error: "Impossible de récupérer les métriques",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }
}
