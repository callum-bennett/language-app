export const selectNotificationsByType = (state, type) => {
  let byType = [];

  if (state.app.notifications?.[type]) {
    byType = Object.values(state.app.notifications[type]);
  }

  return byType;
};
