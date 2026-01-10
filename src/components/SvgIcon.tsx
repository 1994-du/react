import { useEffect } from "react";
import {loadSvgIcon} from '@/utils/loadSvg'
import { Tooltip } from 'antd';
interface SvgIconProps{
  name: string;
  color?: string;
  size?: string;
  title?: string;
  onClick?: () => void;
}
export default function SvgIcon(props: SvgIconProps) {
  const { name,color,size,onClick,title='' } = props;
  useEffect(() => {
      loadSvgIcon(name)
  },[name])
  const iconStyle:React.CSSProperties={
    color,
    width:size||'1rem',
    height:size||'1rem',
    cursor:'pointer'
  }
  return(
    <Tooltip placement="bottom" title={title}>
      <svg className="svg-icon" aria-hidden="true" style={iconStyle} onClick={onClick}>
        <use xlinkHref={`#icon-${name}`} />
      </svg>
    </Tooltip>
  ) 
  
  
}