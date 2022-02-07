import { arrayToObjectByKey } from "@utils";
import { FETCH_BADGES, FETCH_USER_BADGES } from "../actions/types";

const initialState = {
  byId: {},
  allIds: [],
  userBadges: {
    byBadgeId: {},
    allBadgeIds: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BADGES:
      const badges = action.payload;

      return {
        ...state,
        byId: arrayToObjectByKey(badges),
        allIds: badges.map(({ id }) => id),
      };
      break;

    case FETCH_USER_BADGES:
      const userBadges = action.payload;

      return {
        ...state,
        userBadges: {
          byBadgeId: arrayToObjectByKey(userBadges, "badge"),
          allBadgeIds: userBadges.map(({ badge }) => badge),
        },
      };
      break;
    default:
      return state;
  }
};
