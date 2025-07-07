import * as z from "zod/v4"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'
import { equalTo, get, orderByChild, query, ref, set } from 'firebase/database'

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: 'This field is required!'
    }),
    lastName: z.string().min(1, {
        message: 'This field is required!'
    }),
    username: z
        .string()
        .min(6, { message: "Username must be at least 6 char longs!" })
        .regex(
            /^[a-zA-Z0-9_]*$/,
            "Username must not contain special characters and spaces!"
        )
        .trim(),
    email: z.email().min(1, {
        message: 'This field is required!'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 chars'
    })
})

export default function RegisterPage() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(data) {
        const { email, password, username } = data

        try {
            // check if username is already taken
            const usersRef = ref(db, 'users')
            const q = query(usersRef, orderByChild('username'), equalTo(username))

            const snapshot = await get(q)

            if (!snapshot.exists()) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)

                await set(
                    ref(db, `users/${userCredential.user.uid}`),
                    {
                        uid: userCredential.user.uid,
                        chats: {
                            placeholder: true
                        },
                        ...data
                    }
                )

                navigate('/login')
            } else {
                throw new Error('Username is already taken')
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('root', {
                    message: 'This email is already in use'
                })
            } else {
                setError('root', {
                    message: error.message
                })
            }
            console.log(error)
        }
    }

    return (
        <div className='auth__container'>
            <section className='auth'>
                <form className='auth__form' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='auth__form-title'>Registration</h1>
                    <div className="form-wrapper">
                        <div className="form-row">
                            <input
                                className={`form-input${errors.firstName ? ' error' : ''}`}
                                type='text'
                                placeholder="First name"
                                {...register('firstName')}
                            />
                            {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                        </div>
                        <div className="form-row">
                            <input
                                className={`form-input${errors.lastName ? ' error' : ''}`}
                                type='text'
                                placeholder="Last name"
                                {...register('lastName')}

                            />
                            {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div className="form-row">
                        <input
                            className={`form-input${errors.username ? ' error' : ''}`}
                            type='text'
                            placeholder="Username"
                            {...register('username')}
                        />
                        {errors.username && <p className="form-error">{errors.username.message}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            className={`form-input${errors.email ? ' error' : ''}`}
                            type='text'
                            placeholder="Email"
                            {...register('email')}
                            autoComplete='username'
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            className={`form-input${errors.password ? ' error' : ''}`}
                            type='password'
                            placeholder="Password"
                            name='password'
                            {...register('password')}
                            autoComplete='new-password'
                        />
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>
                    <button className='btn primary-btn' type='submit' disabled={isSubmitting}>
                        {!isSubmitting && 'Register'}
                        {isSubmitting && <div className="spinner-wrapper"></div>}
                    </button>
                    {errors.root && <p className="form-error">{errors.root.message}</p>}
                    <Link className='form-link' to="/login"><span>Log in</span> to your existing account!</Link>
                </form>
            </section>
        </div>
    )
}