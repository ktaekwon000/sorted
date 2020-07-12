/* eslint-disable import/order, import/no-extraneous-dependencies */

// following example from https://stackoverflow.com/questions/56236348/how-to-setup-a-firebase-firestore-and-cloud-function-test-suit-with-firebase-emu
require('firebase-functions-test')();

const chai = require('chai');

const { assert } = chai;

const firebase = require('@firebase/testing');

const { projectId } = require('./envVar');

const admin = firebase.initializeAdminApp({ projectId });

beforeEach(async function () {
  this.timeout(0);
  await firebase.clearFirestoreData({ projectId });
});

async function snooz(time = 30000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

it('Add new entry', async function () {
  this.timeout(0);

  const diaryEntry = admin
    .firestore()
    .collection('users')
    .doc('testUser')
    .collection('entries')
    .doc('testEntry');

  await diaryEntry.set({
    title: 'Testing title',
    content: 'Testing content',
    createdDate: new Date(),
  });

  await snooz();

  const updatedEntry = (await diaryEntry.get()).data();

  console.log('entry', updatedEntry);

  assert.containsAllKeys(updatedEntry, [
    'title',
    'content',
    'createdDate',
    'sentimentScore',
    'sentimentMagnitude',
    'emotions',
  ]);
  assert.containsAllKeys(updatedEntry.emotions, [
    'emoji0',
    'emoji0_emotion',
    'emoji1',
    'emoji1_emotion',
    'emoji2',
    'emoji2_emotion',
    'emoji3',
    'emoji3_emotion',
    'emoji4',
    'emoji4_emotion',
  ]);
});
