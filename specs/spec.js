/* eslint-disable no-console */
/**
 * spec tests
 * Log out after every spec.describe(). Assume that app starts in fresh state in
 * a new spec.describe().
 * This is for easier test filtering.
 */

import { format } from 'date-fns';

const specItLogin = (spec) =>
  spec.it('Login', async () => {
    await spec.exists('Login');
    await spec.fillIn('Login.EmailInput', 'cavy@example.com');
    await spec.fillIn('Login.PasswordInput', 'password');
    await spec.press('Login.LoginButton');
    await spec.pause(1000); // do not remove, network call
  });

const specItLogout = (spec) =>
  spec.it('Logout', async () => {
    await spec.press('DiaryScreen.MenuButton');
    await spec.press('DrawerNavigation.Account');
    await spec.press('SettingsScreen.SignoutButton');
    await spec.notExists('SettingsScreen.NameField');
    await spec.notExists('SettingsScreen.EmailField');
  });

/**
 * The following line represents 40 second wait!
 * It's hard to predict how long google cloud functions will take to
 * analyze text. Anecdotally, it seems to range from ~6 seconds to ~35
 * seconds. Change the number below to a higher number if you're more
 * patient, and lower if if you do not want to spent a full 2 minutes on
 * the 'emotionsSystem' test.
 */
const cloudFunctionWaitTime = 40 * 1000;

