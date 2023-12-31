import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import {
   AiOutlineDashboard,
   AiOutlineShop,
   AiOutlineShoppingCart,
   AiOutlineUnorderedList,
   AiOutlineUser,
} from 'react-icons/ai'

export const colors = [
   'Black',
   'Camellia Red',
   'Carbon Gray',
   'Ceramic',
   'Deep pink',
   'Forest blue',
   'Glacier Silver',
   'Gold',
   'Gray',
   'Mineral black',
   'Platinum',
   'Quite Black',
   'Really Blue',
   'Topaz Gold',
   'Very Silver',
   'White',
]
export const productInfoTabs = [
   {
      id: 1,
      title: 'DESCRIPTION',
   },
   {
      id: 2,
      title: 'WARRANTY',
      content: `LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
   },
   {
      id: 3,
      title: 'DELIVERY',
      content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
   },
   {
      id: 4,
      title: 'PAYMENT',
      content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
   },
   {
      id: 5,
      title: 'CUSTOMER REVIEW',
   },
]

export const bgColors = ['red', 'green', 'blue', 'black', 'pink', 'yellow']

export const votes = [
   {
      id: 1,
      title: 'Very bad',
   },
   {
      id: 2,
      title: 'Bad',
   },
   {
      id: 3,
      title: 'Normal',
   },
   {
      id: 4,
      title: 'Good',
   },
   {
      id: 5,
      title: 'Very good',
   },
]

export const adminSidebars = [
   {
      id: 1,
      title: 'Dasboard',
      path: '/admin/dashboard',
      icon: <AiOutlineDashboard />,
      type: 'normal',
   },
   {
      id: 2,
      title: 'User Manage',
      path: '/admin/users',
      icon: <AiOutlineUser />,
      type: 'normal',
   },
   {
      id: 3,
      title: 'Category Manage',
      path: '/admin/categories',
      icon: <AiOutlineUnorderedList />,
      type: 'normal',
   },
   {
      id: 4,
      title: 'Product Manage',
      icon: <AiOutlineShop />,
      type: 'parent',
      childs: [
         {
            id: 1,
            title: 'Create New Product',
            path: '/admin/products/add',
         },
         {
            id: 2,
            title: 'List Product',
            path: '/admin/products',
         },
      ],
   },
   {
      id: 5,
      title: 'Order Manage',
      icon: <AiOutlineShoppingCart />,
      type: 'parent',
      childs: [
         {
            id: 1,
            title: 'Add Order',
            path: '/admin/orders/add',
            parent: 4,
         },
         {
            id: 2,
            title: 'List Order',
            path: '/admin/orders/list',
            parent: 4,
         },
      ],
   },
]

export const memberSidebars = [
   {
      id: 1,
      title: 'Personal',
      path: '/member/personal',
      icon: <AiOutlineUser />,
      type: 'normal',
   },
   {
      id: 2,
      title: 'My Cart',
      path: '/member/my-cart',
      icon: <ShoppingOutlined />,
      type: 'normal',
   },
   {
      id: 3,
      title: 'My Wishlist',
      path: '/member/my-wishlist',
      icon: <HeartOutlined />,
      type: 'normal',
   },
   {
      id: 4,
      title: 'Order Histories',
      path: '/member/order-histories',
      icon: <ShoppingCartOutlined />,
      type: 'normal',
   },
]

export const roleOptions = [
   {
      value: 229,
      label: 'Admin',
   },
   {
      value: 612,
      label: 'User',
   },
]

export const statusOptions = [
   {
      value: true,
      label: 'Block',
   },
   {
      value: false,
      label: 'Active',
   },
]
