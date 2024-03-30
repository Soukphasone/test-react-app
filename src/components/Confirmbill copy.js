import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrders, fetchOrder } from '../service/api';
export function Confirm() {
  const { sign } = useParams();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any errors

  useEffect(() => {
    _fetchData();
  }, [sign]); 
    const _fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const orders = await fetchOrders(sign);
        // setTableData(orders.filter((item) => item.sign === sign)); 
        setTableData(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

  const renderTableData = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>; // Display error message
    }

    if (!tableData.length) {
      return <div>No orders found with sign: {sign}</div>; // Informative message
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Sign</th>
            <th>Car_Type</th>
            <th>Amount</th>
            <th>Money</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item._id}>
              <td>{item.createdAt}</td>
              <td>{item.sign}</td>
              <td>{item.carType}</td>
              <td>{item.amount}</td>
              <td>{item.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTableData()}
    </div>
  );
}
