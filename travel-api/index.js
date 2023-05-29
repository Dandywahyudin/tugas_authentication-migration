const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let travelOrders = [];

app.post('/orders', (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Nama dan tipe pesanan harus diisi' });
  }

  const order = { id: generateId(), name, type };
  travelOrders.push(order);

  return res.status(201).json({ message: 'Pesanan travel berhasil dibuat', order });
});

app.get('/orders', (req, res) => {
  return res.status(200).json({ orders: travelOrders });
});

app.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const order = travelOrders.find((order) => order.id === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Pesanan travel tidak ditemukan' });
  }

  return res.status(200).json({ order });
});

app.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Nama dan tipe pesanan harus diisi' });
  }

  const order = travelOrders.find((order) => order.id === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Pesanan travel tidak ditemukan' });
  }

  order.name = name;
  order.type = type;

  return res.status(200).json({ message: 'Pesanan travel berhasil diperbarui', order });
});

app.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const index = travelOrders.findIndex((order) => order.id === orderId);

  if (index === -1) {
    return res.status(404).json({ message: 'Pesanan travel tidak ditemukan' });
  }

  travelOrders.splice(index, 1);

  return res.status(200).json({ message: 'Pesanan travel berhasil dihapus' });
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

app.listen(PORT, () => {
  console.log(`Server travel-api berjalan di port ${PORT}`);
});
