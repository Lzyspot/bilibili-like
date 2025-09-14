function base64ToBlobUrl(base64Data: string): string {
  try {
    // 去掉base64数据URL前缀
    const parts = base64Data.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = atob(parts[1]);

    // 创建Uint8Array
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    // 创建blob并返回URL
    const blob = new Blob([uInt8Array], { type: contentType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Base64 to Blob conversion failed:", error);
    // 转换失败时返回原始base64数据
    return base64Data;
  }
}

export { base64ToBlobUrl };
