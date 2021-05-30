import passport from 'passport';
export default {
  private: passport.authenticate('jwt', { session: false })
};
