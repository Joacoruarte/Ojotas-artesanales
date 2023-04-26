
export default async function payments (req, res) {
  console.log(req.body)
  res.status(200).json({ message: 'ok' })
}
