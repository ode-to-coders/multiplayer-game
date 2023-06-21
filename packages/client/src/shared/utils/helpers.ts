export function reverseSort(a: any, b: any): number {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}

export function isOpen(ws: any) {
  return ws.readyState === ws.OPEN 
}
