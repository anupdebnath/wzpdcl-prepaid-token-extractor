import type { TokenData } from './tokenExtractor';

export interface SavedToken extends TokenData {
  id: string;
  savedAt: number;
}

const STORAGE_KEY = 'wzpdcl_saved_tokens';

export function saveToken(tokenData: TokenData): SavedToken | null {
  if (!tokenData.prepaidtoken || !tokenData.originalMessage) {
    return null;
  }

  // Check if this token already exists
  const savedTokens = getSavedTokens();
  const tokenExists = savedTokens.some(token =>
    token.prepaidtoken === tokenData.prepaidtoken &&
    token.meternumber === tokenData.meternumber
  );

  // If token already exists, don't save it again
  if (tokenExists) {
    return null;
  }

  const savedToken: SavedToken = {
    ...tokenData,
    id: generateId(),
    savedAt: Date.now()
  };

  savedTokens.push(savedToken);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTokens));
  return savedToken;
}

export function getSavedTokens(): SavedToken[] {
  const savedTokensJson = localStorage.getItem(STORAGE_KEY);
  if (!savedTokensJson) {
    return [];
  }

  try {
    return JSON.parse(savedTokensJson);
  } catch (error) {
    console.error('Error parsing saved tokens:', error);
    return [];
  }
}

export function deleteToken(id: string): boolean {
  const savedTokens = getSavedTokens();
  const filteredTokens = savedTokens.filter(token => token.id !== id);

  if (filteredTokens.length === savedTokens.length) {
    return false; // Token not found
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTokens));
  return true;
}

export function clearAllTokens(): void {
  localStorage.removeItem(STORAGE_KEY);
  return;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}
