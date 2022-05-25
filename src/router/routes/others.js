export default [
  {
    path: '/access-control',
    name: 'access-control',
    component: () => import('@/views/extensions/acl/AccessControl.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
    },
  },
  {
    path: '/resetpwd/:code',
    name: 'resetpwd',
    component: () => import('@/views/ship2u/resetpwd.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
      pageTitle: 'Reset Password',
    },
  },
  {
    path: '/account/active_account/:code',
    name: 'active-account',
    component: () => import('@/views/ship2u/active.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
      pageTitle: 'Active Account',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/ship2u/home.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Home',
      breadcrumb: [
        {
          text: 'Dashboards',
        },
        {
          text: 'Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/personal',
    name: 'ship2u-personal',
    component: () => import('@/views/ship2u/personal.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Personal Information',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Personal Information',
          active: true,
        },
      ],
    },
  },
  {
    path: '/modifypwd',
    name: 'ship2u-modify-pwd',
    component: () => import('@/views/ship2u/modifypwd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Reset Password',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Reset Password',
          active: true,
        },
      ],
    },
  },
  {
    path: '/cost',
    name: 'cost',
    component: () => import('@/views/ship2u/cost.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Cost Calculation',
      breadcrumb: [
        {
          text: 'Dashboards',
        },
        {
          text: 'Cost Calculation',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/parcel/preview/:id',
    name: 'ship2u-parcel-preview',
    component: () => import('@/views/ship2u/parcel/parcel-preview/ParcelPreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Detail',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/parcel/add/',
    name: 'ship2u-parcel-add',
    component: () => import('@/views/ship2u/parcel/parcel-add/ParcelAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Add',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/parcel/edit/:id',
    name: 'ship2u-parcel-edit',
    component: () => import('@/views/ship2u/parcel/parcel-edit/ParcelEdit.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Edit',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/draft_parcels',
    name: 'draft_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/DraftList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Draft Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Draft Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/incomplete_parcels',
    name: 'incomplete_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/IncompleteList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Incomplete Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Incomplete Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/waiting_parcels',
    name: 'waiting_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/WaitingList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Waiting for Delivery',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Waiting for Delivery',
          active: true,
        },
      ],
    },
  },
  {
    path: '/processing_parcels',
    name: 'processing_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/ProcessingList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Processing Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Processing Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/out_parcels',
    name: 'out_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/OutList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Outbound Parcels',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Outbound Parcels',
          active: true,
        },
      ],
    },
  },
  {
    path: '/history_parcels',
    name: 'history_parcels',
    component: () => import('@/views/ship2u/parcel/parcel-list/HistoryList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'History',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'History',
          active: true,
        },
      ],
    },
  },
  {
    path: '/draft_order',
    name: 'draft_order',
    component: () => import('@/views/ship2u/order/order-list/DraftOrderList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Orders List',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'Waiting',
          active: true,
        },
      ],
    },
  },
  {
    path: '/processing_order',
    name: 'processing_order',
    component: () => import('@/views/ship2u/order/order-list/ProcessingOrderList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Orders List',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'Processing',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transit_order',
    name: 'transit_order',
    component: () => import('@/views/ship2u/order/order-list/TransitOrderList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Orders List',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'In Transit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/history_order',
    name: 'history_order',
    component: () => import('@/views/ship2u/order/order-list/HistoryOrderList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Orders List',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'History',
          active: true,
        },
      ],
    },
  },
  {
    path: '/all_order',
    name: 'all_order',
    component: () => import('@/views/ship2u/order/order-list/OrderList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Orders List',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'All',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/invoice/preview/:id',
    name: 'ship2u-invoice-preview',
    component: () => import('@/views/ship2u/order/invoice-preview/OrderInvoicePreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Order Invoice Detail',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'Order Invoice Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/order/preview/:id',
    name: 'ship2u-order-preview',
    component: () => import('@/views/ship2u/order/order-preview/OrderPreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Order Detail',
      breadcrumb: [
        {
          text: 'Freight Orders',
        },
        {
          text: 'Order Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/address/preview/:id/:isSender',
    name: 'ship2u-address-preview',
    component: () => import('@/views/ship2u/address/address-preview/AddressPreview.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Address Detail',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Address Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/order/edit/:id',
    name: 'ship2u-order-edit',
    component: () => import('@/views/ship2u/order/order-edit/OrderEdit.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Parcel Edit',
      breadcrumb: [
        {
          text: 'Parcels',
        },
        {
          text: 'Parcel Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ship2u/address/edit/:id/:isSender',
    name: 'ship2u-address-edit',
    component: () => import('@/views/ship2u/address/address-edit/AddressEdit.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Address Edit',
      breadcrumb: [
        {
          text: 'Addresses',
        },
        {
          text: 'Address Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/shipping_address_list',
    name: 'ship2u-shipping-address-list',
    component: () => import('@/views/ship2u/address/shipping-list/ShippingAddressList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Shipping Address List',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Shipping Address List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sender_address_list',
    name: 'ship2u-sender-address-list',
    component: () => import('@/views/ship2u/address/shipping-list/SenderAddressList.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Sender Address List',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Sender Address List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/shipping_address_add',
    name: 'ship2u-shipping-address-add',
    component: () => import('@/views/ship2u/address/address-add/AddressAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Add Shipping Address',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Add Shipping Address',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sender_address_add',
    name: 'ship2u-sender-address-add',
    component: () => import('@/views/ship2u/address/address-add/AddressAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Add Sender Address',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Add Sender Address',
          active: true,
        },
      ],
    },
  },
  {
    path: '/order_add',
    name: 'ship2u-order-add',
    component: () => import('@/views/ship2u/order/order-add/OrderAdd.vue'),
    meta: {
      resource: 'Client',
      action: 'read',
      pageTitle: 'Add Order',
      breadcrumb: [
        {
          text: 'Account',
        },
        {
          text: 'Add Order',
          active: true,
        },
      ],
    },
  },
]
