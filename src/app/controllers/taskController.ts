import { Request, Response } from 'express';
import Cars from '@app/app/models/tasks';

import { AppError } from '@app/errors/app-error';

class CarsController {
  public async get(req: Request, res: Response) {
    const { id } = req.params;

    const car = await Cars.findOne({
      where: { id },
    });

    const carTypes = await CarTypes.findOne({
      where: { id: car?.carTypeId },
    });

    return res.json({
      data: {
        id: car?.id,
        description: car?.description,
        carType: carTypes?.description,
      },
    });
  }

  async store(req: Request, res: Response) {
    try {
      const { description, type } = req.body;

      const car = await Cars.create({
        carTypeId: type,
        description: description,
      });

      return res.status(201).json(car);
    } catch (error) {
      return res.sendError(error, 500);
    }
  }

  async index(req: Request, res: Response) {
    let { rows } = await Cars.findAndCountAll();

    for (let index = 0; index < rows.length; index++) {
      await CarTypes.findOne({
        where: { id: rows[index].carTypeId },
      }).then(result => {
        rows[index].dataValues.typeDescription = result.description;
      });
    }

    return res.json({
      data: rows,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description, type } = req.body;

    const carTypes = await CarTypes.findOne({
      where: { id: type },
    });

    if (!carTypes) {
      throw new AppError('Tipo de carro não encontrado', 404);
    }

    const car = await Cars.update(
      {
        description,
        carType: type,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    //Registro no mongo
    return res.status(200).json(car);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Cars.destroy({
      where: { id },
    });

    return res.send(204);
  }
}

export default new CarsController();
