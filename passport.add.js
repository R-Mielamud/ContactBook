const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const User = require("./api/user/user.model");
const { compareSync } = require("bcryptjs");

passport.config = () => {
    passport.use(
        "local",
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: "email",
                passwordField: "password"
            },
            async (req, email, password, callbackfn) => {
                try {
                    const user = await User.findOne({ email });
                    
                    if (!user) {
                        return callbackfn({ status: 401, message: "Invalid email or password" }, null);
                    }

                    if (compareSync(password, user.password)) {
                        await User.populate(user, {
                            path: "photo",
                            select: "url"
                        });

                        return callbackfn(null, user);
                    }

                    return callbackfn({ status: 401, message: "Invalid email or password" }, null);
                } catch (err) {
                    return callbackfn(err, null);
                }
            }
        )
    );

    const JWTOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    };

    passport.use(
        "jwt",
        new JWTStrategy(
            JWTOptions,
            async ({ id }, callbackfn) => {
                try {
                    const user = await User.findById(id);
                    return user ? callbackfn(null, user) : callbackfn({ status: 401, message: "Token is invalid." }, null);
                } catch (err) {
                    return callbackfn(err, null);
                }
            }
        )
    );

    passport.serializeUser(async (req, user, callbackfn) => {
        return callbackfn(null, user._id);
    });

    passport.deserializeUser(async (req, id, callbackfn) => {
        try {
            const user = await User.findById(id);
            user.populate("photo", "url");
            return callbackfn(null, user);
        } catch (err) {
            return callbackfn(err, null);
        }
    });
}

module.exports = passport;
