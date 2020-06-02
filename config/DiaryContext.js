import createDataContext from "./createDataContext";
import { firebase } from "./Firebase/firebase";

const reducer = (state, action) => {
  switch (action.type) {
    case "getDiaryEntries":
      return action.payload;
    case "addDiaryEntry":
      return state;
    default:
      console.warn(`Default case reached with action type ${action.type}`);
      return state;
  }
};

const uid = () => firebase.auth().currentUser.uid;
const entriesCollection = () =>
  firebase.firestore().collection("users").doc(uid()).collection("entries");

const getDiaryEntries = (dispatch) => async (callback) => {
  const results = [];
  const orderedEntries = await entriesCollection().orderBy("createdDate").get();
  orderedEntries.forEach((entry) =>
    results.push({ ...entry.data(), id: entry.id })
  );
  dispatch({ type: "getDiaryEntries", payload: results });
  if (callback) {
    callback();
  }
};

const addDiaryEntry = (dispatch) => async (entry, callback) => {
  const FieldValue = firebase.firestore.FieldValue;
  await entriesCollection().add({
    ...entry,
    createdDate: FieldValue.serverTimestamp(),
  });
  if (callback) {
    callback();
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getDiaryEntries, addDiaryEntry },
  []
);
