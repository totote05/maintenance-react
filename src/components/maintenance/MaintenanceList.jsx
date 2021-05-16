import MaintenanceListItem from "./MaintenanceListItem"

function MaintenaceList ({list, editMaintenance, deleteMaintenance}) {
  return (
    <div className="maintenance-list">
      {list.map(item => (
        <MaintenanceListItem
          key={item.id}
          maintenance={item}
          editMaintenance={editMaintenance}
          deleteMaintenance={deleteMaintenance}
        />
      ))}
    </div>
  )
}

export default MaintenaceList