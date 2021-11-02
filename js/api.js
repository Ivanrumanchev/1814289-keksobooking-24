const getAds = (onSuccess, onError) => fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Не удалось загрузить объявления. Попробуйте ещё раз');
  })
  .then((ads) => {
    onSuccess(ads);
  })
  .catch((err) => {
    onError(err);
  });

const sendAd = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    })
    .catch((err) => {
      onError(err);
    });
};

export {getAds, sendAd};
