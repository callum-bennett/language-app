export const selectBadgesGroupedByType = (state) =>
  Object.values(state.badges.byId).reduce((object, item) => {
    if (!object[item.notifier]) {
      object[item.notifier] = [];
    }
    object[item.notifier].push(item);
    return object;
  }, {});
