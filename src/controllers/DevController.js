import api from '../services/api';
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

class DevController {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const alreadExists = await Dev.findOne({ github_username, });

    if (alreadExists) {
      return res.json({ error: 'User already exists' });
    }

    const response = await api.get(`/users/${github_username}`);

    const { name = login, avatar_url, bio } = response.data;

    if(!name) {
      return res.json({ error: 'User does not exists on GitHub' });
    }

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }

    const dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    })

    return res.json(dev);
  }

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }
}

export default new DevController();