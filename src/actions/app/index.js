import { TOGGLE_MENU_COLLAPSED } from 'constants/app'

export const toggleMenuCollapsed = state => ({
  type: TOGGLE_MENU_COLLAPSED,
  state
})

// export function addCountAsync(state) {
//   return dispatch => {
//       setTimeout( () => {
//           dispatch(toggleMenuCollapsed(state))
//        },2000)
//    }
// }