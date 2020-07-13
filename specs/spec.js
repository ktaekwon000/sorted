export default (spec) => {
  spec.describe('Auth UI', () => {
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
      await spec.press('Signup.LoginButton');
    });

    spec.it('Forgot Password UI works', async () => {
      await spec.press('Login.ForgotPasswordButton');
      await spec.exists('ForgotPassword.MainText');
      await spec.exists('ForgotPassword.EmailInput');
      await spec.exists('ForgotPassword.ForgotPasswordButton');
      await spec.exists('ForgotPassword.LoginButton');
      await spec.press('ForgotPassword.LoginButton');
    });
  });

  spec.describe('Account system', () => {
    spec.it('Login works', async () => {
      await spec.exists('Login');
      await spec.fillIn('Login.EmailInput', 'cavy@example.com');
      await spec.fillIn('Login.PasswordInput', 'password');
      await spec.press('Login.LoginButton');
      await spec.pause(1000); // do not remove
      await spec.exists('DiaryScreen.LoadedDiaryView');
      await spec.exists('DiaryScreen.MenuButton');
    });

    spec.it('Menu shows name', async () => {
      await spec.press('DiaryScreen.MenuButton');
      await spec.exists('DrawerNavigation.NameField');
      await spec.containsText('DrawerNavigation.NameField', 'Cavy Example');
    });

    spec.it('Acccount Settings shows relevant details', async () => {
      await spec.press('DrawerNavigation.Account');
      await spec.exists('SettingsScreen.NameField');
      await spec.exists('SettingsScreen.EmailField');
      await spec.exists('SettingsScreen.UidField');
    });

    spec.it('Logout works', async () => {
      await spec.press('DiaryScreen.MenuButton');
      await spec.press('DrawerNavigation.Account');
      await spec.press('SettingsScreen.SignoutButton');
      await spec.pause(1000);
      await spec.notExists('SettingsScreen.NameField');
      await spec.notExists('SettingsScreen.EmailField');
      await spec.exists('Login.AppLogo');
      await spec.exists('Login.EmailInput');
      await spec.exists('Login.PasswordInput');
      await spec.exists('Login.LoginButton');
      await spec.exists('Login.SignupButton');
      await spec.exists('Login.ForgotPasswordButton');
    });
  });
};
