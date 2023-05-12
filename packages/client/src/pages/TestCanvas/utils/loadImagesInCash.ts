import { ssd } from 'pages/TestCanvas/storeSessionData';

type TObjLibrary = {
  [key in string]: string | string[] | TObjLibrary
}

const saveImgInCash = (src: string) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ssd.arrLoadedImgSrc.push(src);
    ssd.arrLoadedImg.push(img);
    console.log(src);
    console.log(ssd.arrLoadedImgSrc.length)
  }
}

export const loadImagesInCash = (obj: TObjLibrary) => {
  Object.keys(obj).forEach((elem) => {
    if (Object.prototype.toString.call(obj[elem]) === '[object Object]') {
      loadImagesInCash(obj[elem] as TObjLibrary);
    } else if (Object.prototype.toString.call(obj[elem]) === '[object Array]') {
      (obj[elem] as string[]).forEach((path: string) => {
        saveImgInCash(path);
      })
    } else if (Object.prototype.toString.call(obj[elem]) === '[object String]') {
      saveImgInCash(obj[elem] as string);
    }
  })
}
