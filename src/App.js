/* eslint-disable */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [title, titleChange] = useState(['남자 코트 추천', '강남 우동 맛집', '롯데월드 추천 맛집']);




  return (
    <div className="App">

      <div className="black-nav">

        <div style={{ color: "yellow" }}>개발 블로그</div>

      </div>

      <div className="list">
        <h3> {title[0]} <span>👍🏻</span> 1 </h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>

      <div className="list">
        <h3> {title[1]} </h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>

      <div className="list">
        <h3> {title[2]} </h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>

    </div>
  );
}

export default App;
