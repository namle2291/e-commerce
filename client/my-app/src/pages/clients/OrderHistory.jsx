import { Table } from 'antd';
import { getOrderHistories } from 'apis/userApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils/formatPrice';

function OrderHistory() {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrderHistories()
      .then((res) => {
        if (res.success) {
          setOrders(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: '#',
      dataIndex: '#',
      width: '30px',
    },
    {
      title: 'Products',
      dataIndex: 'product',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  const dataSource = orders?.map((el, index) => ({
    key: el._id,
    '#': index + 1,
    product: (
      <div className="grid grid-cols-4 gap-2">
        {el.products?.map((e) => (
          <div key={e._id} className="flex gap-2 items-center border-r">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-sm">
              <img
                src={e.thumb}
                className="object-cover w-full h-full"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col">
              <span className="line-clamp-1">{e.title}</span>
              <span className="text-[13px] text-red-600 font-semibold">
                {formatPrice(e.price)}
              </span>
              <span className="text-[12px] text-slate-500">{e.color}</span>
            </div>
          </div>
        ))}
      </div>
    ),
    total: (
      <span className="text-red-600 font-semibold">
        {formatPrice(el.total * 24300) + ' VND'}
      </span>
    ),
    status: el.status,
  }));

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}

export default OrderHistory;
