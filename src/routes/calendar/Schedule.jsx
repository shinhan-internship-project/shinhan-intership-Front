import React, { useState } from 'react';
import ChatSvg from "@/assets/svg/chat-text.svg"
import ContentSvg from "@/assets/svg/card-text.svg"
import ContentPopup from '../../components/common/ContentPopup';

export default function Schedule({ dayTime, name, description, place }) {
  const [isContent, setIsContent] = useState(false);

  const clickChat = () => {
    console.log("해당 chat 내용으로 이동")
  }

  const clickContent = () => {
    setIsContent(!isContent)
  }

	return (
		<div className='mt-2 bg-white p-1 h-16 rounded-lg text-base flex px-2 shadow'>
      <div className='flex items-center w-1/5'>
        {dayTime} 
      </div>
      <div className='w-3/5 flex flex-col justify-center'>
        <p className='font-bold text-lg'>{name}</p>
        <p className='font-normal text-gray-400 text-sm'>{place}</p>
      </div>
      <div className='w-1/5 flex justify-end items-center pr-1'>
        <img src={ContentSvg} onClick={clickContent} className='mr-2 w-5 h-5'/>
        {isContent ? <ContentPopup content={description} setIsContentPopup={() => setIsContent(!isContent)}/> : <></>}
        <img src={ChatSvg} onClick={clickChat}/>
      </div>
		</div>
	);
}
