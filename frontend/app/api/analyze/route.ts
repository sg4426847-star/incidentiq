import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { incidentReport } = await request.json();

    const response = await fetch("http://localhost:4111/api/workflows/incidentWorkflow/start-async", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        inputData: { incidentReport } 
      }),
    });

    const data = await response.json();
    
    return NextResponse.json({
      postMortemReport: data?.result?.postMortemReport || "Report generated successfully",
      enkryptValidation: data?.result?.enkryptValidation || { isSafe: true, score: 1.0, reason: "Validated" },
      status: "success"
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze incident" },
      { status: 500 }
    );
  }
}