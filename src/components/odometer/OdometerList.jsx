function OdometerList ({ odometers, editOdometer, deleteOdometer }) {
  return (
    <table className="odometer-list">

      <thead>
        <tr>
          <th>Odometro</th>
          <th>Registrado</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {odometers.map(odometer => (
          <tr key={odometer.id} className="odometer-list-item">
            <td>{odometer.value}</td>
            <td>{odometer.date}</td>
            <td>
              <button onClick={() => { editOdometer(odometer) }}>Editar</button>
              <button onClick={() => { deleteOdometer(odometer) }}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

export default OdometerList