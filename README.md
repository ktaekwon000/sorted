# sorted

A diary app built for your emotions.
Available only for Android.

Built with [React Native](https://reactnative.dev/), [Firebase](https://firebase.google.com/) and [Google Cloud](https://cloud.google.com/). 

Emotion Identification powered by [torchMoji](https://github.com/huggingface/torchMoji), a [pyTorch](http://pytorch.org/) implementation of the [DeepMoji](https://github.com/bfelbo/DeepMoji) model developed by Bjarke Felbo, Alan Mislove, Anders Søgaard, Iyad Rahwan and Sune Lehmann. Check out their [paper](https://arxiv.org/abs/1708.00524) and [demo](http://deepmoji.mit.edu/).
A fork of torchMoji, adapted for use in Google Cloud Functions, was used for this project. Check it out [here](https://github.com/ktaekwon000/torchMoji-CloudFunction).

Testing implemented with [Cavy](https://cavy.app/).

![Poster Image](https://i.imgur.com/0kXWaNa.png)
Orbital 2020 project by Kim Tae Kwon and Kim Sangwoo

The following are links to Milestone 3 documents:
| README | Poster | Video |
| :----: |:------:|:-----:|
| [Google Docs](https://docs.google.com/document/d/1pZQDtq6-G5pVYrkst3WwukMJ7f2muJ0UM_hr6ivnZNk/edit?usp=sharing) | [Image](https://i.imgur.com/4wZWQDQ.png) | [Youtube](https://youtu.be/7p5bQNOlbBc) |

# Installation

1. Clone the repo.
1. Rename `firebase/funcions/example.apiURL.json` to `apiURL.json`.
1. Set up API for emotion analysis over at [torchMoji-cloudfunction](https://github.com/ktaekwon000/torchMoji-CloudFunction) and copy the endpoint URL into `apiURL.json`.
1. Rename the file `config/Firebase/example.firebaseConfig.js` to `firebaseConfig.js` and replace with own keys.
1. Follow instructions in [firebase](firebase) to set up firebase cloud functions.
1. Run `npm start` then connect using Expo app.

# Testing

1. Create a user with credentials `cavy@example.com` and `password`. Make a sample post under that account, with the content `I am happy. I am also angry.`.
1. Change `global.isTestingEnvironment` in `CustomRootComponent.js` to `true`.
1. Clear the app data of the Android Expo client. (This is optional, but often trying to work around this will cause crashes and errors.)
1. Run `npm start` and connect a device using the Expo app. If any tests fail, they will show up as yellowboxes on the Expo client. An object representing the full report of the tests will be printed to the console after the tests.
1. Before restarting the app, remember to change the global variable `global.isTestingEnvironment` back to false.

Note: The timeouts within the tests are hardcoded, based on the performance of my own test device (Galaxy S6, a high-end device from 2015) and my network speeds. If you experience cavy attempting to run tests before the elements/UI have appeared, you might have to increase these timeouts in `specs/specs.js`.

# Credits

Login starter kit from [expo-community/expo-firebase-starter](https://github.com/expo-community/expo-firebase-starter)
