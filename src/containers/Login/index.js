import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './index.scss'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import queryString from 'query-string'
const FormItem = Form.Item;
import logoPng from './../../assets/login/logo.png'
import { loginSystem } from 'api/user'
import { setUserInfo as setUserInfoFromAction, clearUserInfo as clearUserInfoFromAction } from './../../actions/user'

class NormalLoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iconLoading: false
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          iconLoading: true
        })
        // 采用cookie或者token需自己适配
        const formData = new FormData()
        const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (reg.test(values.username)) {
          formData.append('email', values.username)
        } else {
          formData.append('username', values.username)
        }
        formData.append('password', values.password)
        loginSystem(formData).then(res => {
          // 登录成功 设置用户信息
          this.props.setUserInfo(res.data)
          // 接收跳转到login时携带的的redirect参数 并在登录成功后进行跳转
          const search = queryString.parse(this.props.location.search)
          const redirect = decodeURIComponent(search.redirect || '/')
          this.props.history.push(redirect)
        }).catch(err => {
          this.setState({
            iconLoading: false
          })
          // 登录失败 请客用户信息（有可能用户在登录状态下重新登录其他账号）
          this.props.clearUserInfo()
          console.error(err.message)
        })
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={`${styles.container} login-page-wrapper`}>
        <div className={styles.login_form_content}>
          <Form onSubmit={this.handleSubmit.bind(this)} className={styles.login_form}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <Link to="/modify" className={styles.login_form_forgot}>
                忘记密码
               </Link>
              <Button type="primary" htmlType="submit" loading={this.state.iconLoading} className={styles.login_form_button}>
                登录
          </Button>
            </FormItem>
          </Form>
        </div>
        <div className={styles.logo_content}>
          <img src={logoPng} alt="logo" width="200px" />
        </div>
        <div className={styles.copy_right}>
          <span>powered by wwh</span>
        </div>
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  clearUserInfo: PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: userInfo => {
      dispatch(setUserInfoFromAction(userInfo))
    },
    clearUserInfo: () => {
      dispatch(clearUserInfoFromAction())
    }
  }
}

const WrappedNormalLoginForm = Form.create()(connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm))

export default WrappedNormalLoginForm
