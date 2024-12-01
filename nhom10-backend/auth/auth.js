const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserGmail = require('../models/UserGmail');

passport.use(new GoogleStrategy({
    clientID: '1042680925036-i8hf7m7ndqt0u3b7cs2seseuc03d227m.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Kiểm tra xem người dùng đã tồn tại trong DB chưa
        const existingUser = await UserGmail.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // Nếu chưa, tạo người dùng mới
        const newUser = new UserGmail({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0].value
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, null);
    }

    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserGmail.findById(id);
    done(null, user);
});