function OdometerList ({ odometers }) {
  return (
    <div className="odometer-list">
      {odometers.map(odometer => (
        <div className="odometer-list-item">
          {odometer.value}
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      ))}
    </div>
  )
}

export default OdometerList