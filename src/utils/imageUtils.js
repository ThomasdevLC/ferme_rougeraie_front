export async function compressImage(url) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = url;
  await new Promise((resolve) => (img.onload = resolve));
  canvas.width = img.width / 2;
  canvas.height = img.height / 2;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const compressedImage = canvas.toDataURL("image/jpeg", 0.5);
  return compressedImage;
}
