import React, { useEffect, useState } from 'react';

import { getProducts } from '../../../apis/productApi';
import { Popconfirm, Table } from 'antd';
import { formatPrice } from '../../../utils/formatPrice';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import $ from 'jquery';
import Paginate from '../../../components/Pagination/Paginate';
import { Link } from 'react-router-dom';

function ProductManager() {
   const [data, setData] = useState({});
   const [checked, setChecked] = useState([]);
   const [page, setPage] = useState(1);

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
         title: 'Price',
         dataIndex: 'Price',
      },
      {
         title: 'Create At',
         dataIndex: 'CreateAt',
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
      Title: el.title,
      Price: formatPrice(el.price),
      CreateAt: moment(el.createdAt).format('DD/MM/YYYY'),
      Actions: (
         <div className="flex gap-3 text-lg">
            <Link to={`/admin/products/${el._id}`}>
               <EditOutlined className="cursor-pointer" />
            </Link>
            <Popconfirm
               placement="left"
               title="Delete the product"
               description="Are you sure to delete this product?"
               onConfirm={() => {
                  console.log('onConfirm');
               }}
               onCancel={() => {
                  console.log('onCancel');
               }}
               okText="Yes"
               cancelText="No"
            >
               <DeleteOutlined className="cursor-pointer" />
            </Popconfirm>
         </div>
      ),
   }));

   return (
      <div>
         <Table
            dataSource={dataSource}
            pagination={false}
            rowKey="#"
            columns={columns}
         />
         <div className="flex justify-end">
            <Paginate
               currentPage={page}
               pageCount={Math.ceil(data?.total / 10)}
               PageChange={(index) => {
                  setPage(index);
               }}
            />
         </div>
      </div>
   );
}

export default ProductManager;
