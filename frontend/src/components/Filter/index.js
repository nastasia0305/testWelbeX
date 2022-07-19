import React, {useState} from "react";

function Filter(props) {
  const { /* where */ onChange } = props;
  const [field, setField] = useState('date');
  const [operator, setOperator] = useState('equal');
  const [search, setSearch] = useState('');
    
  return (
    <div className="filter">
      <select name="field" onChange={(event) => setField(event.target.value)}>
        <option value="date">Дата</option>
        <option value="title">Название</option>
        <option value="amount">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select name="operator" onChange={(event) => setOperator(event.target.value)}>
        <option value="equal">равно</option>
        <option value="gt">больше</option>
        <option value="lt">меньше</option>
        <option value="contains">содержит</option>
      </select>
      <input type="text" name="search" value={search} onChange={(event) => setSearch(event.target.value)} />
      <button onClick={() => onChange({field, operator, search})}>Поиск</button>
    </div>

    )
}

export default Filter;

