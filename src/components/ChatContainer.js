import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import './ChatContainer.scss'
import Audo from '../assets/audio.svg'
import { getQuestion, updateLike } from '../service/questionService'
import { createQuestion } from '../service/questionService'
import Micro from '../assets/micro.svg'
import Send from '../assets/send.svg'
import axios from 'axios'

export default function ChatContainer(props) {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const [question, setQuestion] = useState('')
  const [InputChat, setInputChat] = useState('');
  const [next_page_url,setNextPageUrl] = useState('');
  const [recognition, setRecognition] = useState(null);
  const params = useParams();
  // const [ID] = useState(localStorage.getItem('userID'))
  const [IsCopy, setIsCopy] = useState(false);
  const { id } = params;
  // console.log(id);
  useEffect(() => {
    var objDiv = document.querySelector(".Chatbox")
    var scrollHeight = objDiv.scrollHeight;
    objDiv.scrollTop = scrollHeight;  
  }, [question])
  useEffect(() => { 
    if (id) {
      // getAHistory();
      getChat();
    }
  }, [id])

  useEffect(()=>{
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
  },[])
  const getChat = async () => {
    let rp = await getQuestion(id);
    setQuestion(rp.data)
    if(rp.url_next_page !== null)
    setNextPageUrl(rp.url_next_page.replace('http://', 'https://'))
    else setNextPageUrl(null)
  }
 
  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };
  const handleSendChat = async () => {
    const text = InputChat;
    const formdata = new URLSearchParams()
    formdata.append('input', text)
    axios.post('https://api.zalo.ai/v1/tts/synthesize', formdata,
      {
        headers: {
          apikey: 'Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj',
        }
      }).then(async res => {
        let rp1 = await createQuestion({
          history_id: id,
          content: text,
          answer: text,
          url_audio_content: res.data.data.url,
          url_audio_answer: res.data.data.url
        })
        // console.log(rp1);
        setInputChat('')
        setQuestion([rp1,...question])
        // getChat();

        // console.lơog(rp1);
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
    menu.style.animation = '0.2s ease-out 0s 1 normal none running slideInFromRight'
    menu.style.position = 'absolute'
    menu.style.display = 'block'
    document.querySelector(".col-10").style.pointerEvents = 'none'
    document.querySelector(".col-10").style.opacity = 0.5
  }
  const handleLike = async (id , favorite) => {
    const res = await updateLike(id, {favorite: favorite})
    getChat();
  }
  
  const copyTextUser = () => {
    const textElement = textRef.current;
    const text = textElement.textContent;
    navigator.clipboard.writeText(text)
  };

  const copyTextBot = () => {
    const textElement = textRef1.current;
    const text = textElement.textContent;
    navigator.clipboard.writeText(text)
    setIsCopy(true);
    setTimeout(setIsCopy(false),3000)
  };
  const handleScroll = (event) =>{
    var token = localStorage.getItem('token');
    const target = event.target;
    // console.log(target.scrollHeight - target.scrollTop)
    // console.log(target.scrollHeight)
    if (target.scrollHeight - target.scrollTop === target.scrollHeight && next_page_url !==null) {
      axios.get(next_page_url,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setQuestion([...res.data.data,...question])
        if(res.data.url_next_page !== null)
        setNextPageUrl(res.data.url_next_page.replace('http://', 'https://'))
        else setNextPageUrl(null)
      })
  }
  }
  return (
    <div className='content-chat'>
       <div className='header1-chat'>
          <i onClick={() => { showMenu() }} type='button' className="fa-solid fa-list" ></i>
        </div>
        {/* {console.log('ahiihh')} */}
      <div className='Chatbox' onScroll={handleScroll}>
        {
          question && [...question].reverse().map((item, index) => {

            return (
              <div key={index}>
                <div className='chat-user'>

                  <div className='chat-item'>
                    <div className='chatUser'>
                      <p ref={textRef}>{item.content}</p>
                    </div>
                    <hr className='space'></hr>
                    <div className='operation'>
                      <div className='ahuhu'>
                        <span onClick={()=>{copyTextUser()}}><i className="fa-regular fa-clipboard"></i></span>
                        <span type="button" onClick={() => { playAudio(item.url_audio_content) }}><img src={Audo}></img></span>
                      </div>
                      <div>
                        <p style={{fontSize:12,color: '#ccc'}}>{'thời gian'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {

                  item.answer !== null ?
                  
                    (<div className='chat-bot'>
                      <div className='chat-item'>

                        <div className='chatUser'>
                          <p ref={textRef1}>{item.answer}</p>
                        </div>
                        <hr className='space'></hr>
                        <div className='operation'>
                          <div className='ahuhu'>
                            {
                              IsCopy ? 
                              (<span><p>Copied</p><i className="fa-regular fa-clipboard"></i></span>):
                              (<span onClick={()=>{copyTextBot()}} type='button'> <i className="fa-regular fa-clipboard"></i></span>)
                            }
                            <span>

                              {
                                item.favorite === true ? 
                                (<i type='button' onClick={()=>{handleLike(item._id,null)}} style={{color:'blue'}} className="fa-solid fa-thumbs-up"></i>) 
                                : (<i type='button' onClick={()=>{handleLike(item._id,true)}} style={{color:'gray'}} className="fa-solid fa-thumbs-up"></i>)
                              }
                              </span>
                            <span>
                              {
                                item.favorite === false ?
                                (<i type='button' onClick={()=>{handleLike(item._id,null)}} style={{color:'red'}} className="fa-solid fa-thumbs-down"></i>)
                                : (<i type='button' onClick={()=>{handleLike(item._id,false)}} style={{color:'gray'}} className="fa-solid fa-thumbs-down"></i>)
                              }
                              </span>

                            <span type="button" onClick={() => {playAudio(item.url_audio_content)}}><img src={Audo}></img></span>
                          </div>
                          <div>
                            <p style={{fontSize:12,color: '#ccc'}}>{'thời gian'}</p>
                          </div>
                        </div>
                      </div>
                    </div>) : null
                }
              </div>
            )
          })
        }
      </div>
      <div className='footer-chat'>
        <div className='chat'>
        <textarea className='input-chat'
          maxLength={10000}
          placeholder='Type your message....'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              var textarea = document.querySelector(".input-chat");
              var div = textarea.parentElement;
              div.style.height = "50px";
              handleSendChat();
            }
          }}
          onChange={(event) => 
            {
              setInputChat(event.target.value)
              var textarea = document.querySelector(".input-chat");
              var div = textarea.parentElement;
              // console.log(textarea.scrollHeight);
              if (textarea.scrollHeight > 46 && textarea.scrollHeight < 100)
                div.style.height = textarea.scrollHeight + "px";
              if (event.target.value === "") {
                div.style.height = "50px";
              }
           }}
          value={InputChat}>
        </textarea>
        <div className='group-button'>
          <img src={Micro} onClick={() => { startListening() }}></img>
          <img src={Send} onClick={() => { handleSendChat() }}></img>
        </div>
      </div>
      </div>
      
    </div>
  )
}
