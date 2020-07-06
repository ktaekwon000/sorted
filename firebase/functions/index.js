const functions = require('firebase-functions');
const axios = require('axios');
const language = require('@google-cloud/language');
const url = require('./apiURL.json');

async function analyzeSentiment(txt) {
  const client = new language.LanguageServiceClient();

  const text = txt;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeSentiment({ document });
  const sentiment = result.documentSentiment;

  const request = await axios.create(url).get('/textToEmoji', {
    params: {
      text: txt,
    },
  });

  const emotions = request.data;

  return {
    sentimentScore: sentiment.score,
    sentimentMagnitude: sentiment.magnitude,
    emotions,
  };
}

exports.analyzeSentimentonCreate = functions.firestore
  .document('/users/{userId}/entries/{entryId}')
  .onCreate((snap, context) => {
    const entry = snap.data();

    console.log(
      `Sentiment of ${snap.id} from user ${context.params.userId} analyzed from create`
    );

    const promise = analyzeSentiment(entry.content)
      .then((sentiment) => {
        console.log(sentiment);
        console.log(snap.ref.id);
        snap.ref.set(sentiment, { merge: true });
        return sentiment;
      })
      .catch((err) => console.log(err));
    return promise;
  });

exports.analyzeSentimentonUpdate = functions.firestore
  .document('/users/{userId}/entries/{entryId}')
  .onUpdate((change, context) => {
    const data = change.after.data();
    const previousData = change.before.data();

    if (
      !('updatedDate' in data) ||
      ('updatedDate' in previousData &&
        data.updatedDate.nanoseconds === previousData.updatedDate.nanoseconds)
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
        change.after.ref.set(sentiment, { merge: true });
        return sentiment;
      })
      .catch((err) => console.log(err));
    return promise;
  });
