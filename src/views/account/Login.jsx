import React, { useState } from 'react'
import './Login.scss'

function Login() {
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState(86);
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);    // 登录步骤，包括填写手机号、输入验证码
    const [mode, setMode] = useState(1);    // 登录模式，1: pc 2: app qrcode 
    const [type, setType] = useState(1);    // 登录类型，1: 手机验证码登录 2: 密码登录 
    const [isPhoneError, setPhoneError] = useState(false);
    const [isCodeError, setCodeError] = useState(false);

    function getCaptcha() {
        if (!phone) {
            setPhoneError(true);
            return;
        }
        setStep(2);
    }

    function login() {
        if (!code) {
            setCodeError(true);
            return;
        }
        // TODO: login
    }

    return (
        <div className="login-page page">
            <div className="home-bg"></div>
            <div className="sms-login">
                <div className="card">
                    <div className="quick-operation" onClick={()=> setMode(3 - mode)}>
                        <div className="operation-icon"></div>
                        <div className="operation-tips">
                            { mode === 2 ? ' 返回登录/注册 ' : ' 下载 App 学习 '}
                            <div className="arrow"></div> 
                        </div>
                    </div>
                    {
                        mode === 1 && type === 1 && step === 1 ?
                        <div className="login-form">
                            <h1 className="title">登录/注册</h1>
                            <div className="sub-title">新人注册可得 88 元礼券</div>
                            <div className="cellphone-item">
                                <div gk-form="" data-size="" data-color="common" className="cellphone-sec gkui-form-element gkui-form-element-text" 
                                        gktext-color="common" gktext-size="" gk-text="true" invalid="true">
                                    <div className="country-sec" >+{countryCode}</div>
                                    <input name="cellphone" autoComplete="off" placeholder="手机号" maxLength="11" gktext-input="" type="text" 
                                        className="phone-input gkui-form-text" onChange={(event)=>{setPhone(event.target.value);}}></input>
                                    { isPhoneError ? <span gk-form-element-error="" className="gkui-form-error" v-if="isPhoneError">请输入正确的手机号</span> : null }
                                </div>
                            </div>
                            <div className="button-wrap">
                                <div gk-button="" gkbtn-color="login" gkbtn-size="" className="captcha-btn" onClick={getCaptcha}> 获取验证码 </div>
                            </div>
                        </div>
                        : null
                    }   
                    {
                        mode === 1 && type === 1 && step === 2 ?                                         
                        <div className="verification-code login-form">
                            <h1 className="title">输入验证码</h1>
                            <div className="sub-title">验证码已发送至 +{countryCode} {phone}</div>
                            <div className="gkui-form account-form">
                                <div className="captcha-wrapper" type="number">
                                    <div gk-form="" data-size="" data-color="common" className="gkui-form-element gkui-form-element-text" 
                                            gktext-color="common" gktext-size="" gk-text="true" invalid="true">
                                        <input name="code" autoComplete="off" placeholder="" maxLength="6" gktext-input="" type="text" 
                                            className="gkui-form-text" value={code}  onChange={(event)=>{setCode(event.target.value)}} ></input>
                                        <div gk-button="" gkbtn-color="" gkbtn-size="" className="btn-container send-button"> 获取验证码 </div>
                                        { isCodeError ? <span gk-form-element-error="" className="gkui-form-error" v-if="isVerifyCodeError">请输入正确的短信验证码</span> : null }
                                    </div>
                                </div>
                            </div>
                            <div className="button-wrapper">
                                <div gk-button="" gkbtn-color="login" gkbtn-size="" className="btn-container login-btn" onClick={login}> 登录 </div>
                            </div>
                        </div>
                        : null
                    }
                    {
                        mode === 2 ?
                        <div className="down-panel">
                            <img src="data:image/png;base64,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" />
                            <p>
                                扫码下载
                                <span>极客时间 App </span>
                                学习
                            </p>
                        </div>
                        : null
                    }
                    {
                        mode === 1 && type === 2 ?
                        <div className="login-form password-form">
                            <h1 className="title">密码登录</h1>
                            <div className="sub-title">新人注册可得 88 元礼券</div>
                            <div className="gkui-form account-form cellphone-item">
                                <div gk-form="" data-size="" data-color="common" className="gkui-form-element gkui-form-element-text" 
                                        gktext-color="common" gktext-size="" gk-text="true">
                                    <div gk-form-custom-group="" className="country-sec">
                                        <input type="hidden" value="" readOnly></input>
                                        <span>+{countryCode}</span>
                                        <i className="iconfont Cellphone_arrow"></i>
                                    </div>
                                    <input name="cellphone" autoComplete="off" placeholder="手机号" maxLength="11" gktext-input="" type="text" 
                                        className="gkui-form-text" value="" onChange={(event)=>{setPhone(event.target.value)}} ></input>
                                    
                                    <div>
                                </div>
                            </div>
                            <div gk-form="" data-size="" data-color="common" className="gkui-form-element gkui-form-element-text" 
                                gktext-color="common" gktext-size="" valid="true">
                            <input name="password" autoComplete="off" placeholder="密码" maxLength="24" gktext-input="" type="password" 
                                className="gkui-form-text" value={password}  onChange={(event)=>{setPassword(event.target.value)}} ></input>
                            <div className="action-icon">
                                <i className="iconfont operation-icon Password_show"></i>
                                </div>
                                </div>
                            </div>
                                <div className="forgot">
                                    <a href="/forgot" className="">忘记密码</a>
                                </div>
                                <div className="button-wrapper">
                                    <div gk-button="" gkbtn-color="login" gkbtn-size="" className="btn-container"> 登录 </div>
                                </div>
                        </div>
                        : null
                    }                    
                    {
                        mode === 1 && type === 1 ?
                        <a className="change-login" onClick={()=>{ setType(2) }}>密码登录</a>
                        : null
                    }
                    {
                        mode === 1 && type === 2 ?
                        <a className="change-login" onClick={()=>{ setType(1) }}>验证码登录</a>
                        : null
                    }                    
                    
                    <div className="placeholder"></div>
                    <div className="third-party-sec">
                        <ul className="third-operation">
                            <li>
                                <i className="iconfont icon-wechat"></i>
                            </li>
                            <li>
                                <i className="iconfont icon-qq"></i>
                            </li>
                            <li>
                                <i className="iconfont icon-weibo"></i>
                            </li>
                        </ul>
                        <div className="agree">
                            <span>登录即表示同意极客邦</span>
                            <a href="https://time.geekbang.org/agreement" target="_black">《用户协议》</a>
                            <span>和</span>
                            <a href="https://time.geekbang.org/private" target="_black">《隐私政策》</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;