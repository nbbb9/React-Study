/* eslint-disable */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [title, titleChange] = useState(['남자 코트 추천', '강남 우동 맛집', '롯데월드 추천 맛집']);

  let [likes, likeAdd] = useState(0);

  function changeTitle() {
    let newArray = [...title]; //<Array, Object state 데이터 변경 방법> deep copy => 새로운 복사본을 만들어야함. [...~~] 문법 중요. ES6 문법. State안의 데이터를 건들이는것은 좋지않음.
    newArray[0] = '여자 코트 추천';

    let temp = newArray[0];
    newArray[0] = newArray[2];
    newArray[2] = temp;

    titleChange(newArray);
  }

  return (
    <div className="App">

      <div className="black-nav">

        <div style={{ color: "yellow" }}>개발 블로그</div>

      </div>

      <button onClick={changeTitle}>버튼</button>

      <div className="list">
        <h3> {title[0]} <span onClick={() => { likeAdd(likes + 1) }}>👍🏻</span> {likes} </h3>
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

      <Modal />

    </div>
  );
}

function Modal() {//component만드는 방법. 1. 이름은 대괄호(랜더링 안됨) 2. return()안에 태그는 하나로 묶어야함.(<div>쓰기 싫으면 <> </>으로.)
  return (
    <>
      <div className="modal">
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  );
}

export default App;
