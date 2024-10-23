export const formatFirebaseAuthError = (errorCode) => {
  const errorMessages = {
    "Firebase: Error (auth/invalid-email).":
      "The email address is invalid. Please check and try again.",
    "Firebase: Error (auth/user-disabled).":
      "This user account has been disabled. Please contact support.",
    "Firebase: Error (auth/user-not-found).":
      "No account found with this email. Please sign up.",
    "Firebase: Error (auth/wrong-password).":
      "Incorrect password. Please try again.",
    "Firebase: Error (auth/email-already-in-use).":
      "This email is already in use by another account.",
    "Firebase: Error (auth/weak-password).":
      "Your password is too weak. Please choose a stronger password.",
    "Firebase: Error (auth/network-request-failed).":
      "Network error. Please check your internet connection.",
    "Firebase: Error (auth/too-many-requests).":
      "Too many unsuccessful login attempts. Please try again later.",
    "Firebase: Error (auth/requires-recent-login).":
      "Please log in again to proceed with this action.",
    "Firebase: Error (auth/invalid-credential).":
      "The provided credentials are invalid. Please try again.",
    "Please verify your email to login. A verification email has been sent.":
      "Please verify your email to login. A verification email has been sent.",
    "User not found in our user database":
      "User not found in our user database.",
    "No user is currently logged in.": "You are not currently logged in.",
    "An email address is required to send the password reset link.":
      "An email address is required to send the password reset link.",
    "Your account is deactivated. Please contact support.":
      "Your account is deactivated. Please contact support.",
  };

  return (
    errorMessages[errorCode] || "An unknown error occurred. Please try again."
  );
};
