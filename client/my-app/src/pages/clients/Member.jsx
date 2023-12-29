import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import user_avatar_default from '../../assets/img/user_avatar_default.png';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from 'apis/userApi';
import { getCurrent } from 'app/reducers/userReducer';
import { toast } from 'react-toastify';

export default function Member() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isDirty },
   } = useForm();

   const { userInfo } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const [avatar, setAvatar] = useState();
   const [loading, setLoading] = useState(false);
   const [file, setFile] = useState();

   useEffect(() => {
      reset({
         first_name: userInfo?.first_name,
         last_name: userInfo?.last_name,
         email: userInfo?.email,
         mobile: userInfo?.mobile,
      });
      setAvatar(userInfo?.avatar);
   }, [userInfo]);

   useEffect(() => {
      let url;
      if (file) {
         url = URL.createObjectURL(file);
         setAvatar(url);
      }
      return () => {
         if (url) {
            URL.revokeObjectURL(url);
         }
      };
   }, [file]);

   const handleUpdate = (data) => {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('mobile', data.mobile);
      if (file) {
         formData.append('avatar', file);
      }

      setLoading(true);

      updateCurrentUser(formData)
         .then((res) => {
            if (res.success) {
               toast.success(res?.message);
               dispatch(getCurrent());
               setFile(null);
               setLoading(false);
            }
         })
         .catch((err) => {
            toast.warn(err?.message);
            setLoading(false);
         });
   };

   return (
      <div>
         <div className="w-[600px] mx-auto">
            <form onSubmit={handleSubmit(handleUpdate)}>
               <div className="flex flex-col gap-2 mb-3">
                  <label className="font-semibold">FirstName:</label>
                  <input
                     type="text"
                     {...register('first_name')}
                     className="outline-none p-2 border"
                  />
               </div>
               <div className="flex flex-col gap-2 mb-3">
                  <label className="font-semibold">LastName:</label>
                  <input
                     type="text"
                     {...register('last_name')}
                     className="outline-none p-2 border"
                  />
               </div>
               <div className="flex flex-col gap-2 mb-3">
                  <label className="font-semibold">Email Address:</label>
                  <input
                     type="text"
                     {...register('email')}
                     className="outline-none p-2 border"
                  />
               </div>
               <div className="flex flex-col gap-2 mb-3">
                  <label className="font-semibold">Phone:</label>
                  <input
                     type="text"
                     {...register('mobile')}
                     className="outline-none p-2 border"
                  />
               </div>
               <div className="flex gap-2 mb-3">
                  <label className="font-semibold">Account status:</label>
                  <span>{userInfo?.status ? 'Blocked' : 'Actived'}</span>
               </div>
               <div className="flex gap-2 mb-3">
                  <label className="font-semibold">Role:</label>
                  <span>{userInfo?.role === 229 ? 'Admin' : 'User'}</span>
               </div>
               <div className="flex gap-2 mb-3">
                  <label className="font-semibold">Created At:</label>
                  <span>{moment(userInfo?.createdAt).fromNow()}</span>
               </div>
               <div className="flex flex-col gap-2 mb-3">
                  <label className="font-semibold">Avatar:</label>
                  <div>
                     <label htmlFor="avatar" className="cursor-pointer">
                        <div className="w-[80px] h-[80px] overflow-hidden rounded-full border">
                           <img
                              src={avatar ? avatar : user_avatar_default}
                              className="w-full h-full object-cover"
                              alt="avatar"
                           />
                        </div>
                     </label>
                  </div>
                  <input
                     {...register('avatar', {
                        onChange: (e) => setFile(e.target.files[0]),
                     })}
                     id="avatar"
                     type="file"
                     hidden
                     className="outline-none p-2 border"
                  />
               </div>
               <div className="flex justify-end">
                  {isDirty && (
                     <button
                        type="submit"
                        className={`border px-3 py-2 bg-${
                           loading ? 'green' : 'red'
                        }-600 text-white transition-all`}
                     >
                        {loading ? 'Loading...' : 'Update infomation'}
                     </button>
                  )}
               </div>
            </form>
         </div>
      </div>
   );
}
