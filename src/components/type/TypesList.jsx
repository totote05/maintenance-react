export function TypeList ({types}) {
  return (
    <div className="type-list">
      {types.map(type => (
        <div key={type.id} className="type-llist-item">
          <h3>{type.name}</h3>
          {"Se repite a los:"}
          <strong>{type.nextOn}</strong>
          <button>{"Editar"}</button>
          <button>{"Eliminar"}</button>
        </div>
      ))}
    </div>
  )
}