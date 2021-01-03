export function convertFileToBase64(file: File) {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      } else {
        throw new Error('Something broke');
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
