import * as z from "zod/v4"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'
import { child, get, ref } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../state/user/userSlice'


const formSchema = z.object({
    email: z.email().min(1, {
        message: 'This field is required!'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 chars'
    })
})

export default function LoginPage() {
    const userState = useSelector(state => state.user.value)
    const dispatch = useDispatch()
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
        const { email, password } = data

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const userId = userCredential.user.uid

            const dbRef = ref(db)
            const snapshot = await get(child(dbRef, `users/${userId}`))

            if (!userState) {
                dispatch(update(snapshot.val()))
                navigate('/')
            }
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setError('root', {
                    message: 'Email or password is wrong'
                })
            } else {
                setError('root', {
                    message: error.message
                })
            }
            console.log(error.code)
        }
    }

    return (
        <div className='auth__container'>
            <section className='auth'>
                <form className='auth__form' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='auth__form-title'>Log in</h1>
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
                        {!isSubmitting && 'Log in'}
                        {isSubmitting && <div className="spinner-wrapper"></div>}
                    </button>
                    {errors.root && <p className="form-error">{errors.root.message}</p>}
                    <Link className='form-link' to="/register">Create a new account!</Link>
                </form>
            </section>
        </div>
    )
}