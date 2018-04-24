/**
 * 动态预加载Svg
 * @author Wangwenhan <nj.wangwenhan@gmail.com>
 */

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./assets/icons', false, /\.svg$/) // eslint-disable-line
requireAll(req)
