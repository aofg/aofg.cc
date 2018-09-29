export const state = () => ({
  locales: ["en", "ru"],
  locale: "ru"
});

export class actions {}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  }
};
