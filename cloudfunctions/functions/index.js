const functions = require("firebase-functions");
const admin = require("firebase-admin");

async function analyzeSentiment(txt) {
  const language = require("@google-cloud/language");

  const client = new language.LanguageServiceClient();

  const text = txt;

  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  return { score: sentiment.score, magnitude: sentiment.magnitude };
}

exports.analyzeSentimentonCreate = functions.firestore
  .document("/users/{userId}/entries/{entryId}")
  .onCreate((snap, context) => {
    const entry = snap.data();

    console.log(
      `Sentiment of ${snap.id} from user ${context.params.userId} analyzed from create`
    );

    const promise = analyzeSentiment(entry.content)
      .then((sentiment) => {
        console.log(sentiment);
        console.log(snap.ref.id);
        snap.ref.set(
          {
            sentimentScore: sentiment.score,
            sentimentMagnitude: sentiment.magnitude,
          },
          { merge: true }
        );
        return sentiment;
      })
      .catch((err) => console.log(err));
    return promise;
  });

exports.analyzeSentimentonUpdate = functions.firestore
  .document("/users/{userId}/entries/{entryId}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    const previousData = change.before.data();

    if (
      "updatedDate" in previousData &&
      data.updatedDate.nanoseconds == previousData.updatedDate.nanoseconds
    ) {
      return null;
    }

    console.log(
      `Sentiment of ${change.after.ref.id} from user ${context.params.userId} analyzed from update`
    );

    const promise = analyzeSentiment(data.content)
      .then((sentiment) => {
        console.log(sentiment);
        console.log(change.after.ref.id);
        change.after.ref.set(
          {
            sentimentScore: sentiment.score,
            sentimentMagnitude: sentiment.magnitude,
          },
          { merge: true }
        );
        return sentiment;
      })
      .catch((err) => console.log(err));
    return promise;
  });
