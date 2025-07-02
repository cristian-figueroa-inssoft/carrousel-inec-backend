const express = require('express');
const { createPaymentLink } = require('../controllers/ordersController');
const {
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  createCharge
} = require('../controllers/ordersIdController');
const { selectStudentOrders } = require('../controllers/actividadController');

const router = express.Router();

router.post('/create', createPaymentLink);
router.post('/createId', createPaymentLinkIdCustomer);
router.post('/createOrderStudent', createPaymentLinkStudent);
router.post('/activity', selectStudentOrders);

router.post('/pay', async (req, res) => {
  try {
    const {
      customer_id,
      token,
      amount,
      description,
      orderId,
      deviceSessionId,
      pedidoIds,
      fechaVigencia,
      pedidosSeleccionados,
      saveCard,
      tokenGuardar,
      telefono,
      ciudad,
      postal,
      idAlumno,
      nombreTarjeta 
    } = req.body;

    if (!customer_id || !token || !amount || !description || !orderId || !deviceSessionId) {
      return res.status(400).json({ error: 'Faltan parámetros' });
    }

    const charge = await createCharge(customer_id, token, amount, description, orderId, deviceSessionId, pedidoIds, fechaVigencia, pedidosSeleccionados, saveCard, tokenGuardar, telefono, ciudad, postal, idAlumno, nombreTarjeta);

    res.status(200).json({ success: true, charge });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
