const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken, verifyToken } = require('../helpers/jwt.js')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthController {
    static async registerUser(req, res, next) {
        try {
            const { first_name, last_name, email, password } = req.body
            const createdUser = await User.create({ 
                first_name, 
                last_name, 
                email, 
                password 
            })
            
            res.status(201).json({
                id: createdUser.id, 
                first_name: createdUser.first_name, 
                last_name: createdUser.last_name, 
                email: createdUser.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body

            if(!email || !password) {
                throw({name: 'InvalidCredentials'})
            } else {
                const foundUser = await User.findOne({where: { email }})
    
                if(!foundUser) {
                    throw({name: 'InvalidCredentials'})
                } else {
                    const isValidPassword = comparePassword(password, foundUser.password)
    
                    if(!isValidPassword) {
                        throw({name: 'InvalidCredentials'})
                    } else {
                        const access_token = signToken({
                            id: foundUser.id,
                            first_name: foundUser.first_name,
                            last_name: foundUser.last_name,
                            email: foundUser.email,
                            isGoogleUser: false
                        })
    
                        res.status(200).json({ access_token })
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })

            const { email, given_name, family_name } = ticket.getPayload()
    
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: { 
                    first_name: given_name,
                    last_name: family_name,
                    email,
                    password: email,
                }
            })
            
            const access_token = signToken({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                isGoogleUser: true
            })

            res.status(201).json({ access_token })
        } catch (err) {
            next(err)
        }
    }

    static async getLoggedInUserInfo(req, res, next) { 
        try {
            const payload = verifyToken(req.headers.access_token) 
            const {id, first_name, last_name, email, isGoogleUser} = payload
            
            const foundUser = await User.findOne({where: {id, first_name, last_name, email}})

            if(!foundUser) {
                throw({name: 'InvalidToken'})
            } else {
                res.status(200).json({id, first_name, last_name, email, isGoogleUser}) 
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController