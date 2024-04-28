import React from 'react';
import { toast } from 'react-toastify';

export default (error, type = 'error') => {
  if (type === 'error') {
    if (error && error.response && error.response.data.meta && error.response.data.meta.errors.length !== 0) {
      error.response.data.meta.errors.forEach((item) => {
        toast.error(item.message.toString(), {
          position: toast.POSITION.BOTTOM_LEFT
        });
      });
      return true;
    } else if (error && error.data && error.data.meta) {
      error.data.meta.errors.forEach((item) => {
        toast.error(item.message.toString(), {
          position: toast.POSITION.BOTTOM_LEFT
        });
      });
      return true;
    } else {
      toast.error('متاسفانه خطایی رخ داده است.', {
        position: toast.POSITION.BOTTOM_LEFT
      });
      return true;
    }
  }
  if (type === 'success') {
    if (error.success && error.success.length !== 0) {
      error.success.forEach((item) => {
        toast.success(item.message || 'عملیات با موفقیت انجام شد.', {
          position: toast.POSITION.BOTTOM_LEFT
        });
      });
    } else {
      toast.success('عملیات با موفقیت انجام شد.', {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  }
};
