/**
 * Svg组件
 * 请先访问 http://iconfont.cn/ 下载所需图标的Svg文件 放入 src/assets/icons 文件夹内
 * 然后在需要的地方引入该组件 并传入参数iconClass 值为svg文件的名字 
 * <IconSvg iconClass="chart"/>
 * @author Wangwenhan <nj.wangwenhan@gmail.com>
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class IconSvg extends Component {
  render() {
    const iconName = `#icon-${this.props.iconClass}`
    return (
      <svg className={`svg-icon ${this.props.className}`} aria-hidden="true">
        <use xlinkHref={iconName}></use>
      </svg >
    )
  }
}

IconSvg.propTypes = {
  iconClass: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default IconSvg