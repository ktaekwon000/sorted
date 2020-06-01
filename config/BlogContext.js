import createDataContext from "./createDataContext";
import { firebase } from "./Firebase/firebase";

const reducer = (state, action) => {
  switch (action.type) {
    case "getBlogPosts":
      return action.payload;
    default:
      console.warn(`Default case reached with action type ${action.type}`);
  }
};

const getBlogPosts = (dispatch) => async (callback) => {
  const uid = await firebase.auth().currentUser.uid;
  const results = [];
  const entries = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("entries")
    .orderBy("createdDate")
    .get();
  entries.forEach((entry) => results.push({ ...entry.data(), id: entry.id }));
  dispatch({ type: "getBlogPosts", payload: results });
  if (callback) {
    callback();
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getBlogPosts },
  []
);
