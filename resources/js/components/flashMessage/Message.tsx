
import React from 'react';

interface MessageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color: string; 
}
export default function Message({ title, description, icon, color }: MessageProps) {
  return (
    <div
      className="p-3 rounded-sm flex"
      style={{
        backgroundColor: `${color}2f`,
        border: `1px solid ${color}73`,
        color: '#ffffff93',
      }}
    >
      <div
        className="p-2 pl-0 border-r-2"
        style={{ borderColor: `${color}73` }}
      >
        <div className="h-10 w-10" style={{ color }}>
          {icon ?? 'icon'}
        </div>
      </div>
      <div className="flex flex-col justify-center items-start ml-2">
        <h6 className="text-base font-bold">{title}</h6>
        <p className="text-sm w-[30ch]">{description}</p>
      </div>
    </div>
  );
}
