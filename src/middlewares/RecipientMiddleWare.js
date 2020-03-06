import * as YUP from 'yup';

export default {
  async checkIfRecipientModelIsValid(req, res, next) {
    try {
      const schema = YUP.object().shape({
        name: YUP.string().required('Name not provided!'),
        address: YUP.string().required('Address not provided!'),
        address_number: YUP.string().required('Address number not provided!'),
        city: YUP.string().required('City not provided!'),
        state: YUP.string().required('State not provided!'),
        cep: YUP.string().required('Cep not provided!'),
      });

      await schema.validate(req.body);

      if (!req.user_id) throw new Error('User not provided!');

      const {
        name,
        address,
        address_number,
        city,
        state,
        cep,
        complement,
      } = req.body;

      req.recipient = {
        name,
        address,
        address_number,
        city,
        state,
        cep,
        complement,
        user_id: req.user_id,
      };

      console.log(req.recipient);
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message ? error.message : error });
    }
  },
};
