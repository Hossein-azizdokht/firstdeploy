import React from 'react'
import { BiWindowClose } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className='simplePage'>
            <div><BiWindowClose size={100} color="#ccc" /></div>
            <h1 style={{ color: "#aaa" }} className="mb-4">404</h1>
            <h6 style={{ color: "#aaa" }} className="mb-4">صفحه یافت نشد</h6>
            <Link to="/admin" className='btn btn-primary'>بازگشت به صفحه اصلی</Link>
        </div>
    )
}

export default ErrorPage