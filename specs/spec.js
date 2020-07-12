export default (spec) => {
  spec.describe('Auth UI', () => {
    spec.it('Elements are visible', async () => {
      await spec.exists('Login.AppLogo');
      await spec.exists('Login.EmailInput');
      await spec.exists('Login.PasswordInput');
      await spec.exists('Login.LoginButton');
      await spec.exists('Login.SignupButton');
      await spec.exists('Login.ForgotPasswordButton');
    });
  });

  spec.describe('Logging in', () => {
    spec.it('Login works', async () => {
      await spec.exists('Login');
      await spec.fillIn('Login.EmailInput', 'cavy@example.com');
      await spec.fillIn('Login.PasswordInput', 'password');
      await spec.press('Login.LoginButton');
      await spec.pause(500); // do not remove
      await spec.findComponent('DiaryScreen.LoadedDiaryView');
    });
  });
};
