export const msToMinsAndSecs = (ms: number) => {
  const secs = ms / 1000;
  const mins = Math.floor(secs / 60);
  const leftOverSecs = Math.floor(secs - mins * 60);
  return `${mins}:${leftOverSecs.toString().padStart(2, "0")}`;
};
