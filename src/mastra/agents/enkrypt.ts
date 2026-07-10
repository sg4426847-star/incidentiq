const ENKRYPT_API_KEY = process.env.ENKRYPT_API_KEY;
const ENKRYPT_BASE_URL = "https://api.enkryptai.com";

export async function validateWithEnkrypt(text: string): Promise<{
  isSafe: boolean;
  score: number;
  reason: string;
}> {
  try {
    if (!ENKRYPT_API_KEY) {
      return { isSafe: true, score: 1.0, reason: "Enkrypt API key not configured" };
    }

    const response = await fetch(`${ENKRYPT_BASE_URL}/guardrails/detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": ENKRYPT_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        scan_pii: true,
        detect_toxic: true,
      }),
    });

    if (!response.ok) {
      return { isSafe: true, score: 0.8, reason: "Enkrypt validation skipped" };
    }

    const data = await response.json();
    
    const hasToxic = data?.toxic?.detected || false;
    const hasPII = data?.pii?.detected || false;
    
    const isSafe = !hasToxic;
    const score = isSafe ? 0.9 : 0.3;
    
    return {
      isSafe,
      score,
      reason: hasToxic 
        ? "Toxic content detected" 
        : hasPII 
        ? "PII detected but content is safe" 
        : "Content is safe",
    };
  } catch (error) {
    return { isSafe: true, score: 0.8, reason: "Enkrypt validation error - proceeding" };
  }
}