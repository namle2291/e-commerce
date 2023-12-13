import React, { useEffect, useRef } from 'react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearMessage, getCurrent } from '../../app/reducers/userReducer'
import Swal from 'sweetalert2'

export default function AdminHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const timer = useRef()

    const { token, userInfo, message } = useSelector((state) => state.user)

    useEffect(() => {
        if (message) {
            Swal.fire({
                text: message,
                icon: 'info',
                confirmButtonText: 'Login',
            }).then(() => {
                navigate('/login')
                dispatch(clearMessage())
            })
        }
    }, [message])

    useEffect(() => {
        timer.current = setTimeout(() => {
            if (token) {
                dispatch(getCurrent())
            }
        }, 300)
        return () => {
            clearTimeout(timer.current)
        }
    }, [dispatch, token])

    return (
        <div className="p-4 flex items-center justify-between bg-slate-100">
            <div>
                <Link to={'/'} className="">
                    <span className="text-[20px]">
                        <AiOutlineHome />
                    </span>
                </Link>
            </div>
            <div>
                {userInfo && (
                    <div className="flex items-center gap-1">
                        <span className="text-[20px]">
                            <AiOutlineUser />
                        </span>
                        <span>
                            {userInfo?.first_name + ' ' + userInfo?.last_name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
