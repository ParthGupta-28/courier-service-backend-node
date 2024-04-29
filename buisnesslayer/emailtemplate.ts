import type { IOrderCreate } from '../interfaces/order'

export const EmailTemplate = (data: Omit<IOrderCreate, 'user'>): string => {
    const {
        currentLocation,
        orderId,
        receiverAddress,
        receiverCity,
        receiverName,
        receiverPhoneNo,
        receiverPincode,
        receiverState,
        senderAddress,
        senderCity,
        senderName,
        senderPhoneNo,
        senderPincode,
        senderState,
        status,
    } = data
    return `
<head>
<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
    }
</style>
</head>
<body>
<h2>Order Details</h2>
<table>
    <tr>
        <th>Field</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>Order ID</td>
        <td>${orderId}</td>
    </tr>
    <tr>
        <td>Sender Name</td>
        <td>${senderName}</td>
    </tr>
    <tr>
        <td>Sender City</td>
        <td>${senderCity}</td>
    </tr>
    <tr>
        <td>Sender State</td>
        <td>${senderState}</td>
    </tr>
    <tr>
        <td>Sender Pincode</td>
        <td>${senderPincode}</td>
    </tr>
    <tr>
        <td>Sender Address</td>
        <td>${senderAddress}</td>
    </tr>
    <tr>
        <td>Sender Phone No</td>
        <td>${senderPhoneNo}</td>
    </tr>
    <tr>
        <td>Receiver Name</td>
        <td>${receiverName}</td>
    </tr>
    <tr>
        <td>Receiver City</td>
        <td>${receiverCity}</td>
    </tr>
    <tr>
        <td>Receiver State</td>
        <td>${receiverState}</td>
    </tr>
    <tr>
        <td>Receiver Pincode</td>
        <td>${receiverPincode}</td>
    </tr>
    <tr>
        <td>Receiver Address</td>
        <td>${receiverAddress}</td>
    </tr>
    <tr>
        <td>Receiver Phone No</td>
        <td>${receiverPhoneNo}</td>
    </tr>
    <tr>
        <td>Current Location</td>
        <td>${currentLocation}</td>
    </tr>
    <tr>
        <td>Status</td>
        <td>${status}</td>
    </tr>
</table>
</body>
</html>
    `
}
