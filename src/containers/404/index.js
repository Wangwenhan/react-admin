import React, { Component } from 'react'
import img_404 from 'src/assets/404_images/404.png'
import img_404_cloud from 'src/assets/404_images/404_cloud.png'
import './index.scss'

class NoMatch extends Component {
  render() {
    const message = '不存在该页面，请检查url！'
    return (
      <div style={{ background: '#f0f2f5', marginTop: "-20px", height: "100vh" }}>
        <div className="wscn-http404">
          <div className="pic-404">
            <img className="pic-404__parent" src={img_404} alt="404" />
            <img className="pic-404__child left" src={img_404_cloud} alt="404" />
            <img className="pic-404__child mid" src={img_404_cloud} alt="404" />
            <img className="pic-404__child right" src={img_404_cloud} alt="404" />
          </div>
          <div className="bullshit">
            <div className="bullshit__oops">404!</div>
            <div className="bullshit__info">版权所有
                    <a className='link-type' href='/' target='_blank'>wwh</a>
            </div>
            <div className="bullshit__headline">{message}</div>
            <div className="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
            <a href="/" className="bullshit__return-home">返回首页</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NoMatch