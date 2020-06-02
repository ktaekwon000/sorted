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

const uid = () => firebase.auth().currentUser.uid;
const entriesCollection = () =>
  firebase.firestore().collection("users").doc(uid()).collection("entries");

const getBlogPosts = (dispatch) => async (callback) => {
  const results = [];
  const orderedEntries = await entriesCollection().orderBy("createdDate").get();
  orderedEntries.forEach((entry) =>
    results.push({ ...entry.data(), id: entry.id })
  );
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
