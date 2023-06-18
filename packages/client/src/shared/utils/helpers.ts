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
  console.log(ws.readyState, 'red');
  console.log(ws.OPEN, 'open');
  return ws.readyState === ws.OPEN 
}
