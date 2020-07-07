import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import sample from 'lodash.sample';

// These activities were not vetted by any professionals and have been made up
// by the members of Sorted.
const EMOTIONS_TO_DATA = {
  Amazement: {
    activities: [
      'Try sharing your exciting moments on Instagram!',
      'Follow up on your excitement with a quick full-body workout exercise!',
      'How about expressing your feelings as a drawing?',
    ],
    link:
      'https://www.quora.com/What-is-the-best-thing-to-do-when-very-happy-or-excited',
  },
  Amusement: {
    activities: [
      'What amused you so much? Share it with your friends on Instagram!',
      'Were you being amused with your friend? Try calling your friends to see if they will join you!',
      'Whatsapp your friends to share what amused you so much!',
    ],
  },
  Annoyance: {
    activities: [
      'Try distracting yourself from the annoyances in your life with some music. Classic music is known to help people calm down.',
      'Try having a conversation with yourself on what annoyed you. You might be able to see the situation from a different perspective.',
      "Try calling your family or friends to tell them about what happened. We're sure they'll lend a helping hand.",
    ],
    link: 'https://www.wikihow.com/Be-Less-Annoyed-With-People',
  },
  Anxiety: {
    activities: [
      "Try taking a break from what you're doing and taking some deep breaths. Give yourself some free time.",
      'Count to 10 slowly, or 20 if needed. It might calm you down.',
      'Try out some humor. Laughing at some jokes might help you calm down.',
    ],
    link: 'https://adaa.org/tips',
  },
  Apppreciation: {
    activities: [
      "It's great that you are appreciating the situation or those around you. How about sharing this positivity on Instagram?",
      'If you are appreciating a special someone, why not send them a message over Whatsapp?',
      "If you're appreciating a special someone, how about sending them a small but special present?",
    ],
  },
  Boredom: {
    activities: [
      "Try watching some live streams of animals online, to feel like you're really there!",
      'Try planning for your dream holiday. Take some free time to fantasise about your dream trip!',
      "When was the last time you tried baking? Try it, it's really fun!",
    ],
    link:
      'https://www.mentalfloss.com/article/624277/fun-things-to-do-when-you-are-bored',
  },
  Curiosity: {
    activities: [
      'Try researching about random topics on Wikipedia! You might learn a lot of things :)',
      "If you've learnt new stuff from your curiousity, how about arranging what you've learnt in a notebook?",
      "Try posting the new things you've learnt on a group chat!",
    ],
  },
  Despair: {
    activities: [
      "If you can talk to your friends or family about this matter, confide in them about this topic. We're sure they'll lend a helping hand.",
      'Try breaking the pattern. Introduce something new into your life, like exercise.',
      'Think about the things that have caused you to feel this despair. If you think over them, you might come to realise that they might not matter in the far future.',
    ],
    link:
      'https://www.lifehack.org/articles/communication/10-steps-fight-your-way-out-despair-and-find-happiness-again.html',
  },
  Disappointment: {
    activities: [
      'Give the situation some time. When you look back at the situation later, you might realise that it was not so serious.',
      'Try having a conversation with yourself on what disappointed you. You might see the situation from a different perspective.',
      'Try looking for new opportunities. Taking on new activities may help you move on from this situation.',
    ],
    link: 'https://www.wikihow.com/Deal-With-Disappointment',
  },
  Disapproval: {
    activities: [
      "Think carefully over what you are disapproving of. Once you've given it some time, you may come to realise it wasn't very important.",
      'Try talking to your friends or family about this. It may be that you may be being overly judgemental.',
      "Try imagining saying what you're thinking out loud. It may help you to realise that you might be overly judgemental.",
    ],
    link: 'https://www.wikihow.com/Deal-With-Disappointment',
  },
  Disgust: {
    activities: [
      'Try talking to your friends or family about this. It may be that you may be being overly judgemental.',
      'Try taking some deep breaths to calm down. You might realsie that you may be disgusted over something small.',
      "Give it some time and think about what you were so disgusted about. It might be something small and easily forgotten, which doesn't matter much.",
    ],
    link:
      'https://www.yourtango.com/experts/billmaiermsw/what-do-when-you-feel-absolute-disgust-toward-others-affects-your-mental-health',
  },
  Dismay: {
    activities: [
      'Try focusing on what you want to have. It may give you some hope to bear through the situation.',
      'Try concentrating and accepting your situation right now. You may be feeling worse by not accepting your situation right now.',
      'Try talking to your friends or family. Remember that there is always someone around to support you.',
    ],
    link:
      'https://www.psychologytoday.com/sg/blog/out-the-ivory-tower/201905/5-ways-deal-distress',
  },
  Embarrassment: {
    activities: [
      'Give the situation some time and think back at the situation. It might not have been something much, and might be forgotten by others in a short period of time.',
      'Try to laugh over it. If you find the situation humorous, you might find it less embarrasing and find it easier to forget the embarrassment.',
      "Forgive yourself. Everyone makes mistakes and embarrassing situations from time to time, and it's not uncommon.",
    ],
    link: 'https://www.wikihow.com/Deal-With-Embarrassment',
  },
  Hatred: {
    activities: [
      'Try thinking over the situation and asking yourself if that hatred is deserved. WHen given some time, you might realise that the hatred might have been for something small.',
      'Breathe slowly and deeply when you feel hatred. When you calm down, you might realise that the hatred you felt might have been exaggerated.',
      'Try asking someone to be a meditator between you and the person you hate. You might end up coming to a civil agreement with the person you hate.',
    ],
    link: 'https://www.wikihow.com/Stop-Hating-Someone',
  },
  Interest: {
    activities: [
      'What interested you so much? Share it with your friends on Instagram!',
      'Have you shared the interesting thing with your friend yet? Try calling your friends to see if they will join you!',
      'Whatsapp your friends to share what interested you so much!',
    ],
  },
  Joy: {
    activities: [
      'Try sharing your happy moments on Instagram!',
      'Follow up on your happiness with a quick full-body workout exercise!',
      'How about expressing your feelings as a drawing?',
    ],
    link:
      'https://www.quora.com/What-is-the-best-thing-to-do-when-very-happy-or-excited',
  },
  Love: {
    activities: [
      "It's great that you found a thing you love! How about sharing it with your friends on Instagram!",
      'Is it love for that special someone? Send them a message to express your feelings!',
      'Is it love for that special someone? How about treating them to a dessert?',
    ],
  },
  Morbidness: {
    activities: [
      'Try focusing on what you want to have. It may give you some hope to bear through the situation.',
      'Try concentrating and accepting your situation right now. You may be feeling worse by not accepting your situation right now.',
      'Try talking to your friends or family. Remember that there is always someone around to support you.',
    ],
    link:
      'https://www.psychologytoday.com/sg/blog/out-the-ivory-tower/201905/5-ways-deal-distress',
  },
  Optimism: {
    activities: [
      "It's great that you're looking forward to something! How about sharing the news with friends?",
      'Are you optimistic about a future event? How about noting it down on your calendar?',
      "It's great that you're looking forward to something? How about sharing the positivity on Instagram?",
    ],
  },
  Outrage: {
    activities: [
      'If you are angry, try thinking before you speak. Saying something impulsefully might worsen the situation.',
      'Try some exercise. Exercise is known to help relieve anger in some people, and it also serves as a distraction from the current situation.',
      'Breathe slowly and deeply when you feel anger. When you calm down, you might realise that the anger you felt might have been exaggerated.',
    ],
    link:
      'https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434',
  },
  Pessimism: {
    activities: [
      'Try writing down the good things that have happened to you in the past few days, no matter how small. It might help you reliase that things will turn out fine.',
      'Try introducing some exercise into your routine. It is known that exercise can help to release inner tension and stress.',
      "Take a step back, and think carefully about the situation. Once you've given it some thought, you might come to realise that you were exaggerating the negative aspects of the situation.",
    ],
    link: 'https://www.positivityblog.com/positive-thinking/',
  },
  Pride: {
    activities: [
      "It's good to be proud of yourself sometimes, but be sure to keep yourself in check.",
      'Try asking yourself questions about the current situation. You might be being overconfident and arrogant.',
      'Try bring more open-minded and listen more to others. Your pride may be stopping you from taking advice from others.',
    ],
    link: 'https://leadchangegroup.com/6-ways-overcome-pride/',
  },
  Sadness: {
    activities: [
      'Try doing small activities, such as taking a walk to the nearest supermarket. You might be able to distract yourself from your feelings and feel better.',
      'Try accepting the current situation. Sometimes, thinking over the current situation and accepting it may help you feel better.',
      'Try forgetting about the painful memory. Sometimes, it may be better to forget about the sadness, and time will solve the problem.',
    ],
    link:
      'https://www.psychologytoday.com/sg/blog/how-do-life/202001/dealing-sadness',
  },
};

