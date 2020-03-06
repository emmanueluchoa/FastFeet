import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    try {
      if (!req.recipient) throw new Error('Recipient not provided!');

      const recipient = await Recipient.create(req.recipient);

      return res.status(200).json(recipient);
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message ? error.message : error });
    }
  }
}
export default new RecipientController();
