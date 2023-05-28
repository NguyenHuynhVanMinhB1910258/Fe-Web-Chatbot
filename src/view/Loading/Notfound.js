import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Loading1.css'
import hinh from './33.svg'
export default function Notfound() {
    useEffect(() => {
        doAction();
    }, [])
    const doAction = () => {
        const loading = document.querySelector('.cham')
        // Tạo phần tử div mới
        while (loading.firstChild) {
            loading.removeChild(loading.firstChild);
        }
        var newDiv = document.createElement('div');
        newDiv.style.animationName = 'loading';
        newDiv.style.animationDelay = '0s';
        newDiv.style.animationDuration = '1s';

        // Thêm phần tử div mới vào phần tử cha
        loading.appendChild(newDiv);
        var newDiv = document.createElement('div');
        newDiv.style.animationName = 'loading';
        newDiv.style.animationDelay = '1s';
        newDiv.style.animationDuration = '1s';

        // Thêm phần tử div mới vào phần tử cha
        loading.appendChild(newDiv);
        var newDiv = document.createElement('div');
        newDiv.style.animationName = 'loading';
        newDiv.style.animationDelay = '2s';
        newDiv.style.animationDuration = '1s';

        // Thêm phần tử div mới vào phần tử cha
        loading.appendChild(newDiv);
        // Chờ 2 giây và sau đó thực hiện lại hành động
        setTimeout(doAction, 3000);
    }
    return (
        <div>
            <div className="huhu">
                <div className="image">
                    <div className="farme-rb">
                        <img className="robot" src={hinh} alt=""></img>
                    </div>
                    <svg className="message1" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M9.15526 24.7721L5.82384 19.0019C4.28626 16.3388 5.20535 12.9391 7.86852 11.4015L17.5177 5.83061C20.1808 4.29303 23.5845 5.1969 25.1221 7.86006L29.0106 14.5952C30.5426 17.2487 29.6236 20.6483 26.9604 22.1859L25.513 23.0215C25.2139 23.1942 25.008 23.5061 24.9639 23.8532L24.6252 26.609C24.4786 27.8258 23.4365 28.4275 22.3094 27.946L19.7534 26.8615C19.4764 26.7383 19.0288 26.7652 18.7586 26.9212L17.3112 27.7568C14.6481 29.2944 11.2444 28.3905 9.71235 25.737L9.15526 24.7721Z" fill="#F2F2F2" />
                        <path style={{ animation: 'message 0.3s', animationDelay: '0s', animationIterationCount: 'infinite' }} d="M18.2642 18.2653C17.7238 18.5773 17.0486 18.3882 16.7422 17.8575C16.4358 17.3268 16.6193 16.6419 17.15 16.3355C17.6807 16.0291 18.3656 16.2126 18.672 16.7433C18.9784 17.274 18.8045 17.9533 18.2642 18.2653Z" fill="#F2F2F2" />
                        <path style={{ animation: 'message 0.4s', animationDelay: '0.1s', animationIterationCount: 'infinite' }} d="M22.1238 16.0363C21.5834 16.3483 20.9082 16.1592 20.6018 15.6285C20.2954 15.0978 20.4789 14.4129 21.0096 14.1065C21.5403 13.8001 22.2252 13.9836 22.5316 14.5143C22.838 15.045 22.6641 15.7243 22.1238 16.0363Z" fill="#F2F2F2" />
                        <path style={{ animation: 'message 0.5s', animationDelay: '0.2s', animationIterationCount: 'infinite' }} d="M14.4043 20.4933C13.8639 20.8053 13.1887 20.6162 12.8823 20.0855C12.5759 19.5548 12.7594 18.8699 13.2901 18.5635C13.8208 18.2571 14.5057 18.4406 14.8121 18.9713C15.1185 19.502 14.9446 20.1814 14.4043 20.4933Z" fill="#F2F2F2" />
                    </svg>
                    <svg className="message2" width="62" height="61" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M14.2653 22.629L19.7966 13.0486C22.3494 8.62683 28.0008 7.12611 32.4225 9.679L48.4433 18.9286C52.865 21.4815 54.391 27.126 51.8381 31.5478L45.3819 42.7303C42.8383 47.136 37.1869 48.6367 32.7652 46.0838L30.3621 44.6964C29.8654 44.4096 29.2461 44.3725 28.7104 44.5972L24.4667 46.3979C22.5953 47.1973 20.8651 46.1983 20.6217 44.178L20.0592 39.6025C20.0064 39.102 19.5961 38.4806 19.1475 38.2217L16.7444 36.8342C12.3227 34.2813 10.7967 28.6368 13.3403 24.2311L14.2653 22.629Z" fill="#F2F2F2" />
                        <path style={{ animation: 'message 0.3s', animationDelay: '0s', animationIterationCount: 'infinite' }} d="M31.1838 30.3244C30.2866 29.8064 29.998 28.6785 30.5067 27.7974C31.0154 26.9162 32.1526 26.6115 33.0337 27.1203C33.9149 27.629 34.2196 28.7662 33.7108 29.6473C33.2021 30.5285 32.081 30.8424 31.1838 30.3244Z" fill="#F2F2F2" />
                        <path style={{ animation: 'message 0.4s', animationDelay: '0.1s', animationIterationCount: 'infinite' }} d="M37.5918 34.0241C36.6946 33.5062 36.4059 32.3782 36.9146 31.4971C37.4234 30.616 38.5605 30.3113 39.4417 30.82C40.3228 31.3287 40.6275 32.4659 40.1188 33.347C39.6101 34.2282 38.4889 34.5421 37.5918 34.0241Z" fill="#F2F2F2" />
                        <path style={{ animation: 'message 0.5s', animationDelay: '0.2s', animationIterationCount: 'infinite' }} d="M24.7751 26.6247C23.8779 26.1067 23.5893 24.9788 24.098 24.0977C24.6067 23.2165 25.7439 22.9118 26.625 23.4206C27.5062 23.9293 27.8109 25.0665 27.3021 25.9476C26.7934 26.8287 25.6723 27.1427 24.7751 26.6247Z" fill="#F2F2F2" />
                    </svg>
                </div>
                <div className="cham"></div>
                <div className='content1'>
                    <h2>Không tìm thấy trang!</h2>
                    <Link to="/chat">
                        <button>quay về trang chủ</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
