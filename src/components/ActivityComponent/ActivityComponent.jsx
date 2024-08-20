import "./ActivityComponent.scss";
export default function ActivityComponent({name, icon, func}) {
  return (
    <div className={`${name} flex-c-4 light-bold pointer active`} onClick={func}>
        <img src={icon} alt={`${name} icon`} />
        {name}
    </div>
  )
}
