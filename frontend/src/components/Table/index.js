import React from "react";

const direction = {
  asc: 'ASC',
  desc: 'DESC'
};

function Table(props) {
  const { data, /* total,  */order, onChange } = props;

  const toggleDirection = field => {
    if (order.field === field) {
      return order.direction === direction.asc ? direction.desc : direction.asc;
    }
    return direction.asc;
  }

  const renderItems = () => {
    return data.map((item, index) => {
      return (
        <tr key={item.title + index}>
          <td>{item.date}</td>
          <td>{item.title}</td>
          <td>{item.amount}</td>
          <td>{item.distance}</td>
        </tr>
      )
    })
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th><div onClick={() => onChange({field: 'title', direction: toggleDirection('title')})} className="link">Название</div></th>
          <th><div onClick={() => onChange({field: 'amount', direction: toggleDirection('amount')})} className="link">Количество</div></th>
          <th><div onClick={() => onChange({field: 'distance', direction: toggleDirection('distance')})} className="link">Расстояние</div></th>
        </tr>
      </thead>
      <tbody>{renderItems()}</tbody>
    </table>
  )
}

export default Table;
