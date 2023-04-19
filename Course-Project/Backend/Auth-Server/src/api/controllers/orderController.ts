import { Request, Response, NextFunction } from 'express';
import CustomError from '../../classes/CustomError';
import Order from '../models/orderModel';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      throw new CustomError('Could not find orders', 404);
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    if (!orders) {
      throw new CustomError('Could not find order', 404);
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = new Order(req.body);

    const result = await order.save();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      throw new CustomError('Could not find order', 404);
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      throw new CustomError('Could not find order', 404);
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export { getAllOrders, getUserOrders, addOrder, updateOrder, deleteOrder };
