export default function SvgIcon(props: {name: string}) {
  const { name } = props;
  return <svg className="svg-icon" aria-hidden="true">
    <use xlinkHref={`#icon-${name}`} />
  </svg>;
}