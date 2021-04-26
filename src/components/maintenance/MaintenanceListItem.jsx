function MaintenanceListItem ({maintenance}) {
  return (
    <div className="maintenance-list-item">
      <h3>{maintenance.type.name ?? 'null'}</h3>
      <div className="list-element"><strong>Kilometros:</strong> {maintenance.odometer}</div>
      <div className="list-element"><strong>Fecha:</strong> {maintenance.odometer}</div>
      <div className="list-element"><strong>Próximo:</strong> {maintenance.odometer}</div>
    </div>
  )
}

export default MaintenanceListItem