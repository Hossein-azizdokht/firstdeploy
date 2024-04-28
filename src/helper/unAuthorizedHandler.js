import React from 'react';
import { toast } from 'react-toastify';

export default (errorCode) => {
    
    if (errorCode.status === 401 || errorCode.status === 403) {
        toast.error("مدت‌زمان اعتبار شما به پایان رسیده است، لطفا مجددا وارد شوید", {
            position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
            window.location.href = "/";
        }, 3500);
        return true;
    }
};
