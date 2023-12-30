import React, { memo, useEffect, useState } from 'react';
import InputField from '../../../components/Input/InputField';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getCategories } from '../../../apis/categoryApi';
import { Select, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createProduct, updateImagesProduct } from '../../../apis/productApi';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
   const [previewImage, setPreviewImage] = useState('');
   const [previewImages, setPreviewImages] = useState();
   const [imageFile, setImageFile] = useState();
   const [imageFiles, setImageFiles] = useState();
   const [categories, setCategories] = useState();
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm();

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

   useEffect(() => {
      fetchCategory();
   }, []);

   const fetchCategory = async () => {
      const res = await getCategories();
      if (res.success) {
         setCategories(res.data);
      }
   };

   const onSubmit = async (data) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('thumb', imageFile);
      formData.append('title', data.title);
      formData.append('price', +data.price);
      formData.append('quantity', +data.quantity);
      formData.append('brand', data.brand);
      formData.append('category', data.category);
      try {
         const res = await createProduct(formData);
         if (res.success) {
            toast.success(res.message, { position: 'bottom-right' });
            if (imageFiles.length > 0) {
               updateImages(res.product._id);
            } else {
               setLoading(false);
               navigate('/admin/products');
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   const updateImages = async (id) => {
      const formData = new FormData();
      for (var i = 0; i < imageFiles.length; i++) {
         formData.append('images', imageFiles[i]);
      }
      const res = await updateImagesProduct(id, formData);
      if (res.success) {
         toast.success(res.message, { position: 'bottom-right' });
         setLoading(false);
         navigate('/admin/products');
      }
   };

   return (
      <div>
         <span>Create Product</span>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 mt-3 gap-3">
               <div className="col-span-4">
                  <h4 className="mb-4 font-semibold">Images</h4>
                  {/* Product Thumb */}
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
                                 <div className="border h-[80px]" key={index}>
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
               <div className="col-span-8">
                  <h4 className="mb-4 font-semibold">Genaral Infomation</h4>
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
                              label="Product Title"
                           />
                        )}
                     />
                     <div className="grid grid-cols-2 gap-3">
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
                                 type="number"
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
                                 type="number"
                              />
                           )}
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <Controller
                           name="brand"
                           control={control}
                           rules={{ required: 'Required fill!' }}
                           render={({ field }) => (
                              <InputField
                                 errors={errors}
                                 field={field}
                                 id="brand"
                                 placeholder="Enter Brand"
                                 label="Brand"
                              />
                           )}
                        />
                        <div>
                           <label className="text-sm text-gray-600">
                              Category
                           </label>
                           <div className="mt-2">
                              <Controller
                                 control={control}
                                 name="category"
                                 defaultValue={
                                    categories && categories[0].title
                                 }
                                 render={({ field }) => (
                                    <Select
                                       size="large"
                                       className="w-full"
                                       {...field}
                                       defaultValue="Choose one category"
                                    >
                                       {categories &&
                                          categories?.map((el) => (
                                             <Select.Option
                                                value={el._id}
                                                key={el._id}
                                             >
                                                {el.title}
                                             </Select.Option>
                                          ))}
                                    </Select>
                                 )}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-2">
                     {loading && <Spin />}
                     {!loading && (
                        <button
                           type="submit"
                           className="px-3 py-2 bg-green-600 text-white"
                        >
                           <>
                              Create <PlusOutlined />
                           </>
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}

export default memo(AddProduct);
