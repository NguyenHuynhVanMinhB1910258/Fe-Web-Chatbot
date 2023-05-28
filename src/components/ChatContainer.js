import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ChatContainer.scss";
import { getQuestion, updateLike } from "../service/questionService";
import { createQuestion } from "../service/questionService";
import axios from "axios";
import Modal from "./Modal";

export default function ChatContainer(props) {
  const [question, setQuestion] = useState("");
  const [playing_audio_id,setPlaying] = useState("");
  const [InputChat, setInputChat] = useState("");
  const [next_page_url, setNextPageUrl] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [audio, setAudio] = useState();
  const [scrollEnd, setScrollEnd] = useState(true);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (id) {
      getChat();
    }
  }, [id]);
  useEffect(() => {
    var objDiv = document.querySelector(".Chatbox");
    var scrollHeight = objDiv.scrollHeight;
    objDiv.scrollTop = scrollHeight;
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản."
      );
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "vi-VN";

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setModalIsOpen(false);
      setInputChat(transcript);
    };

    setRecognition(recognitionInstance);
  }, []);
  useEffect(() => {
    if (scrollEnd === true) {
      var objDiv = document.querySelector(".Chatbox");
      var scrollHeight = objDiv.scrollHeight;
      objDiv.scrollTop = scrollHeight;
    }
    setScrollEnd(false);
  }, [scrollEnd]);

  const getChat = async () => {
    let rp = await getQuestion(id);
    setQuestion(rp.data);
    if (rp.url_next_page !== null)
      setNextPageUrl(rp.url_next_page.replace("http://", "https://"));
    else setNextPageUrl(null);
    setScrollEnd(true);
  };

  const playAudio = (url,id) => {
    const Audio_obj = new Audio(url);
    Audio_obj.addEventListener("ended", () => {
      setAudio("");// Thực hiện hành động sau khi âm thanh kết thúc
    });
    Audio_obj.play();
    setAudio(Audio_obj);
  };
  const StopAudio = () => {
    audio.pause();
    setAudio("");
  };
  const handleSendChat = async () => {
    const text = InputChat;
    const formdata = new URLSearchParams();
    formdata.append("input", text);
    axios
      .post("https://api.zalo.ai/v1/tts/synthesize", formdata, {
        headers: {
          apikey: "Wn5P5FrSoPb1uJhb2t8TOI8gkpStUVPj",
        },
      })
      .then(async (res) => {
        let rp1 = await createQuestion({
          history_id: id,
          content: text,
          answer: text,
          url_audio_content: res.data.data.url,
          url_audio_answer: res.data.data.url,
        });
        // console.log(rp1);
        setInputChat("");
        setQuestion([rp1, ...question]);
        setScrollEnd(true);
        // getChat();

        // console.lơog(rp1);
      })
      .catch((e) => console.log(e));
  };
  const startListening = () => {
    if (recognition) {
      recognition.start();
      setModalIsOpen(true);
    }
  };
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setModalIsOpen(false);
    }
  };
  const showMenu = () => {
    // console.log('a');
    const menu = document.querySelector(".col-2");
    // console.log(menu.style.display)
    menu.style.animation =
      "0.2s ease-out 0s 1 normal none running slideInFromRight";
    menu.style.position = "absolute";
    menu.style.display = "block";
    document.querySelector(".col-10").style.pointerEvents = "none";
    document.querySelector(".col-10").style.opacity = 0.5;
  };
  function updateObject(array, objectId, newValues) {
    return array.map((obj) => {
      if (obj._id === objectId) {
        return { ...obj, ...newValues };
      }
      return obj;
    });
  }
  const handleLike = async (item, favorite) => {
    item.favorite = favorite;
    setQuestion(updateObject(question, item._id, item));
    const res = await updateLike(item._id, { favorite: favorite });
    // setQuestion(updateObject(question,id,res))
  };

  const copyTextUser = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleScroll = (event) => {
    var token = localStorage.getItem("token");
    const target = event.target;
    // console.log(target.scrollHeight - target.scrollTop)
    // console.log(target.scrollHeight)
    if (
      target.scrollHeight - target.scrollTop === target.scrollHeight &&
      next_page_url !== null
    ) {
      axios
        .get(next_page_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setQuestion([...question, ...res.data.data]);
          if (res.data.url_next_page !== null)
            setNextPageUrl(
              res.data.url_next_page.replace("http://", "https://")
            );
          else setNextPageUrl(null);
        });
    }
  };
  const Timer = (time) => {
    var gmtTime = new Date(time);
    // Lấy giờ, phút và giây của thời gian GMT
    var gmtHours = gmtTime.getUTCHours();
    var gmtMinutes = gmtTime.getUTCMinutes();
    var gmtSeconds = gmtTime.getUTCSeconds();

    // Chuyển đổi sang múi giờ Việt Nam (GMT+7)
    var vnHours = gmtHours + 7;
    // Tạo một đối tượng Date mới với múi giờ Việt Nam
    var vnTime = new Date(gmtTime);
    vnTime.setHours(vnHours, gmtMinutes, gmtSeconds);
    // Lấy thông tin thời gian ở múi giờ Việt Nam
    var vnDateString = vnTime.toDateString();
    var vnTimeString = vnTime.toTimeString();
    vnTimeString = vnTimeString.replace(/GMT\+\d{4} \(.*\)/, "");
    return vnDateString + " " + vnTimeString;
  };
  return (
    <>
      <div className="content-chat">
        <Modal
          modalIsOpen={modalIsOpen}
          transcript={InputChat}
          stopListening={stopListening}
        ></Modal>
        <div className="header1-chat">
          <i
            onClick={() => {
              showMenu();
            }}
            type="button"
            className="fa-sharp fa-solid fa-bars"
          ></i>
          {/* <i class="fa-sharp fa-solid fa-bars"></i> */}
        </div>
        {/* {console.log('ahiihh')} */}
        <div className="Chatbox" onScroll={handleScroll}>
          {question &&
            [...question].reverse().map((item, index) => {
              return (
                <div key={index}>
                  <div className="chat-user">
                    <div className="chat-item">
                      <div className="chatUser">
                        <p>{item.content}</p>
                      </div>
                      <hr className="space"></hr>
                      <div className="operation">
                        <div className="ahuhu">
                          <span
                            className="tool-tip"
                            type="button"
                            onClick={() => {
                              copyTextUser(item.content);
                            }}
                          >
                            <i
                              style={{ color: "gray" }}
                              className="fa-solid fa-clipboard"
                            ></i>

                            <span className="tooltiptext">Copied!</span>
                          </span>
                          <span
                            type="button"
                            onClick={() => {
                              // console.log(!audio)
                              if (!audio) playAudio(item.url_audio_content);
                              else StopAudio();
                            }}
                          >
                            {audio ? (
                              <i
                                style={{ color: "gray" }}
                                className="fa-solid fa-pause"
                              ></i>
                            ) : (
                              <i
                                style={{ color: "gray" }}
                                className="fa-solid fa-volume-high"
                              ></i>
                            )}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontSize: 12, color: "#ccc" }}>
                            {Timer(item.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.answer !== null ? (
                    <div className="message-bot">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          width: 30,
                          height: 30,
                          minWidth: 30,
                          minHeight: 30,
                          background: "white",
                        }}
                      >
                        <i class="fa-solid fa-robot"></i>
                      </div>
                      <div className="chat-bot">
                        <div className="chat-item">
                          <div className="chatUser">
                            <p>{item.answer}</p>
                          </div>
                          <hr className="space"></hr>
                          <div className="operation">
                            <div className="ahuhu">
                              <span
                                className="tool-tip"
                                onClick={() => {
                                  copyTextUser(item.answer);
                                }}
                                type="button"
                              >
                                {" "}
                                <i
                                  style={{ color: "gray" }}
                                  className="fa-solid fa-clipboard"
                                ></i>
                                <span className="tooltiptext">Copied!</span>
                              </span>
                              <span>
                                {item.favorite === true ? (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, null);
                                    }}
                                    style={{ color: "blue" }}
                                    className="fa-solid fa-thumbs-up"
                                  ></i>
                                ) : (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, true);
                                    }}
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-thumbs-up"
                                  ></i>
                                )}
                              </span>
                              <span>
                                {item.favorite === false ? (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, null);
                                    }}
                                    style={{ color: "red" }}
                                    className="fa-solid fa-thumbs-down"
                                  ></i>
                                ) : (
                                  <i
                                    type="button"
                                    onClick={() => {
                                      handleLike(item, false);
                                      // StopAudio(item.url_audio_content)
                                    }}
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-thumbs-down"
                                  ></i>
                                )}
                              </span>

                              <span
                                type="button"
                                onClick={() => {
                                  if (!audio) playAudio(item.url_audio_content);
                                  else StopAudio();
                                }}
                              >
                                {audio ? (
                                  <i
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-pause"
                                  ></i>
                                ) : (
                                  <i
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-volume-high"
                                  ></i>
                                )}
                              </span>
                            </div>
                            <div>
                              <p style={{ fontSize: 12, color: "#ccc" }}>
                                {Timer(item.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
        <div className="footer-custom">
          <div className="footer-chat">
            <div className="chat">
              <textarea
                className="input-chat"
                maxLength={10000}
                placeholder="Type your message...."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    var textarea = document.querySelector(".input-chat");
                    var div = textarea.parentElement;
                    div.style.height = "50px";
                    handleSendChat();
                  }
                }}
                onChange={(event) => {
                  setInputChat(event.target.value);
                  var textarea = document.querySelector(".input-chat");
                  var div = textarea.parentElement;
                  // console.log(textarea.scrollHeight);
                  if (textarea.scrollHeight > 46 && textarea.scrollHeight < 100)
                    div.style.height = textarea.scrollHeight + "px";
                  if (event.target.value === "") {
                    div.style.height = "50px";
                  }
                }}
                value={InputChat}
              ></textarea>
              <div className="group-button">
                <i
                  class="fa-solid fa-microphone"
                  onClick={() => {
                    startListening();
                  }}
                ></i>
                {InputChat ? (
                  <i
                    style={{ color: "black" }}
                    type="button"
                    className="fa-solid fa-paper-plane"
                    onClick={() => {
                      handleSendChat();
                    }}
                  ></i>
                ) : (
                  <i className="fa-solid fa-paper-plane"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