const EmotionsScreen = ({ navigation }) => {
  const emotion = navigation.getParam('emotion');

  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20 }}>
        We think that you&apos;re feeling...
      </Text>
      <Text h4 style={{ textAlign: 'center' }}>
        {emotion.emoji} {emotion.emotion}
      </Text>
      {/* <View style={{ padding: 10 }} /> */}
      <TouchableOpacity onPress={() => navigation.navigate('Helplines')}>
        <Text style={{ textAlign: 'center', margin: 15, fontSize: 10 }}>
          Please note that these are recommendations written by developers of
          the app, not mental health professionals. If you need a professional
          to talk to, check out some of helplines available by tapping these
          lines of text.
        </Text>
      </TouchableOpacity>
      {emotion.emotion in EMOTIONS_TO_DATA ? (
        <View>
          <Text
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
          >
            Our recommendation to you is...
          </Text>
          <Text style={{ margin: 5, fontSize: 20 }}>
            {sample(EMOTIONS_TO_DATA[emotion.emotion].activities)}
          </Text>
          {'link' in EMOTIONS_TO_DATA[emotion.emotion] ? (
            <Button
              title="Tap here to learn more"
              type="outline"
              onPress={() =>
                Linking.openURL(EMOTIONS_TO_DATA[emotion.emotion].link)
              }
            />
          ) : null}
        </View>
      ) : (
        <Text style={{ textAlign: 'center', fontSize: 16 }}>
          The emotion specified was not found in the database. Please contact
          the developers with a screenshot of this screen.
        </Text>
      )}
    </View>
  );
};

EmotionsScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default EmotionsScreen;
