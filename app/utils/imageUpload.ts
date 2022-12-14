import { FILE_API_ENDPOINT } from './constant';
import { isValidURL } from './url';

const dataURLtoBlob = (dataURL: string) => {
  return new Promise((resolve, reject) => {
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => resolve(blob))
      .catch((err) => reject(err));
  });
};

const uploadImageToServer = (imageDataURL: string) => {
  return new Promise((resolve, reject) => {
    dataURLtoBlob(imageDataURL).then((blob: any) => {
      const data = new FormData();
      data.append('uploaded_file', blob);

      fetch(FILE_API_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => {
          res
            .json()
            .then((path) => resolve(FILE_API_ENDPOINT + '/' + path))
            .catch(reject);
        })
        .catch(reject);
    });
  });
};

export const uploadImageHelper = (imageDataURL: string) => {
  return new Promise((resolve, reject) => {
    if (isValidURL(imageDataURL)) {
      resolve(imageDataURL);
      return;
    }

    uploadImageToServer(imageDataURL).then(resolve).catch(reject);
  });
};
