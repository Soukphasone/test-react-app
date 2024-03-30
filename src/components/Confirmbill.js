import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrders, updateOrderStatus } from '../service/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
export function Confirm() {
    const { sign } = useParams();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        _fetchData();
    }, [sign]);
    const _fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const orders = await fetchOrders(sign);
            // setTableData(orders.filter((item) => item.userId === "65f954bd7235fa270868feb1")); 
            setTableData(orders);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const headers = {
        'Authorization': `STORE eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjk1NGJkNzIzNWZhMjcwODY4ZmViMSIsInVzZXJuYW1lIjoiQm8iLCJyb2xlIjoiVVNFUiIsInN0YXR1cyI6IkFDVElWRSIsImlhdCI6MTcxMTQ3ODQ2NCwiZXhwIjoxNzExNTY0ODY0fQ.pybra95K4sfa_KCOheOib0zJnT_WkZl9BACDIuDSInI`
    };
    const handleUpdateStatus = async (id) => {
        if (window.confirm('Are you sure?'))
        try {
            await updateOrderStatus(id, 'OFFLINE', headers);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    const renderTableData = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!tableData.length) {
            return <div>No car</div>;
        }
        return (

            <div>
                <div> {tableData.map((item) => (
                    <ul key={item._id}>
                        <li>{`Date: ${moment(item.createdAt).format('DD/MM/YY, h:mm:ss')}`}</li>
                        <li>{`Sign: ${item.sign}`}</li>
                        <li>{`Car_Type: ${item.carType}`}</li>
                        <li>{`Amout: ${item.amount}`}</li>
                        <li>{`Money: ${item.money}`}</li>
                       
                        {/* <li><h2>This QR is True</h2></li> */}
                        <br /> 
                        <button onClick={() => handleUpdateStatus(item._id)}>Confirm</button>
                    </ul>

                ))}</div>
            </div>

        );
    };

    return (
        <div>
            {renderTableData()}
        </div>
    );
}
