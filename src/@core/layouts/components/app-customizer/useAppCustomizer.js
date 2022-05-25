import { ref, computed } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import i18n from '@/libs/i18n'

function trans(val) {
  return i18n.t(val)
}

export default function useAppCustomizer() {
  // Customizer
  const isCustomizerOpen = ref(false)

  // Skin
  const skinOptions = computed(() => [
    { text: trans('Light'), value: 'light' },
    { text: trans('Bordered'), value: 'bordered' },
    { text: trans('Dark'), value: 'dark' },
    { text: trans('Semi Dark'), value: 'semi-dark' },
  ])

  // Content Width Options
  const contentWidthOptions = computed(() => [
    { text: trans('Full Width'), value: 'full' },
    { text: trans('Boxed'), value: 'boxed' },
  ])

  // Router Transition
  const routerTransitionOptions = computed(() => [
    { title: trans('Zoom Fade'), value: 'zoom-fade' },
    { title: trans('Fade'), value: 'fade' },
    { title: trans('Fade Bottom'), value: 'fade-bottom' },
    { title: trans('Slide Fade'), value: 'slide-fade' },
    { title: trans('Zoom Out'), value: 'zoom-out' },
    { title: trans('None'), value: 'none' },
  ])

  // Router Transition
  const layoutTypeOptions = computed(() => [
    { text: trans('Vertical'), value: 'vertical' },
    { text: trans('Horizontal'), value: 'horizontal' },
  ])

  // Navbar
  const navbarColors = ['', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']

  // Navbar Types
  const navbarTypes = computed(() => [
    { text: trans('Floating'), value: 'floating' },
    { text: trans('Sticky'), value: 'sticky' },
    { text: trans('Static'), value: 'static' },
    { text: trans('Hidden'), value: 'hidden' },
  ])

  // Footer Types
  const footerTypes = computed(() => [
    { text: trans('Sticky'), value: 'sticky' },
    { text: trans('Static'), value: 'static' },
    { text: trans('Hidden'), value: 'hidden' },
  ])

  // eslint-disable-next-line object-curly-newline
  const {
    isRTL,
    skin,
    contentWidth,
    routerTransition,
    layoutType,
    isNavMenuHidden,
    isVerticalMenuCollapsed,
    navbarBackgroundColor,
    navbarType,
    footerType,
  } = useAppConfig()

  return {
    // Customizer
    isCustomizerOpen,

    // Vertical Menu
    isVerticalMenuCollapsed,

    // Skin
    skin,
    skinOptions,

    // Content Width
    contentWidth,
    contentWidthOptions,

    // RTL
    isRTL,

    // routerTransition
    routerTransition,
    routerTransitionOptions,

    // Layout Type
    layoutType,
    layoutTypeOptions,

    // NavMenu Hidden
    isNavMenuHidden,

    // Navbar
    navbarColors,
    navbarTypes,
    navbarBackgroundColor,
    navbarType,

    // Footer
    footerTypes,
    footerType,
  }
}
