import * as z from "zod/v4"
import ReactDom from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { db } from '../../firebaseConfig'
import { updateUser } from '../state/user/userSlice'

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: 'This field is required!'
    }),
    lastName: z.string().min(1, {
        message: 'This field is required!'
    }),
})

export default function ProfileModal({ open, setOpen }) {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user.value)

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isSubmitting,
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: {
            firstName: userState.firstName,
            lastName: userState.lastName
        },
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(data) {
        await update(ref(db), {
            [`users/${userState.uid}/firstName`]: data.firstName,
            [`users/${userState.uid}/lastName`]: data.lastName,
        })
    }

    useEffect(() => {

        const usersRef = ref(db, `users/${userState.uid}/`)

        const unsubscribe = onValue(usersRef, snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val()

                dispatch(updateUser(userData))

                reset({
                    firstName: userData.firstName,
                    lastName: userData.lastName
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [open])

    return ReactDom.createPortal(
        <div className={`modal__wrapper${open ? ' show' : ''}`}>
            <div className="modal__inner">
                <div className="modal__header">
                    <h3 className='modal__body-title'>Profile</h3>
                    <button className='primary-btn' onClick={() => setOpen(false)}>Close</button>
                </div>
                <div className="modal__body">
                    <form className='profile__form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="profile__section">
                            <p className="profile__form-text">Your profile name</p>
                            <div className="form-wrapper">
                                <div className="form-row">
                                    <input
                                        className={`form-input`}
                                        type='text'
                                        placeholder={userState.firstName}
                                        {...register('firstName')}
                                    />
                                    {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                                </div>
                                <div className="form-row">
                                    <input
                                        className={`form-input`}
                                        type='text'
                                        placeholder={userState.lastName}
                                        {...register('lastName')}
                                    />
                                    {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                                </div>
                            </div>
                        </div>
                        <button className='btn primary-btn' type='submit' disabled={isSubmitting || !isDirty}>
                            {!isSubmitting && 'Save'}
                            {isSubmitting && <div className="spinner-wrapper"></div>}
                        </button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}