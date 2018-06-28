import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import img_404 from 'src/assets/404_images/404.png'
import img_404_cloud from 'src/assets/404_images/404_cloud.png'
import styles from './index.scss'

class NoMatch extends Component {
  render() {
    const message = '不存在该页面，请检查url！'
    return (
      <div className={`${styles.not_found_content} not_found_wrapper`} style={this.props.style}>
        <div className={styles.wscn_http404}>
          <div className={styles.pic_404}>
            <img className={styles.pic_404_parent} src={img_404} alt="404" />
            <img className={styles.pic_404_child_left} src={img_404_cloud} alt="404" />
            <img className={styles.pic_404_child_mid} src={img_404_cloud} alt="404" />
            <img className={styles.pic_404_child_right} src={img_404_cloud} alt="404" />
          </div>
          <div className={styles.bullshit}>
            <div className={styles.bullshit_oops}>404!</div>
            <div className={styles.bullshit_info}>版权所有
                    <a href='http://www.htsc.com.cn' target='_blank' rel="noopener noreferrer">React Admin</a>
            </div>
            <div className={styles.bullshit_headline}>{message}</div>
            {!this.props.shouldHideReturnHomeBtn && (
              <div>
                <div className={styles.bullshit_info}>请检查您输入的网址是否正确，请点击以下按钮返回主页</div>
                <Link to="/" className={styles.bullshit_return_home}>返回首页</Link>
              </div>
            )}

          </div>
        </div>
      </ div >
    )
  }
}

NoMatch.propTypes = {
  style: PropTypes.object,
  shouldHideReturnHomeBtn: PropTypes.bool
}

export default NoMatch