function MaintenanceListItem ({maintenance, editMaintenance, deleteMaintenance}) {
  return (
    <div className="maintenance-list-item">
      <h3>{maintenance.type.name ?? 'null'}</h3>
      <div className="list-element"><strong>Kilometros:</strong> {maintenance.odometer}</div>
      <div className="list-element"><strong>Fecha:</strong> {maintenance.date}</div>
      <div className="list-element"><strong>Próximo:</strong> {maintenance.nextOn}</div>
      <div className="list-actions">
        <button onClick={() => { editMaintenance(maintenance) }}>Editar</button>
        <button onClick={() => { deleteMaintenance(maintenance) }}>Eliminar</button>
      </div>
    </div>
  )
}

export default MaintenanceListItem