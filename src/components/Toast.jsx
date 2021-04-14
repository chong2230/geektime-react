import React,  { useState } from 'react';
import './Toast.css';

function Toast(msg, duration) {
    this.msg = msg;
    this.duration = duration;

    this.show = function() {

    }

    return (
        <div className="toast"><span>{msg}</span></div>
    )
}

export default Toast;