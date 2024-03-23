const popup = document.querySelector(".dialog");
const popupButtonOpen = document.querySelector(".footer__button");
const popupButtonClose = document.querySelector(".popup__button");
const page = document.querySelector(".page");

popupButtonOpen.addEventListener("click", () => {
  popup.showModal();
});
popupButtonClose.addEventListener("click", () => {
  popup.close();
});
