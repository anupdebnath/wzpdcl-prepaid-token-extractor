export interface TokenData {
  prepaidtoken?: string;
  sequencenumber?: string;
  meternumber?: string;
  vendingamount?: string;
  energycost?: string;
  totalcharge?: string;
  meterrent?: string;
  demandcharge?: string;
  vat?: string;
  rebate?: string;
  originalMessage?: string; // Store the original SMS message
}

export function extractTokenInfo(message: string): TokenData | null {
  if (!message) {
    return null;
  }

  const tokenData: TokenData = {
    originalMessage: message.trim() // Store the original message, trimmed of whitespace
  };

  const regexPatterns = {
    prepaidtoken: /Token is ((?:\d{4}-\d{4}-\d{4}-\d{4}-\d{4},?)+)/,
    sequencenumber: /SeqNo:([\d=]+)/,
    meternumber: /for Meter No:(\d+)/,
    vendingamount: /Vending Amt:(\d+\.\d+)/,
    energycost: /Enrg Cost(\d+\.\d+)/,
    totalcharge: /Total Charge:(\d+\.\d+)/,
    meterrent: /Meter Rent 1P:(\d+)/,
    demandcharge: /Demand Charge:(\d+)/,
    vat: /VAT:(\d+\.\d+)/,
    rebate: /Rebate:(-\d+\.\d+)/
  };

  for (const [key, regex] of Object.entries(regexPatterns)) {
    const match = message.match(regex);
    if (match) {
      tokenData[key as keyof TokenData] = match[1];
    }
  }

  // Only return the token data if we have at least the token
  if (tokenData.prepaidtoken) {
    // Format the token with line breaks instead of commas
    // Some SMS messages have multiple tokens separated by commas
    tokenData.prepaidtoken = tokenData.prepaidtoken.replace(/,/g, '\n');
    return tokenData;
  }

  return null;
}

export function formatTokenForCopy(tokenData: TokenData): string {
  let formattedText = 'Token Information\n';

  // Add token
  if (tokenData.prepaidtoken) {
    formattedText += 'WZPDCL Prepaid Token:\n' + tokenData.prepaidtoken + '\n\n';
  }

  // Add sequence number
  if (tokenData.sequencenumber) {
    formattedText += 'Sequence Number: ' + tokenData.sequencenumber + '\n';
  }

  // Add meter number
  if (tokenData.meternumber) {
    formattedText += 'Meter Number: ' + tokenData.meternumber + '\n';
  }

  return formattedText;
}
