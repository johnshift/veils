/**
 * `Session` is the stored info of current authenticated user in the current session.
 * Info such as `name`, `username`, etc., are used for navigation, display texts etc.,
 */
export type Session = {
  // Supabase user id
  id: string;

  // Profile ids
  username: string;
  veil: string;

  // Public name
  firstName: string;
  lastName: string;

  // Avatars
  avatar: string;
  veilAvatar: string;
};
