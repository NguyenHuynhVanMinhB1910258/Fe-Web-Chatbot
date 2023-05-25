import React, { useEffect, useState } from 'react'
import './Welcome.scss'
import { createHistory, getAllHistory } from '../service/historyService'
import { createQuestion } from '../service/questionService'
import axios from 'axios'
import Micro from '../assets/micro.svg'
import Send from '../assets/send.svg'
import { useNavigate } from 'react-router-dom'
export default function (props) {
  const navigate = useNavigate();
  const [InputChat, setInputChat] = useState('');
  const [ID] = useState(localStorage.getItem('user_i'))
  const [recognition, setRecognition] = useState(null);
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      console.log('Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'vi-VN';

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setInputChat(transcript);
    };

    setRecognition(recognitionInstance);
  }, [])
  const handleSendChat = async () => {
    // props.handleNewHitory();
    const formdata = new URLSearchParams()
    formdata.append('input', InputChat)
    axios.post('https://api.zalo.ai/v1/tts/synthesize', formdata,
      {
        headers: {
          apikey: 'Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj',
        }
      }).then(async res => {
        // console.log

        let response = await createHistory({title: InputChat, user_id: ID})
        let rp1 = await createQuestion({
          history_id: response._id,
          content: InputChat,
          answer: InputChat,
          url_audio_content: res.data.data.url,
          url_audio_answer: res.data.data.url
        })
        if(response){
          setInputChat('')
          props.Add_History(response);
          navigate("/chat/history/"+response._id)
        }
      }).catch(e => console.log(e))
  }
  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };
  const showMenu = () => {
    // console.log('a');
    const menu = document.querySelector(".col-2")
    // console.log(menu.style.display)
    menu.style.position = 'absolute'
    menu.style.animation = "slideInFromRight 0.2s ease-out"
    menu.style.display = 'block'
    document.querySelector(".col-10").style.pointerEvents = 'none'
    document.querySelector(".col-10").style.opacity = 0.5
  }
  return (
    <div className="content-welcome">
      <div className="header-chat">
        <i
          onClick={() => {
            showMenu();
          }}
          type="button"
          className="fa-solid fa-list"
        ></i>
      </div>
      <div className="title">
        <div className="row">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Welcome to ChatABC</h1>
          </div>
          <div className="col-4">
            <span>Example</span>
          </div>
          <div className="col-4">
            <span>Example</span>
          </div>
          <div className="col-4">
            <span>Example</span>
          </div>
        </div>
      </div>
      <div className="footer-chat">
        <div className="chat">
          {/* <form onSubmit={(e)=>handleSendChat(e)}> */}
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setInputChat('')
                handleSendChat();
              }
            }}
            type="text"
            className="input-chat"
            maxLength={10000}
            placeholder="Type your message...."
            onChange={(event) => {
              setInputChat(event.target.value);
              var textarea = document.querySelector(".input-chat");
              var div = textarea.parentElement;
              console.log(textarea.scrollHeight);
              if (textarea.scrollHeight > 46 && textarea.scrollHeight < 100)
                div.style.height = textarea.scrollHeight + "px";
              if (event.target.value === "") {
                div.style.height = "50px";
              }
            }}
            value={InputChat}
          ></textarea>
          {/* </form> */}
          <div className="group-button">
            <img
              src={Micro}
              onClick={() => {
                startListening();
              }}
            ></img>
            <img
              id={"send"}
              src={Send}
              onClick={() => {
                handleSendChat();
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
