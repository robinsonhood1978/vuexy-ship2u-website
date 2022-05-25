export default function navItems({
  pDraft = 1, pWaiting = 2, pProcess = 3, pOut = 4,
}) {
  console.log('Robin')
  const arr = [
    {
      title: 'Dashboards',
      icon: 'HomeIcon',
      action: 'read',
      resource: 'Client',
      children: [
        {
          title: 'Home',
          route: 'home',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Cost Calculation',
          route: 'cost',
          action: 'read',
          resource: 'Client',
        },
      ],
    },
    {
      title: 'Account',
      icon: 'UserIcon',
      tagVariant: 'light-warning',
      action: 'read',
      resource: 'Client',
      children: [
        {
          title: 'Personal',
          route: 'ship2u-personal',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Password',
          route: 'ship2u-modify-pwd',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Shipping Address',
          route: 'ship2u-shipping-address-list',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Sender Address',
          route: 'ship2u-sender-address-list',
          action: 'read',
          resource: 'Client',
        },
      ],
    },
    {
      title: 'Parcels',
      icon: 'ArchiveIcon',
      // tag: pWaiting,
      // tagVariant: 'light-warning',
      action: 'read',
      resource: 'Client',
      children: [
        {
          title: 'Draft',
          route: 'draft_parcels',
          tag: pDraft,
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'In Warehouse',
          route: 'waiting_parcels',
          tag: pWaiting,
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Processing',
          route: 'processing_parcels',
          tag: pProcess,
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Outbound',
          route: 'out_parcels',
          tag: pOut,
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'History',
          route: 'history_parcels',
          action: 'read',
          resource: 'Client',
        },
      ],
    },
    {
      title: 'Freight Orders',
      icon: 'CheckSquareIcon',
      tag: '3',
      tagVariant: 'light-warning',
      action: 'read',
      resource: 'Client',
      children: [
        {
          title: 'Create',
          route: 'ship2u-order-add',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Waiting',
          route: 'draft_order',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'Processing',
          route: 'processing_order',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'In Transit',
          route: 'transit_order',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'History',
          route: 'history_order',
          action: 'read',
          resource: 'Client',
        },
        {
          title: 'All',
          route: 'all_order',
          action: 'read',
          resource: 'Client',
        },
      ],
    },
  ]
  return arr
}
