import MaintenanceListItem from "./MaintenanceListItem"

function MaintenaceList ({list}) {
  return (
    <div className="maintenance-list">
      {list.map(item => (
        <MaintenanceListItem key={item.id} maintenance={item}/>
      ))}
    </div>
  )
}

export default MaintenaceList