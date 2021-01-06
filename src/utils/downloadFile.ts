export function downloadFile(url: string) {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.click();
}
