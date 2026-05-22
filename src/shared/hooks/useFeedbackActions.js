import { useNotifications } from '../feedback/NotificationContext'
import {
  getAuthMessage,
  getCartMessage,
  getCheckoutMessage,
  getReviewMessage,
  getWishlistMessage,
  normalizeFeedbackMessage,
} from '../feedback/notificationMessages'

export function useFeedbackActions() {
  const notifications = useNotifications()
  const notify = notifications?.notify

  return {
    notifySuccess: (message, options) => notify?.success(message, options),
    notifyError: (message, options) => notify?.error(message, options),
    notifyWarning: (message, options) => notify?.warning(message, options),
    notifyInfo: (message, options) => notify?.info(message, options),
    cartAdded: (product, quantity = 1) => notify?.success(getCartMessage('added', product.name, quantity)),
    cartRemoved: (product) => notify?.info(getCartMessage('removed', product.name)),
    cartCleared: () => notify?.warning(getCartMessage('cleared')),
    wishlistAdded: (product) => notify?.success(getWishlistMessage('added', product.name)),
    wishlistRemoved: (product) => notify?.info(getWishlistMessage('removed', product.name)),
    authLoginSuccess: (user) => notify?.success(getAuthMessage('login', user?.name)),
    authRegisterSuccess: (user) => notify?.success(getAuthMessage('register', user?.name)),
    authLogoutSuccess: () => notify?.info(getAuthMessage('logout')),
    checkoutSuccess: (order) => notify?.success(getCheckoutMessage('success', order?.id)),
    reviewSubmitted: (product) => notify?.success(getReviewMessage(product.name)),
    serviceError: (error, fallback) => notify?.error(normalizeFeedbackMessage(error, fallback)),
  }
}
