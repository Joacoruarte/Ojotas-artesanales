// {
//   action: 'payment.created',
//   api_version: 'v1',
//   data: { id: '57377912475' },
//   date_created: '2023-04-28T01:45:42Z',
//   id: 105730299604,
//   live_mode: true,
//   type: 'payment',
//   user_id: '206833493'
// }
export default async function payments (req, res) {
  console.log(req.body)
  const { action, data } = req.body

  if (action && action === 'payment.created') {
    console.log('payment.created', data.id)
  }

  res.status(200).json({ message: 'ok' })
}
