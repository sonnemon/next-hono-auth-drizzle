export const getErrorMessage = (error: string) => {
  return (
    {
      CredentialsSignin: 'Invalid credentials',
      CredentialsSignout: 'Sign out failed',
    }[error] || 'Something went wrong'
  );
};
