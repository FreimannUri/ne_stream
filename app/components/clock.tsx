'use client';

import { useEffect, useRef } from 'react';

export default function Clock() {
  const secondHandle = useRef<HTMLDivElement>(null);
  const minuteHandle = useRef<HTMLDivElement>(null);
  const hourHandle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInterval(() => {
      let date = new Date();
      let ss = date.getSeconds();
      let mm = date.getMinutes();
      let hh = date.getHours();

      if (secondHandle.current)
        secondHandle.current.style.transform = `rotateZ(${ss * 6}deg)`;
      if (minuteHandle.current)
        minuteHandle.current.style.transform = `rotateZ(${mm * 6}deg)`;
      if (hourHandle.current)
        hourHandle.current.style.transform = `rotateZ(${
          hh * 30 + mm * 0.5
        }deg)`;
    }, 1000);
  }, []);

  return (
    <div id='app' className='mt-16'>
      <div className='flex justify-center'>
        <div
          className=' bg-cover h-[150px] w-[150px]
          flex items-center justify-center rounded-[50%] bg-[#1e1e1e]
          shadow-[0_0_10px_10px_rgba(0,224,255,0.2)]
          bg-[url("https://raw.githubusercontent.com/ganeshbabuhc/day1_clock/master/clock.png")]'
        >
          <div
            ref={hourHandle}
            id='hor'
            className='relative flex items-center justify-center'
          >
            <div
              className='bg-[#3d6cb9] absolute h-[30px] w-[2px]
              bottom-0 z-8 rounded-[2px]'
            ></div>
          </div>
          <div
            ref={minuteHandle}
            id='min'
            className='relative flex items-center justify-center'
          >
            <div
              className='bg-[#00d1ff] absolute h-[45px] w-[2px]
              bottom-0 z-9 rounded-[2px]'
            ></div>
          </div>
          <div
            ref={secondHandle}
            id='sec'
            className='relative flex items-center justify-center'
          >
            <div
              className='bg-[#00fff0] absolute h-[60px] w-[2px]
              -bottom-[15px] z-10 rounded-[2px]'
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
