const GET_ADS_LINK = 'https://24.javascript.pages.academy/keksobooking/data';
const SEND_AD_LINK = 'https://24.javascript.pages.academy/keksobooking';
const GET_ADS_ERROR_MESSAGE = 'Не удалось загрузить объявления. Попробуйте ещё раз';
const SEND_AD_ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';

const getAds = (onSuccess, onError) => fetch(GET_ADS_LINK)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(GET_ADS_ERROR_MESSAGE);
  })
  .then((ads) => {
    onSuccess(ads);
  })
  .catch((err) => {
    onError(err);
  });

const sendAd = (onSuccess, onError, body) => {
  fetch(SEND_AD_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error(SEND_AD_ERROR_MESSAGE);
    })
    .catch((err) => {
      onError(err);
    });
};

export {getAds, sendAd};
