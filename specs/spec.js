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
    await spec.pause(100);
    await spec.notExists('SettingsScreen.NameField');
    await spec.notExists('SettingsScreen.EmailField');
  });

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
        await spec.pause(100);
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
      });

      spec.it('Edit Screen shows up', async () => {
        await spec.press('DiaryScreen.EntryCard.0');
        await spec.pause(1000);
        await spec.press('DiaryEntryScreen.EditButton');
        await spec.exists('EntryComponent.Title');
        await spec.exists('EntryComponent.Content');
        await spec.exists('EntryComponent.SubmitButton');
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
};
