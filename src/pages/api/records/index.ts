import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';
import Record from '../../../../models/Record';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const query = search ? { title: { $regex: search, $options: 'i' } } : {};
        const records = await Record.find(query)
          .limit(Number(limit))
          .skip((Number(page) - 1) * Number(limit));
        const total = await Record.countDocuments(query);

        res.status(200).json({ success: true, data: records, total });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const record = await Record.create(req.body);
        res.status(201).json({ success: true, data: record });
      } catch (error) {
        console.log(error.message)
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
