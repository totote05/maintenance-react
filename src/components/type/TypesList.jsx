export function TypeList ({types, editType, deleteType}) {
  return (
    <table className="type-list">

      <thead>
        <tr>
          <th>Tipo de mantenimiento</th>
          <th>Periodicidad</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {types.map(type => (
          <tr key={type.id} className="type-llist-item">
            <td>{type.name}</td>
            <td>{type.nextOn}</td>
            <td>
              <button onClick={() => { editType(type) }}>Editar</button>
              <button onClick={() => { deleteType(type) }}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}