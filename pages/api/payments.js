
export default async function payments (req, res) {
  console.log(req.query)
  res.status(200).json({ message: 'ok' })
}
