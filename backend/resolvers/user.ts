import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from '../entity/User';
import { JWT_SECRET_KEY } from '../config/constants';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface IRegisterArgs {
    registerInput: RegisterInput
}

interface ILoginArgs {
    email: string;
    password: string;
}

export default {
    Query: {
        login: async (_: any, { email, password }: ILoginArgs) => {
            const userRepository = getRepository(User);
            let user: User;
            try {
                user = await userRepository.findOneOrFail({ where: { email } });
            } catch (error) {
                throw error;
            }

            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                throw new Error('email or password is invalid!');
            }

            //Sing JWT, valid for 1 hour
            const token = sign(
                { userId: user.id, username: user.email },
                JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            console.log({ token })

            return {
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            };
        }
    },
    Mutation: {
        register: async (_: any, { registerInput }: IRegisterArgs) => {
            const { name, email, password } = registerInput;
            console.log({ name, email, password });
            let user = new User();
            user.name = name;
            user.email = email;
            user.password = password;

            // Hash user Password
            user.hashPassword();

            const userRepository = getRepository(User);
            try {
                await userRepository.save(user);
                return true;
            } catch (e) {
                throw e;
            }
        }
    }
}