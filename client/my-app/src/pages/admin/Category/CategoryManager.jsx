import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import {
   createCategory,
   deleteCategory,
   getCategories,
} from 'apis/categoryApi';
import InputForm from 'components/Input/InputForm';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import image_default from '../../../assets/img/image-default.png';
import { toast } from 'react-toastify';

function CategoryManager() {
   const [categories, setCategories] = useState();
   const [edit, setEdit] = useState(null);
   const [thumb, setThumb] = useState('');
   const [file, setFile] = useState();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isDirty },
   } = useForm();

   useEffect(() => {
      handleGetCategories();
   }, []);

   useEffect(() => {
      let url;
      if (file) {
         url = URL.createObjectURL(file);
         setThumb(url);
      }
      return () => {
         if (url) {
            URL.revokeObjectURL(url);
         }
      };
   }, [file]);

   const handleGetCategories = () => {
      getCategories()
         .then((res) => {
            setCategories(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleAdd = (data) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('method', 'put');
      if (file) {
         formData.append('thumb', file);
      }

      const payload = { formData };
      if (edit) {
         payload.isUpdate = true;
         payload.id = edit._id;
      }

      createCategory(payload)
         .then((res) => {
            if (res.success) {
               toast.success(res.message);
               handleGetCategories();
               handleReset();
            }
         })
         .catch((err) => {
            toast.warn(err.message);
         });
   };

   const handleEdit = (data) => {
      setEdit(data);
      setThumb(data.thumb);
      setFile(null);
      reset({ title: data.title });
   };

   const handleReset = () => {
      setEdit(null);
      setThumb('');
      reset({ title: null });
   };

   const handleDelete = (id) => {
      deleteCategory(id)
         .then((res) => {
            toast.success(res.message);
            handleGetCategories();
         })
         .catch((err) => {
            toast.warn(err.message);
         });
   };

   const columns = [
      {
         title: '#',
         dataIndex: '#',
      },
      {
         title: 'Title',
         dataIndex: 'Title',
      },
      {
         title: 'Created At',
         dataIndex: 'CreatedAt',
      },
      {
         title: 'Actions',
         dataIndex: 'Actions',
      },
   ];

   const dataSource = categories?.map((el, index) => ({
      '#': index + 1,
      Title: (
         <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] overflow-hidden">
               <img
                  src={el.thumb}
                  alt="thumb"
                  className="w-full h-full object-cover"
               />
            </div>
            <span>{el.title}</span>
         </div>
      ),
      CreatedAt: moment(el.createdAt).format('DD/MM/YYYY'),
      Actions: (
         <div className="flex gap-4 text-lg">
            <EditOutlined
               className="cursor-pointer text-blue-600"
               onClick={() => handleEdit(el)}
            />
            <DeleteOutlined
               className="cursor-pointer text-red-600"
               onClick={() => handleDelete(el._id)}
            />
         </div>
      ),
   }));

   return (
      <div>
         <form onSubmit={handleSubmit(handleAdd)}>
            <div className="flex gap-3">
               <div className="w-[300px]">
                  <InputForm
                     placeholder="Enter title"
                     id="title"
                     register={register}
                     label="Title"
                     customs="px-3 py-2 border"
                  />
                  {edit && (
                     <div className="flex gap-2">
                        <button
                           className="mt-3 px-3 py-2 bg-green-600 text-white"
                           type="submit"
                        >
                           Update
                        </button>
                        <button
                           className="mt-3 px-3 py-2 bg-red-600 text-white"
                           onClick={() => {
                              setEdit(null);
                              setThumb('');
                              reset({ title: null });
                           }}
                        >
                           Cancel
                        </button>
                     </div>
                  )}
                  {!edit && (
                     <button
                        className="mt-3 px-3 py-2 bg-green-600 text-white"
                        type="submit"
                     >
                        Add
                     </button>
                  )}
               </div>
               <div className="w-[250px]">
                  <label>Thumb</label>
                  <label htmlFor="thumb">
                     <div className="w-[80px] h-[80px] overflow-hidden rounded-md cursor-pointer">
                        <img
                           src={thumb ? thumb : image_default}
                           alt="thumb"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </label>
                  <input
                     type="file"
                     id="thumb"
                     hidden
                     onChange={(e) => setFile(e.target.files[0])}
                  />
               </div>
            </div>
         </form>
         <div className="mt-3">
            <Table
               dataSource={dataSource}
               pagination={false}
               rowKey="#"
               columns={columns}
            />
         </div>
      </div>
   );
}

export default CategoryManager;
