const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      reservation: {
        roomNumber: '101',
        checkInDate: '2023-06-01',
        checkOutDate: '2023-06-05',
      },
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 30,
      reservation: {
        roomNumber: '202',
        checkInDate: '2023-06-02',
        checkOutDate: '2023-06-07',
      },
      password: 'abc123',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      age: 35,
      reservation: {
        roomNumber: '303',
        checkInDate: '2023-06-03',
        checkOutDate: '2023-06-09',
      },
      password: 'pass1234',
    },
    // Add more user objects as needed
  ];
  
  module.exports = users;