export default (spec) => {
  spec.describe(
    'Auth UI',
    () => {
      spec.it('Initial elements are visible', async () => {
        await spec.exists('Login.AppLogo');
        await spec.exists('Login.EmailInput');
        await spec.exists('Login.PasswordInput');
        await spec.exists('Login.LoginButton');
        await spec.exists('Login.SignupButton');
        await spec.exists('Login.ForgotPasswordButton');
      });

      spec.it('Sign Up UI shows up', async () => {
        await spec.press('Login.SignupButton');
        await spec.exists('Signup.NameInput');
        await spec.exists('Signup.EmailInput');
        await spec.exists('Signup.PasswordInput');
        await spec.exists('Signup.PasswordConfirmInput');
        await spec.exists('Signup.AgreeCheckBox');
        await spec.exists('Signup.SignupButton');
        await spec.exists('Signup.LoginButton');
      });

      spec.it('Forgot Password UI shows up', async () => {
        await spec.press('Login.ForgotPasswordButton');
        await spec.exists('ForgotPassword.MainText');
        await spec.exists('ForgotPassword.EmailInput');
        await spec.exists('ForgotPassword.ForgotPasswordButton');
        await spec.exists('ForgotPassword.LoginButton');
      });
    },
    'authUI'
  );

  spec.describe(
    'Account system',
    () => {
      spec.it('Login works', async () => {
        await spec.exists('Login');
        await spec.fillIn('Login.EmailInput', 'cavy@example.com');
        await spec.fillIn('Login.PasswordInput', 'password');
        await spec.press('Login.LoginButton');
        await spec.pause(1000); // do not remove, network call
        await spec.exists('DiaryScreen.LoadedDiaryView');
      });

      spec.it('Menu shows name', async () => {
        await spec.press('DiaryScreen.MenuButton');
        await spec.exists('DrawerNavigation.NameField');
        await spec.containsText('DrawerNavigation.NameField', 'Cavy Example');
      });

      spec.it('Acccount Settings shows relevant details', async () => {
        await spec.press('DiaryScreen.MenuButton');
        await spec.press('DrawerNavigation.Account');
        await spec.containsText('SettingsScreen.NameField', 'Cavy Example');
        await spec.containsText(
          'SettingsScreen.EmailField',
          'cavy@example.com'
        );
        await spec.containsText(
          'SettingsScreen.UidField',
          'wgVfV4YkbucZvFQo72JoREbn7L63'
        );
      });

      spec.it('Logout works', async () => {
        await spec.press('DiaryScreen.MenuButton');
        await spec.press('DrawerNavigation.Account');
        await spec.press('SettingsScreen.SignoutButton');
        await spec.notExists('SettingsScreen.NameField');
        await spec.notExists('SettingsScreen.EmailField');
        await spec.exists('Login.AppLogo');
        await spec.exists('Login.EmailInput');
        await spec.exists('Login.PasswordInput');
        await spec.exists('Login.LoginButton');
        await spec.exists('Login.SignupButton');
        await spec.exists('Login.ForgotPasswordButton');
      });
    },
    'authSystem'
  );

  spec.describe(
    'Entry UI',
    () => {
      specItLogin(spec);

      spec.it('Diary UI shows up', async () => {
        await spec.exists('DiaryScreen.MenuButton');
        await spec.exists('DiaryScreen.NewEntryButton');
        await spec.exists('DiaryScreen.EntryCard.0');
      });

      spec.it('New Entry Screen shows up', async () => {
        await spec.press('DiaryScreen.NewEntryButton');
        await spec.exists('EntryComponent.Title');
        await spec.exists('EntryComponent.Content');
        await spec.exists('EntryComponent.SubmitButton');
        await spec.exists('AppNavigation.BackButton');
      });

      spec.it('Entry Screen shows up', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.exists('DiaryEntryScreen.EditButton');
        await spec.exists('DiaryEntryScreen.TitleText');
        await spec.exists('DiaryEntryScreen.CreatedDateText');
        await spec.exists('DiaryEntryScreen.ContentText');
        await spec.exists('DiaryEntryScreen.SentimentText');
        await spec.exists('DiaryEntryScreen.EmotionsButton');
        await spec.exists('DiaryEntryScreen.DeleteButton');
        await spec.exists('AppNavigation.BackButton');
      });

      spec.it('Edit Screen shows up', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EditButton');
        await spec.exists('EntryComponent.Title');
        await spec.exists('EntryComponent.Content');
        await spec.exists('EntryComponent.SubmitButton');
        await spec.exists('AppNavigation.BackButton');
      });

      specItLogout(spec);
    },
    'entryUI'
  );

  spec.describe(
    'Entry System',
    () => {
      specItLogin(spec);

      spec.it('Make new entry', async () => {
        await spec.press('DiaryScreen.NewEntryButton');
        await spec.fillIn('EntryComponent.Title', 'Cavy sample entry');
        await spec.fillIn(
          'EntryComponent.Content',
          'I am ecstatic about this.'
        );
        await spec.press('EntryComponent.SubmitButton');
        await spec.pause(1000);
        await spec.exists('DiaryScreen.EntryCard.0');
        await spec.exists('DiaryScreen.EntryCard.1'); // check number of entries
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.containsText(
          'DiaryEntryScreen.TitleText',
          'Cavy sample entry'
        );
        await spec.containsText(
          'DiaryEntryScreen.CreatedDateText',
          format(new Date(), "do 'of' MMMM, R")
        );
        await spec.containsText(
          'DiaryEntryScreen.ContentText',
          'I am ecstatic about this.'
        );
      });

      spec.it('Edit entry', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EditButton');
        await spec.fillIn(
          'EntryComponent.Title',
          'Cavy sample entry: Angry edition'
        );
        await spec.fillIn(
          'EntryComponent.Content',
          'I am very sad and angry. I am so upset.'
        );
        await spec.press('EntryComponent.SubmitButton');
        await spec.pause(1000);
        await spec.exists('DiaryScreen.EntryCard.0');
        await spec.exists('DiaryScreen.EntryCard.1'); // check number of entries
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.containsText(
          'DiaryEntryScreen.TitleText',
          'Cavy sample entry: Angry edition'
        );
        await spec.containsText(
          'DiaryEntryScreen.CreatedDateText',
          format(new Date(), "do 'of' MMMM, R")
        );
        await spec.containsText(
          'DiaryEntryScreen.EditedDateText',
          format(new Date(), "do 'of' MMMM, R")
        );
        await spec.containsText(
          'DiaryEntryScreen.ContentText',
          'I am very sad and angry. I am so upset.'
        );
      });

      spec.it('Delete entry', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.DeleteButton');
        await spec.pause(1000);
        await spec.exists('DiaryScreen.EntryCard.0');
        await spec.notExists('DiaryScreen.EntryCard.1');
      });

      specItLogout(spec);
    },
    'entrySystem'
  );

  spec.describe(
    'Emotions UI',
    () => {
      specItLogin(spec);

      spec.it('Emoji screen shows up', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.exists('EmojiScreen.TitleText');
        await spec.exists('AppNavigation.BackButton');
        await spec.exists('EmojiScreen.emoji0Button');
        await spec.exists('EmojiScreen.emoji1Button');
        await spec.exists('EmojiScreen.emoji2Button');
        await spec.exists('EmojiScreen.emoji3Button');
        await spec.exists('EmojiScreen.emoji4Button');
      });

      spec.it('Emotion screen shows up (Joy variant)', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji4Button');
        await spec.exists('AppNavigation.BackButton');
        await spec.containsText('EmotionsScreen.EmotionText', 'Joy');
        await spec.exists('EmotionsScreen.HelplinesButton');
        await spec.exists('EmotionsScreen.RecommendationText');
        await spec.exists('EmotionsScreen.ShareButton');
      });

      spec.it('Emotion screen shows up (Outrage variant)', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji0Button');
        await spec.exists('AppNavigation.BackButton');
        await spec.containsText('EmotionsScreen.EmotionText', 'Outrage');
        await spec.exists('EmotionsScreen.HelplinesButton');
        await spec.exists('EmotionsScreen.RecommendationText');
        await spec.exists('EmotionsScreen.LearnMoreButton');
      });

      spec.it(
        'Navigation from emotions screen to helplines screen',
        async () => {
          await spec.press('DiaryScreen.EntryCard.0');
          await spec.pause(1000);
          await spec.press('DiaryEntryScreen.EmotionsButton');
          await spec.press('EmojiScreen.emoji0Button');
          await spec.press('EmotionsScreen.HelplinesButton');
          await spec.exists('ContactsScreen.View');
        }
      );

      specItLogout(spec);
    },
    'emotionsUI'
  );

  spec.describe(
    'Emotions system',
    () => {
      specItLogin(spec);

      spec.it('Make new entry', async () => {
        await spec.press('DiaryScreen.NewEntryButton');
        await spec.fillIn(
          'EntryComponent.Title',
          'Cavy sample entry (emotions system)'
        );
        await spec.fillIn(
          'EntryComponent.Content',
          'I am ecstatic about this.'
        );
        await spec.press('EntryComponent.SubmitButton');
        await spec.pause(1000);
      });

      spec.it('Google NLP response (New entry)', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.containsText(
          'DiaryEntryScreen.ContentText',
          'I am ecstatic about this.'
        );
        console.log(
          `pausing for ${cloudFunctionWaitTime} milliseconds for cloud functions...`
        );
        await spec.pause(cloudFunctionWaitTime);
        await spec.press('DiaryEntryScreen.AnalyzingText');
        await spec.pause(1000);
        await spec.containsText(
          'DiaryEntryScreen.SentimentText',
          'your feelings are very positive.'
        );
      });

      spec.it('Emoji response (New Entry)', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.containsText(
          'DiaryEntryScreen.ContentText',
          'I am ecstatic about this.'
        );

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji0Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Optimism');
        await spec.exists('EmotionsScreen.ShareButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji1Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Interest');
        await spec.exists('EmotionsScreen.ShareButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji2Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Joy');
        await spec.exists('EmotionsScreen.ShareButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji3Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Joy');
        await spec.exists('EmotionsScreen.ShareButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji4Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Optimism');
        await spec.exists('EmotionsScreen.ShareButton');
      });

      spec.it('Edit entry', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EditButton');
        await spec.fillIn(
          'EntryComponent.Content',
          'I am very sad and angry. I am so upset.'
        );
        await spec.press('EntryComponent.SubmitButton');
        await spec.pause(1000);
      });

      spec.it('Google NLP response (New entry)', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.containsText(
          'DiaryEntryScreen.ContentText',
          'I am very sad and angry. I am so upset.'
        );
        console.log(
          `pausing for ${cloudFunctionWaitTime} milliseconds for cloud functions...`
        );
        await spec.pause(cloudFunctionWaitTime);
        await spec.press('DiaryEntryScreen.AnalyzingText');
        await spec.pause(1000);
        await spec.containsText(
          'DiaryEntryScreen.SentimentText',
          'your feelings are negative.'
        );
      });

      spec.it('Emoji response (New Entry)', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.containsText(
          'DiaryEntryScreen.ContentText',
          'I am very sad and angry. I am so upset.'
        );

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji0Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Outrage');
        await spec.exists('EmotionsScreen.LearnMoreButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji1Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Annoyance');
        await spec.exists('EmotionsScreen.LearnMoreButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji2Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Pessimism');
        await spec.exists('EmotionsScreen.LearnMoreButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji3Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Boredom');
        await spec.exists('EmotionsScreen.LearnMoreButton');
        await spec.press('AppNavigation.BackButton');

        await spec.press('DiaryEntryScreen.EmotionsButton');
        await spec.press('EmojiScreen.emoji4Button');
        await spec.containsText('EmotionsScreen.EmotionText', 'Despair');
        await spec.exists('EmotionsScreen.LearnMoreButton');
      });

      spec.it('Delete entry', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.DeleteButton');
        await spec.pause(1000);
      });

      specItLogout(spec);
    },
    'emotionsSystem'
  );

  spec.describe(
    'Miscellaneous',
    () => {
      specItLogin(spec);

      spec.it('Helplines Screen can be loaded', async () => {
        await spec.press('DiaryScreen.MenuButton');
        await spec.press('DrawerNavigation.Helplines');
        await spec.exists('ContactsScreen.View');
      });

      spec.it('Stats Screen can be loaded', async () => {
        await spec.press('DiaryScreen.MenuButton');
        await spec.press('DrawerNavigation.Stats');
        await spec.pause(1000);
        await spec.exists('StatsScreen.LoadedStatsView');
      });

      specItLogout(spec);
    },
    'misc'
  );
};
