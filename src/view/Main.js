import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Main.scss";
import Logo from "../assets/logo1.svg";
import {
  createHistory,
  getHistory,
  deleteHistory,
  updateHistory,
} from "../service/historyService";
const Main = (props) => {
  const navigate = useNavigate();
  const [InputEdit, setInputEdit] = useState("");
  const [IsEdit, setIsEdit] = useState("");
  const [IsDelete, setIsDelete] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      console.log(
        "Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản."
      );
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "vi-VN";

    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setInputChat(transcript);
    };

    setRecognition(recognitionInstance);
  }, []);

  // getHistorys();
  function handleClick(id) {
    setIsDelete('');
    setIsEdit('');
    navigate(`/chat/history/${id}`);
  }
  const [recognition, setRecognition] = useState(null);
  const closeMenu = () => {
    // console.log('a');
    const menu = document.querySelector(".col-2");
    // console.log(menu.style.display)
    menu.style.position = "absolute";
    menu.style.animation = "slideOutToLeft 0.2s forwards";
    // menu.style.display = 'none'
    document.querySelector(".col-10").style.pointerEvents = "auto";
    document.querySelector(".col-10").style.opacity = 1;
  };

  const SearchHistory = (e) => {
    const value = e.target.value;
    const history_list = document
      .querySelector(".history-list")
      .querySelectorAll("div");
    for (let i = 0; i < history_list.length; i++) {
      const kt = history_list[i].outerText.toLowerCase().indexOf(value);
      if (kt < 0) {
        history_list[i].style.display = "none";
      } else {
        history_list[i].style.display = "block";
      }
    }
    // console.log(history_list)
  };
  const handleClickEdit = (titleHis, id) => {
    setIsEdit(id);
    setInputEdit(titleHis);
  };
  function updateObject(array, objectId, newValues) {
    return array.map(obj => {
      if (obj._id === objectId) {
        return { ...obj, ...newValues };
      }
      return obj;
    });
  }
  const UpdateName = async (hisid) => {
    const rp = await updateHistory(hisid, { title: InputEdit });
    if (rp) {
      setIsEdit('');
      // console.log(updateObject(props.History, rp._id, rp ) );
      props.setHistory(updateObject(props.History, rp._id, rp )); 
      // props.setHistory();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_i");
    navigate("/");
  };
  const handleScroll = (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      props.Add_History();
    }
  };
  const handleClickDelete = (id) => {
    setIsDelete(id);
  };
  const deleteHis = async (id) => {
    deleteHistory(id)
      .then((res) => {
        props.setHistory(props.History.filter((history) => history._id !== id));
        navigate("/chat");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="content-main">
      <div className="row">
        <div
          className="col-2"
          style={{ animation: "slideInFromRight 0.2s ease-out" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="logo">
              <img src={Logo}></img> <span>Chat ABC</span>
            </div>
            <i
              onClick={() => {
                closeMenu();
              }}
              style={{ fontSize: 25, marginRight: 16 }}
              type="button"
              className=" icon-close fa-sharp fa-solid fa-xmark"
            ></i>
          </div>
          <div className="sider-bar">
            <div className="group-btn">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass input-group-append"></i>
                <input
                  onChange={(e) => {
                    SearchHistory(e);
                  }}
                  className="input-search"
                  placeholder="Tìm kiếm"
                />
              </div>
              <div className="btn">
                <Link to={"/chat"}>
                  <button className="btn-add">
                    Thêm đoạn chat <i className="fa-solid fa-plus"></i>
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ width: 266 }}>
              <p>History</p>
            </div>
            <div className="history-list" onScroll={handleScroll}>
              {props.History &&
                props.History.map((item, index) => {
                  const check =
                    item._id == window.location.href.split("/").pop();
                  const classes = check ? "btn-active" : "btn";
                  return (
                    // <Link to={`/history/${item._id}`} key={index}>{item.title}</Link>
                    <div
                      className={classes}
                      key={index}
                      onClick={() => {
                        if(!check)
                        handleClick(item._id);
                        else {}
                      }}
                    >
                      {check ? (
                        <button className="btn-chat">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M16.9 19.5098C16.59 19.5098 16.28 19.4197 16.01 19.2397L15.05 18.6097C14.78 18.4297 14.65 18.0898 14.74 17.7798C14.81 17.5498 14.84 17.2797 14.84 16.9797V12.9097C14.84 11.2797 13.82 10.2598 12.19 10.2598H5.39999C5.27999 10.2598 5.17 10.2698 5.06 10.2798C4.85 10.2898 4.65001 10.2198 4.49001 10.0798C4.33001 9.93977 4.25 9.73979 4.25 9.52979V6.75977C4.25 3.81977 6.31 1.75977 9.25 1.75977H17.75C20.69 1.75977 22.75 3.81977 22.75 6.75977V11.8597C22.75 13.3097 22.26 14.5897 21.36 15.4697C20.64 16.1997 19.64 16.6698 18.5 16.8098V17.9197C18.5 18.5197 18.17 19.0598 17.65 19.3398C17.41 19.4498 17.15 19.5098 16.9 19.5098ZM16.3 17.6298L16.95 17.9998C17.01 17.9698 17.01 17.9197 17.01 17.9097V16.0997C17.01 15.6897 17.35 15.3497 17.76 15.3497C18.81 15.3497 19.7 15.0198 20.31 14.3998C20.94 13.7798 21.26 12.8997 21.26 11.8497V6.74976C21.26 4.61976 19.89 3.24976 17.76 3.24976H9.25999C7.12999 3.24976 5.75999 4.61976 5.75999 6.74976V8.74976H12.2C14.64 8.74976 16.35 10.4598 16.35 12.8998V16.9697C16.34 17.1997 16.33 17.4198 16.3 17.6298Z"
                              fill="#292D32"
                            />
                            <path
                              d="M6.07001 23.25C5.85001 23.25 5.62 23.2 5.41 23.09C4.94 22.84 4.64999 22.36 4.64999 21.82V21.06C3.76999 20.92 2.99 20.55 2.41 19.97C1.65 19.21 1.25 18.17 1.25 16.97V12.9C1.25 10.64 2.72999 8.98002 4.92999 8.77002C5.08999 8.76002 5.23999 8.75 5.39999 8.75H12.19C14.63 8.75 16.34 10.46 16.34 12.9V16.97C16.34 17.41 16.29 17.82 16.18 18.19C15.73 19.99 14.2 21.12 12.19 21.12H9.7L6.87 23C6.63 23.17 6.35001 23.25 6.07001 23.25ZM5.39999 10.25C5.27999 10.25 5.17 10.26 5.06 10.27C3.62 10.4 2.75 11.39 2.75 12.9V16.97C2.75 17.77 3 18.44 3.47 18.91C3.93 19.37 4.59999 19.62 5.39999 19.62C5.80999 19.62 6.14999 19.96 6.14999 20.37V21.68L9.05 19.75C9.17 19.67 9.32 19.62 9.47 19.62H12.19C13.51 19.62 14.44 18.96 14.73 17.8C14.8 17.55 14.84 17.27 14.84 16.97V12.9C14.84 11.27 13.82 10.25 12.19 10.25H5.39999Z"
                              fill="#292D32"
                            />
                          </svg>
                          {IsEdit === item._id ? (
                            <input
                              type="text"
                              className="input-edit"
                              value={InputEdit}
                              onChange={(e) => {
                                setInputEdit(e.target.value);
                              }}
                            ></input>
                          ) : (
                            <p
                              style={{
                                color: "black",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: 150,
                                // height:20,
                                whiteSpace: "nowrap",
                                WebkitLineClamp: 1,
                              }}
                            >
                              {item.title}
                            </p>
                          )}
                          {IsEdit === item._id && (
                            <>
                              <i
                                onClick={() => {
                                  UpdateName(item._id);
                                }}
                                className="fa-solid fa-check"
                              ></i>
                              <i
                                onClick={() => {
                                  setIsEdit("");
                                }}
                                className="fa-solid fa-xmark"
                              ></i>
                            </>
                          )}
                          {IsDelete === item._id && (
                            <>
                              <i
                                onClick={() => {
                                  deleteHis(item._id);
                                }}
                                className="fa-solid fa-check"
                              ></i>
                              <i
                                onClick={() => {
                                  setIsDelete('');
                                }}
                                className="fa-solid fa-xmark"
                              ></i>
                            </>
                          )}
                          {IsDelete !== item._id && IsEdit !== item._id && (
                            <>
                              <i
                                className="fa-sharp fa-solid fa-pen"
                                onClick={() => {
                                  handleClickEdit(item.title, item._id);
                                }}
                              ></i>
                              <i
                                color="gray"
                                className="fa-solid fa-trash"
                                onClick={() => {
                                  handleClickDelete(item._id);
                                }}
                              ></i>
                            </>
                          )}
                        </button>
                      ) : (
                        <button className="btn-chat">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M16.9 19.5098C16.59 19.5098 16.28 19.4197 16.01 19.2397L15.05 18.6097C14.78 18.4297 14.65 18.0898 14.74 17.7798C14.81 17.5498 14.84 17.2797 14.84 16.9797V12.9097C14.84 11.2797 13.82 10.2598 12.19 10.2598H5.39999C5.27999 10.2598 5.17 10.2698 5.06 10.2798C4.85 10.2898 4.65001 10.2198 4.49001 10.0798C4.33001 9.93977 4.25 9.73979 4.25 9.52979V6.75977C4.25 3.81977 6.31 1.75977 9.25 1.75977H17.75C20.69 1.75977 22.75 3.81977 22.75 6.75977V11.8597C22.75 13.3097 22.26 14.5897 21.36 15.4697C20.64 16.1997 19.64 16.6698 18.5 16.8098V17.9197C18.5 18.5197 18.17 19.0598 17.65 19.3398C17.41 19.4498 17.15 19.5098 16.9 19.5098ZM16.3 17.6298L16.95 17.9998C17.01 17.9698 17.01 17.9197 17.01 17.9097V16.0997C17.01 15.6897 17.35 15.3497 17.76 15.3497C18.81 15.3497 19.7 15.0198 20.31 14.3998C20.94 13.7798 21.26 12.8997 21.26 11.8497V6.74976C21.26 4.61976 19.89 3.24976 17.76 3.24976H9.25999C7.12999 3.24976 5.75999 4.61976 5.75999 6.74976V8.74976H12.2C14.64 8.74976 16.35 10.4598 16.35 12.8998V16.9697C16.34 17.1997 16.33 17.4198 16.3 17.6298Z"
                              fill="#292D32"
                            />
                            <path
                              d="M6.07001 23.25C5.85001 23.25 5.62 23.2 5.41 23.09C4.94 22.84 4.64999 22.36 4.64999 21.82V21.06C3.76999 20.92 2.99 20.55 2.41 19.97C1.65 19.21 1.25 18.17 1.25 16.97V12.9C1.25 10.64 2.72999 8.98002 4.92999 8.77002C5.08999 8.76002 5.23999 8.75 5.39999 8.75H12.19C14.63 8.75 16.34 10.46 16.34 12.9V16.97C16.34 17.41 16.29 17.82 16.18 18.19C15.73 19.99 14.2 21.12 12.19 21.12H9.7L6.87 23C6.63 23.17 6.35001 23.25 6.07001 23.25ZM5.39999 10.25C5.27999 10.25 5.17 10.26 5.06 10.27C3.62 10.4 2.75 11.39 2.75 12.9V16.97C2.75 17.77 3 18.44 3.47 18.91C3.93 19.37 4.59999 19.62 5.39999 19.62C5.80999 19.62 6.14999 19.96 6.14999 20.37V21.68L9.05 19.75C9.17 19.67 9.32 19.62 9.47 19.62H12.19C13.51 19.62 14.44 18.96 14.73 17.8C14.8 17.55 14.84 17.27 14.84 16.97V12.9C14.84 11.27 13.82 10.25 12.19 10.25H5.39999Z"
                              fill="#292D32"
                            />
                          </svg>
                          <p
                            style={{
                              color: "black",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: 170,

                              whiteSpace: "nowrap",
                              WebkitLineClamp: 1,
                            }}
                          >
                            {item.title}
                          </p>
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
            <div className="logout justify-content-end">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="btn-logout"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
            <div className="setting justify-content-end">
              <button className="btn-setting">
                <i className="fa-solid fa-gear"></i>
                <span>Setting</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-10">
          <Outlet></Outlet>
        </div>
        <div className="bg-menu"></div>
      </div>
    </div>
  );
};
export default Main;
