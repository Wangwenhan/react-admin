import React, { Component } from 'react'
import { Link } from "react-router-dom";
import img_404 from 'src/assets/404_images/404.png'
import img_404_cloud from 'src/assets/404_images/404_cloud.png'
import styles from './index.scss'

class NoMatch extends Component {
  render() {
    const message = '不存在该页面，请检查url！'
    return (
      <div className={`${styles['not-found-content']} not-found-wrapper`}>
        <div className={styles['wscn-http404']}>
          <div className={styles['pic-404']}>
            <img className={styles['pic-404__parent']} src={img_404} alt="404" />
            <img className={styles['pic-404__child_left']} src={img_404_cloud} alt="404" />
            <img className={styles['pic-404__child_mid']} src={img_404_cloud} alt="404" />
            <img className={styles['pic-404__child_right']} src={img_404_cloud} alt="404" />
          </div>
          <div className={styles.bullshit}>
            <div className={styles['bullshit__oops']}>404!</div>
            <div className={styles['bullshit__info']}>版权所有
                    <a className={styles['link-type']} href='/' target='_blank'>wwh</a>
            </div>
            <div className={styles['bullshit__headline']}>{message}</div>
            <div className={styles['bullshit__info']}>请检查您输入的网址是否正确，请点击以下按钮返回主页</div>
            <Link to="/" className={styles['bullshit__return-home']}>返回首页</Link>
          </div>
        </div>
      </ div >
    )
  }
}

export default NoMatch