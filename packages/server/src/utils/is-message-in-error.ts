export function isMessageInError(data: any): data is { message: string } {
  if ('message' in data) {
    return true;
  }

  return false;
}
