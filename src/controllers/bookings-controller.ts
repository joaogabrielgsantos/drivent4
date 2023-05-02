import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/bookings-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const booking = await bookingsService.getBookingsById(userId);
    if (!booking) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const {roomId}= req.body

    const postedBooking = await bookingsService.postBookingByUser(userId, roomId);

    return res.status(httpStatus.OK);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}