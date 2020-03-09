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

  async update(req, res) {
    try {
      if (!req.recipient) throw new Error('Recipient not provided!');

      const {
        newName,
        newAddress,
        newAddress_number,
        newCity,
        newCep,
        newState,
        newComplement,
      } = req.body;

      const recipient = await Recipient.update(
        {
          name: newName || req.recipient.name,
          address: newAddress || req.recipient.address,
          address_number: newAddress_number || req.recipient.address_number,
          city: newCity || req.recipient.city,
          state: newState || req.recipient.state,
          cep: newCep || req.recipient.cep,
          complement: newComplement || req.recipient.complement,
        },
        { where: { id: req.recipient.id } }
      );
      return res.status(200).json(recipient);
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message ? error.message : error });
    }
  }
}
export default new RecipientController();
