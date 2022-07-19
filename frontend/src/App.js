import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter'
import Pagination from './components/Pagination'
import Table from './components/Table'

function App() {
  const [data, setData] = useState({data: [], total: 0})
  const [where, setWhere] = useState({field: '', operator: '', search: ''})
  const [order, setOrder] = useState({field: '', direction: ''})
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('http://localhost:3001/')
      const params = new URLSearchParams()
      if (where.field && where.operator && where.search) {
        params.append('where', JSON.stringify(where))
      }
      if (order.field && order.direction) {
        params.append('order', JSON.stringify(order))
      }
      if (offset > 0) {
        params.append('offset', offset)
      }
      url.search = params
      const response = await fetch(url)
      const data = await response.json()
    
      setData(data);
    }

    fetchData().catch(console.error);
  }, [ where, order, offset ])
  
  return (
    <div className="App">
      <h1>Фрукты</h1>
      <Filter
        where={where}
        onChange={setWhere}
      />
      <Pagination 
        total={data.total} 
        limit={data.limit} 
        offset={data.offset}
        onChange={setOffset}
      />
      <Table
        data={data.data}
        total={data.total}
        order={order}
        onChange={setOrder}
      />
    </div>
  );
}

export default App;
