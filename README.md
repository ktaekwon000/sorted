# sorted

![Poster Image](https://i.imgur.com/mAwQgxJ.png)
Orbital 2020 project by Kim Tae Kwon and Kim Sangwoo

The following are links to Milestone 2 documents:
| README | Poster | Video |
| :----: |:------:|:-----:|
| [Google Docs](https://docs.google.com/document/d/1SLPb2OJOF4XCtag-7TVqmqevsQZ7x8REouIweSJDAIU/edit?usp=sharing) | [Image](https://i.imgur.com/mAwQgxJ.png) | [Youtube](https://youtu.be/PO5M3X_wcu4) |

# Installation

1. Clone the repo.
1. Rename `firebase/funcions/example.apiURL.json` to `apiURL.json`.
1. Set up API for emotion analysis over at [torchMoji-cloudfunction](https://github.com/delicious-chocomint/torchMoji-CloudFunction) and copy the endpoint URL into `apiURL.json`
1. Rename the file `config/Firebase/example.firebaseConfig.js` to `firebaseConfig.js` and replace with own keys.
1. Follow instructions in [firebase](firebase) to set up firebase cloud functions.
1. Run `npm start` then connect using Expo app.

# Testing

1. Change `global.isTestingEnvironment` in `CustomRootComponent.js` to `true`.
1. Clear the app data of the Android Expo client. (This is optional, but often trying to work around this will cause crashes and errors.)
1. Run `npm start` and connect a device using the Expo app. If any tests fail, they will show up as yellowboxes on the Expo client.

# Credits

Login starter kit from [expo-community/expo-firebase-starter](https://github.com/expo-community/expo-firebase-starter)
