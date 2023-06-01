import { ssd } from '../storeSessionData';

type TObjLibrary = {
  [key in string]: string | string[] | TObjLibrary
}

const saveImgInCache = (src: string) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ssd.arrLoadedImgSrc.push(src);
    ssd.arrLoadedImg.push(img);
  }
}

export const loadImagesInCache = (obj: TObjLibrary) => {
  Object.keys(obj).forEach((elem) => {
    if (Object.prototype.toString.call(obj[elem]) === '[object Object]') {
      loadImagesInCache(obj[elem] as TObjLibrary);
    } else if (Object.prototype.toString.call(obj[elem]) === '[object Array]') {
      (obj[elem] as string[]).forEach((path: string) => {
        saveImgInCache(path);
      })
    } else if (Object.prototype.toString.call(obj[elem]) === '[object String]') {
      saveImgInCache(obj[elem] as string);
    }
  })
}
