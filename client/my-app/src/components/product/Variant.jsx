import React, { useEffect, useState } from 'react';
import InputField from '../Input/InputField';
import { Controller, useForm } from 'react-hook-form';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createProductVariant } from '../../apis/productApi';

function Variant({ pid, onShow }) {
   const [previewImage, setPreviewImage] = useState('');
   const [previewImages, setPreviewImages] = useState();
   const [imageFile, setImageFile] = useState();
   const [imageFiles, setImageFiles] = useState();

   useEffect(() => {
      let url;
      if (imageFile) {
         url = URL.createObjectURL(imageFile);
         setPreviewImage(url);
      }
      return () => {
         URL.revokeObjectURL(url);
      };
   }, [imageFile]);

   useEffect(() => {
      if (imageFiles && imageFiles.length > 4) {
         toast.warn('Chọn tối đa 4 ảnh!');
         return;
      }
      if (imageFiles) {
         let images = [];
         for (let file of imageFiles) {
            let url = URL.createObjectURL(file);
            images.push(url);
         }
         setPreviewImages(images);
      }
      return () => {
         previewImages?.map((el) => URL.revokeObjectURL(el));
      };
   }, [imageFiles]);

   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm();

   const handleAdd = (data) => {
      const formData = new FormData();
      formData.append('pid', pid);
      formData.append('title', data.title);
      formData.append('quantity', data.quantity);
      formData.append('color', data.color);
      formData.append('price', data.price);
      formData.append('thumb', imageFile);
      for (let file of imageFiles) {
         formData.append('images', file);
      }

      createProductVariant(formData)
         .then((res) => {
            if (res.success) {
               toast.success(res.message);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div>
         <form onSubmit={handleSubmit(handleAdd)}>
            <div className="grid grid-cols-2 gap-3">
               <div>
                  <Controller
                     name="title"
                     control={control}
                     rules={{ required: 'Required fill!' }}
                     render={({ field }) => (
                        <InputField
                           errors={errors}
                           field={field}
                           id="title"
                           placeholder="Enter Title"
                           label="Title"
                        />
                     )}
                  />
                  <Controller
                     name="quantity"
                     control={control}
                     rules={{ required: 'Required fill!' }}
                     render={({ field }) => (
                        <InputField
                           errors={errors}
                           field={field}
                           id="quantity"
                           placeholder="Enter Quantity"
                           label="Quantity"
                        />
                     )}
                  />
                  <div>
                     <div className="p-2 border-dashed border-2">
                        <input
                           onChange={(e) => {
                              setImageFile(e.target.files[0]);
                           }}
                           id="product_thumb"
                           type="file"
                           hidden
                        />
                        <label className="text-sm text-gray-600">
                           Product image
                        </label>
                        <div className="max-w-[250px] h-[250px] overflow-hidden my-2">
                           <img
                              src={
                                 previewImage
                                    ? previewImage
                                    : 'https://ludotheque-interlude.fr/wp-content/plugins/post-type-x/core/img/no-default-thumbnail.png'
                              }
                              className="object-contain w-full h-full border"
                              alt="Product thumb"
                           />
                        </div>
                        <div className="mt-3">
                           <label
                              htmlFor="product_thumb"
                              className="border p-2 cursor-pointer inline-block"
                           >
                              <UploadOutlined />
                              <span className="ml-3">Click to upload</span>
                           </label>
                        </div>
                     </div>
                     {/* Product Images */}
                     <div className="mt-3 border-dashed border-2 p-2">
                        <input
                           onChange={(e) => {
                              setImageFiles(e.target.files);
                           }}
                           id="product_images"
                           type="file"
                           multiple="multiple"
                           hidden
                        />
                        <label className="text-sm text-gray-600">
                           Product image gallery
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-2">
                           {previewImages &&
                              previewImages.map((el, index) => (
                                 <div className="border h-[80px]" key={index}>
                                    <img
                                       src={el}
                                       className="object-contain w-full h-full"
                                       alt="Product thumb"
                                    />
                                 </div>
                              ))}
                           {!previewImages &&
                              Array(4)
                                 .fill(null)
                                 .map((el, index) => (
                                    <div
                                       className="border h-[80px]"
                                       key={index}
                                    >
                                       <img
                                          src={
                                             'https://ludotheque-interlude.fr/wp-content/plugins/post-type-x/core/img/no-default-thumbnail.png'
                                          }
                                          className="object-contain w-full h-full"
                                          alt="Product thumb"
                                       />
                                    </div>
                                 ))}
                        </div>
                        <div className="mt-3">
                           <label
                              htmlFor="product_images"
                              className="border p-2 cursor-pointer inline-block"
                           >
                              <UploadOutlined />
                              <span className="ml-3">Click to upload</span>
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  <Controller
                     name="price"
                     control={control}
                     rules={{ required: 'Required fill!' }}
                     render={({ field }) => (
                        <InputField
                           errors={errors}
                           field={field}
                           id="price"
                           placeholder="Enter Price"
                           label="Price"
                        />
                     )}
                  />
                  <Controller
                     name="color"
                     control={control}
                     rules={{ required: 'Required fill!' }}
                     render={({ field }) => (
                        <InputField
                           errors={errors}
                           field={field}
                           id="color"
                           placeholder="Enter Color"
                           label="Color"
                        />
                     )}
                  />
                  <div className="flex gap-3">
                     <button
                        type="submit"
                        className="px-3 py-2 bg-blue-600 text-white"
                     >
                        Add
                     </button>
                     <button
                        className="px-3 py-2 bg-red-600 text-white"
                        onClick={() => onShow({ pid: null, show: false })}
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}

export default Variant;
