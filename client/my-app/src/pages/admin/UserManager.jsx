import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteUser, getUsers, updateUser } from '../../apis/userApi';
import moment from 'moment';
import { useDebounce } from '@uidotdev/usehooks';
import Paginate from '../../components/Pagination/Paginate';
import { useForm } from 'react-hook-form';
import InputForm from '../../components/Input/InputForm';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';
import {
   FaEdit,
   FaRegSave,
   FaRegTimesCircle,
   FaRegTrashAlt,
} from 'react-icons/fa';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { roleOptions, statusOptions } from '../../utils/contants';

function UserManager() {
   const [edit, setEdit] = useState(null);
   const [data, setData] = useState({});
   const [key, setKey] = useState('');
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(2);
   const [update, setUpdate] = useState(false);
   const { userInfo } = useSelector((state) => state.user);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
   });

   const render = useCallback(() => {
      setUpdate(!update);
   }, [update]);

   const keyDebounce = useDebounce(key, 500);

   useEffect(() => {
      let param = { page, limit };
      if (!keyDebounce.startsWith(' ') && keyDebounce.length !== 0) {
         param.q = keyDebounce;
      }
      fetchUsers(param);
   }, [keyDebounce, page, limit, update]);

   const fetchUsers = async (params) => {
      const response = await getUsers(params);
      if (response.success) {
         setData(response);
      }
   };

   const handlePageChange = useCallback((index) => {
      setPage(index);
   }, []);

   const handleCancelUpdate = () => {
      setEdit(null);
   };

   const onSubmit = async (data) => {
      const response = await updateUser(edit._id, data);
      if (response.success) {
         setEdit(null);
         setUpdate(false);
         toast.success(response.message, {
            position: 'bottom-right',
         });
      }
   };

   const handleDelete = async (id) => {
      Swal.fire({ title: 'Are you sure?', showCancelButton: true }).then(
         async (result) => {
            if (result.isConfirmed) {
               const response = await deleteUser(id);
               if (response.success) {
                  fetchUsers();
                  toast.success(response.message, {
                     position: 'bottom-right',
                  });
               }
            }
         }
      );
   };

   return (
      <div>
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center text-gray-500">
               <span>Show</span>
               <select
                  className="border px-2"
                  onChange={(e) => setLimit(e.target.value)}
               >
                  <option>2</option>
                  <option>5</option>
                  <option>10</option>
               </select>
               <span>entries</span>
            </div>
            <div>
               <input
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="border outline-none py-2 px-4 w-[350px]"
               />
            </div>
         </div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative shadow-md mt-3">
               <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="bg-slate-800 text-white">
                     <tr>
                        <th scope="col" className="py-4 px-6">
                           #
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Email Address
                        </th>
                        <th scope="col" className="py-4 px-6">
                           First Name
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Last Name
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Role
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Phone
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Status
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Created At
                        </th>
                        <th scope="col" className="py-4 px-6">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {data?.users &&
                        data?.users?.map((el, index) => (
                           <tr
                              key={index}
                              className={clsx(
                                 // 'border-b',
                                 edit?._id === el._id &&
                                    'border-2 border-blue-600',
                                 'transition-all align-middle'
                              )}
                           >
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4">
                                 {edit?._id === el._id ? (
                                    <InputForm
                                       id="email"
                                       register={register}
                                       defaultValue={edit.email}
                                       validate={{
                                          required: 'The field is required',
                                          pattern: {
                                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                             message: 'invalid email address',
                                          },
                                       }}
                                       customs="px-3 py-2 border inline-block w-full"
                                       errors={errors}
                                    />
                                 ) : (
                                    <span>{el.email}</span>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 {edit?._id === el._id ? (
                                    <InputForm
                                       id="first_name"
                                       register={register}
                                       defaultValue={edit.first_name}
                                       errors={errors}
                                       validate={{
                                          required: 'The field is required',
                                       }}
                                       customs="px-3 py-2 border inline-block w-full"
                                    />
                                 ) : (
                                    <span>{el.first_name}</span>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 {edit?._id === el._id ? (
                                    <InputForm
                                       id="last_name"
                                       register={register}
                                       defaultValue={edit.last_name}
                                       validate={{
                                          required: 'The field is required',
                                       }}
                                       errors={errors}
                                       customs="px-3 py-2 border inline-block w-full"
                                    />
                                 ) : (
                                    <span>{el.last_name}</span>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 {edit && edit._id === el._id ? (
                                    <select
                                       {...register('role')}
                                       className="p-2 outline-none"
                                       defaultValue={edit.role}
                                    >
                                       {roleOptions.map((elm, index) => (
                                          <option key={index} value={elm.value}>
                                             {elm.label}
                                          </option>
                                       ))}
                                    </select>
                                 ) : (
                                    <span>
                                       {
                                          roleOptions.find(
                                             (role) => role.value === el.role
                                          ).label
                                       }
                                    </span>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 {edit?._id === el._id ? (
                                    <InputForm
                                       id="mobile"
                                       register={register}
                                       defaultValue={edit.mobile}
                                       validate={{
                                          required: 'The field is required',
                                       }}
                                       errors={errors}
                                       customs="px-3 py-2 border inline-block w-full"
                                    />
                                 ) : (
                                    <span>{el.mobile}</span>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 {edit && edit._id === el._id ? (
                                    <select
                                       {...register('isBlocked')}
                                       className="p-2 outline-none"
                                       defaultValue={edit.isBlocked}
                                    >
                                       {statusOptions.map((elm, index) => (
                                          <option key={index} value={elm.value}>
                                             {elm.label}
                                          </option>
                                       ))}
                                    </select>
                                 ) : (
                                    <span>
                                       {el.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                 )}
                              </td>
                              <td className="px-6 py-4">
                                 {moment(el.createdAt).format('DD-MM-YYYY')}
                              </td>
                              <td className="px-6 py-4 flex gap-3 text-[20px]">
                                 {edit && edit._id === el._id ? (
                                    <>
                                       <Button
                                          type="submit"
                                          className="text-green-600"
                                          content={<FaRegSave />}
                                       />
                                       <Button
                                          className="text-red-600"
                                          handleClick={handleCancelUpdate}
                                          content={<FaRegTimesCircle />}
                                       />
                                    </>
                                 ) : (
                                    <>
                                       <span
                                          className="cursor-pointer"
                                          onClick={() => {
                                             setUpdate(true);
                                             setEdit(el);
                                             reset({});
                                          }}
                                       >
                                          <FaEdit />
                                       </span>
                                       {userInfo && userInfo._id !== el._id && (
                                          <span
                                             className="cursor-pointer"
                                             onClick={() =>
                                                handleDelete(el._id)
                                             }
                                          >
                                             <FaRegTrashAlt />
                                          </span>
                                       )}
                                    </>
                                 )}
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         </form>
         {!data && data?.users.length === 0 && (
            <p className="text-center py-4">No data found...</p>
         )}
         <div className="mt-[20px] flex justify-start">
            {Math.ceil(data?.total / limit) > 1 && (
               <>
                  <Paginate
                     currentPage={page}
                     pageCount={Math.ceil(data?.total / limit)}
                     limit={limit}
                     PageChange={handlePageChange}
                  />
               </>
            )}
         </div>
      </div>
   );
}

export default memo(UserManager);
