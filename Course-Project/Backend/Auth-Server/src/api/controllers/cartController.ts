import { Request, Response, NextFunction } from 'express';
import CustomError from '../../classes/CustomError';
import Cart from '../models/cartModel';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await Cart.find();
    if (!carts) {
      throw new CustomError('Could not find carts', 404);
    }

    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

const getCartByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      throw new CustomError('Could not find cart', 404);
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const addCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = new Cart(req.body);

    const result = await cart.save();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cart) {
      throw new CustomError('Could not find cart', 404);
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      throw new CustomError('Could not find cart', 404);
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export { getAllCarts, getCartByUser, addCart, updateCart, deleteCart };
