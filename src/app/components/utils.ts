const imageExtensions = [
  ".tiff",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
] as const;
const videoExtensions = [
  ".mp4",
  ".avi",
  ".webm",
  ".ogg",
  ".mpg",
  ".mpeg",
] as const;
const audioExtensions = [".mp3", ".wav", ".ogg", ".aac"];
const documentExtensions = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xlsx",
  ".xls",
  ".csv",
  ".txt",
] as const;
const documentTypes = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
] as const;
const videoTypes = [
  "video/x-msvideo",
  "video/mp4",
  "video/webm",
  "video/mpeg",
  "video/3gpp2",
] as const;
const audioTypes = ["audio/mpeg", "audio/wav", "audio/aac", "audio/ogg"];
const imageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/bmp",
  "image/webp",
  "image/gif",
  "image/tiff",
] as const;

type GetFileTypeFn = {
  mimeType?: string;
  extension?: string;
};

export function getFileType({ mimeType, extension }: GetFileTypeFn) {
  if (mimeType) {
    if (documentTypes.find((type) => mimeType.includes(type))) {
      return "documents";
    } else if (videoTypes.find((type) => mimeType.includes(type))) {
      return "videos";
    } else if (audioTypes.find((type) => mimeType.includes(type))) {
      return "audios";
    } else if (imageMimeTypes.find((type) => mimeType.includes(type))) {
      return "images";
    }
  }

  if (extension) {
    if (
      documentExtensions.find((_extension) => extension.includes(_extension))
    ) {
      return "documents";
    } else if (
      videoExtensions.find((_extension) => extension.includes(_extension))
    ) {
      return "videos";
    } else if (
      audioExtensions.find((_extension) => extension.includes(_extension))
    ) {
      return "audios";
    } else if (
      imageExtensions.find((_extension) => extension.includes(_extension))
    ) {
      return "images";
    }
  }

  return "others";
}

export function groupBy(object: any[], key: string) {
  return object.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function fileListToArray(fileList: FileList | null): File[] {
  const files: File[] = [];
  if (fileList) {
    const length = fileList.length;
    let idx = 0;
    while (idx < length) {
      const file = fileList.item(idx);
      if (file) files[idx++] = file;
    }
  }
  return files;
}

export function omitKeys(obj: any, keys: string[]) {
  var target: Record<string, any> = {};

  for (var key in obj) {
    if (keys.indexOf(key) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    target[key] = obj[key];
  }

  return target;
}
