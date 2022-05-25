import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function orderList() {
  // Use toast
  const toast = useToast()

  const refOrderListTable = ref(null)

  const perPage = ref(10)
  const totalOrders = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [2, 5, 10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)

  const queryParams = computed(() => {
    const type = router.currentRoute.name.split('_')[0]
    let orderStatus
    let obj

    switch (type) {
      case 'draft':
        orderStatus = 'D'
        obj = {
          orderStatus,
        }
        break
      case 'processing':
        orderStatus = 'P'
        obj = {
          orderStatus,
        }
        break
      case 'transit':
        orderStatus = 'T'
        obj = {
          orderStatus,
        }
        break
      case 'history':
        orderStatus = 'H'
        obj = {
          orderStatus,
        }
        break
      default:
        obj = {}
    }
    return obj
  })

  const dataMeta = computed(() => {
    const localItemsCount = refOrderListTable.value ? refOrderListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalOrders.value,
    }
  })

  const refetchData = () => {
    refOrderListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, statusFilter, queryParams], () => {
    refetchData()
  })
  // ?state=P&filed=1&unsent=1&count=10
  const fetchOrders = (ctx, callback) => {
    console.log(queryParams.value)
    store
      .dispatch('ship2u/fetchOrders', {
        ...queryParams.value,
        forceRefresh: false,
        count: 0,
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { orders, total } = response
        // console.log(orders)
        callback(orders)
        totalOrders.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching orders' list",
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveOrderStatusVariantAndIcon = status => {
    if (status === 'Partial Payment') return { variant: 'warning', icon: 'PieChartIcon' }
    if (status === 'Paid') return { variant: 'success', icon: 'CheckCircleIcon' }
    if (status === 'Downloaded') return { variant: 'info', icon: 'ArrowDownCircleIcon' }
    if (status === 'Draft') return { variant: 'primary', icon: 'SaveIcon' }
    if (status === 'Sent') return { variant: 'secondary', icon: 'SendIcon' }
    if (status === 'Past Due') return { variant: 'danger', icon: 'InfoIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }

  return {
    fetchOrders,
    perPage,
    currentPage,
    totalOrders,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refOrderListTable,

    statusFilter,

    resolveOrderStatusVariantAndIcon,
    resolveClientAvatarVariant,

    refetchData,
  }
}
