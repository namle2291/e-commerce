import React, { useEffect, useState } from 'react';
import {
   destroyProduct,
   getProductDeleted,
   restoreProduct,
} from '../../../apis/productApi';
import { Table } from 'antd';
import { formatPrice } from '../../../utils/formatPrice';
import Swal from 'sweetalert2';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

function ProductDeleted() {
   const [data, setData] = useState([]);

   const fetchDataProducts = () => {
      getProductDeleted()
         .then((res) => {
            setData(res.product);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      fetchDataProducts();
   }, []);

   const handleRestore = (id) => {
      restoreProduct(id)
         .then((res) => {
            if (res.success) {
               toast.success(res.message);
               fetchDataProducts();
            }
         })
         .catch((err) => {
            toast.warn(err.message);
         });
   };
   const handleDestroy = (id) => {
      Swal.fire({
         title: 'Are you sure?',
         text: 'This action will permanently delete the product!',
         type: 'warning',
         showCancelButton: true,
      }).then((result) => {
         if (result.isConfirmed) {
            destroyProduct(id)
               .then((res) => {
                  if (res.success) {
                     toast.success(res.message);
                     fetchDataProducts();
                  }
               })
               .catch((err) => {
                  toast.warn(err.message);
               });
         }
      });
   };

   const columns = [
      {
         title: '#',
         dataIndex: '#',
      },
      {
         title: 'Thumb',
         dataIndex: 'Thumb',
      },
      {
         title: 'Title',
         dataIndex: 'Title',
      },
      {
         title: 'Price',
         dataIndex: 'Price',
      },
      {
         title: 'Actions',
         dataIndex: 'Actions',
      },
   ];

   const dataSource = data
      ?.filter((el) => el.deleted)
      .map((el, index) => ({
         '#': index + 1,
         Thumb: <img src={el.thumb} className="w-[80px]" alt="" />,
         Title: el.title,
         Price: formatPrice(el.price),
         Actions: (
            <div className="flex gap-4 text-lg">
               <UndoOutlined
                  title="Restore"
                  className="cursor-pointer text-blue-600"
                  onClick={() => handleRestore(el._id)}
               />
               <DeleteOutlined
                  title="Destroy"
                  className="cursor-pointer text-red-600"
                  onClick={() => handleDestroy(el._id)}
               />
            </div>
         ),
      }));

   return (
      <div>
         <div>Product Deleted</div>
         <Table
            dataSource={dataSource}
            pagination={false}
            rowKey="#"
            columns={columns}
         />
      </div>
   );
}

export default ProductDeleted;
