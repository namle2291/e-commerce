import React, { useEffect, useState } from 'react';

import { deleteProduct, getProducts } from '../../../apis/productApi';
import { Table } from 'antd';
import { formatPrice } from '../../../utils/formatPrice';
import {
   AppstoreAddOutlined,
   DeleteOutlined,
   EditOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import { renderStar } from '../../../utils/renderStar';
import moment from 'moment';
import $ from 'jquery';
import Paginate from '../../../components/Pagination/Paginate';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Variant from '../../../components/Product/Variant';

function ProductManager() {
   const [data, setData] = useState({});
   const [checked, setChecked] = useState([]);
   const [page, setPage] = useState(1);
   const [showVariant, setShowVariant] = useState({ pid: null, show: false });

   useEffect(() => {
      fetchProducts();
   }, [page]);

   const fetchProducts = async () => {
      let params = { page: page, limit: 10, sort: '-createdAt' };
      const response = await getProducts(params);
      if (response.success) {
         setData(response);
      }
   };

   const handleCheck = (id) => {
      const IdExists = checked.find((el) => el === id);

      if (IdExists) {
         setChecked((prev) => prev.filter((el) => el !== id));
      } else {
         setChecked((prev) => [...prev, id]);
      }

      const checkedLength = $('.check-input:checkbox').filter(
         ':checked'
      ).length;
      const totalCheck = $('.check-input:checkbox').length;
      if (checkedLength < totalCheck) {
         $('.check-all:checkbox').prop('checked', false);
      } else if (checkedLength === totalCheck) {
         $('.check-all:checkbox').prop('checked', true);
      }
   };

   const handleCheckAll = (e) => {
      let checkAll = e.target.checked;
      if (checkAll) {
         $('.check-input').prop('checked', true);
      } else {
         $('.check-input').prop('checked', false);
      }
   };

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Are you sure?',
         type: 'warning',
         showCancelButton: true,
      }).then((result) => {
         if (result.isConfirmed) {
            deleteProduct(id)
               .then((res) => {
                  fetchProducts();
                  toast.success(res.message);
               })
               .catch((err) => {
                  toast.warn(err.message);
               });
         }
      });
   };

   const columns = [
      {
         title: (
            <input
               className="check-all"
               type="checkbox"
               onClick={handleCheckAll}
            />
         ),
         dataIndex: 'Checkbox',
      },
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
         title: 'Brand',
         dataIndex: 'Brand',
      },
      {
         title: 'Category',
         dataIndex: 'Category',
      },
      {
         title: 'Price',
         dataIndex: 'Price',
      },
      {
         title: 'Quantity',
         dataIndex: 'Quantity',
      },
      {
         title: 'Sold',
         dataIndex: 'Sold',
      },
      {
         title: 'Update At',
         dataIndex: 'UpdateAt',
      },
      {
         title: 'Actions',
         dataIndex: 'Actions',
      },
   ];

   const dataSource = data?.data?.map((el, index) => ({
      Checkbox: (
         <input
            className="check-input"
            type="checkbox"
            onClick={() => handleCheck(el._id)}
         />
      ),
      '#': index + 1,
      Thumb: <img src={el.thumb} className="w-[80px]" alt="" />,
      Title: (
         <div className="flex flex-col gap-1">
            <span>{el.title}</span>
            <span>{renderStar(el.totalRaitings)}</span>
         </div>
      ),
      Brand: el.brand,
      Category: el.category.title,
      Price: formatPrice(el.price),
      Quantity: el.quantity,
      Sold: el.sold,
      UpdateAt: moment(el.updatedAt).format('DD/MM/YYYY'),
      Actions: (
         <div className="flex gap-4 text-lg">
            <Link to={`/admin/products/${el._id}`}>
               <EditOutlined className="cursor-pointer text-blue-600" />
            </Link>
            <DeleteOutlined
               className="cursor-pointer text-red-600"
               onClick={() => handleDelete(el._id)}
            />
            <AppstoreAddOutlined
               className="cursor-pointer text-green-600"
               onClick={() =>
                  setShowVariant(() => ({ pid: el._id, show: true }))
               }
            />
         </div>
      ),
   }));

   return (
      <>
         {showVariant.show && (
            <Variant pid={showVariant.pid} onShow={setShowVariant} />
         )}
         {!showVariant.show && (
            <div>
               <div className="mb-4">
                  <Link to={'/admin/products/trash'}>
                     Recycle Bin ({data?.deleted})
                  </Link>
               </div>
               <Table
                  dataSource={dataSource}
                  pagination={false}
                  rowKey="#"
                  columns={columns}
               />
               <div className="flex justify-end mt-3">
                  <Paginate
                     currentPage={page}
                     pageCount={Math.ceil(data?.total / 10)}
                     PageChange={(index) => {
                        setPage(index);
                     }}
                  />
               </div>
            </div>
         )}
      </>
   );
}

export default ProductManager;
