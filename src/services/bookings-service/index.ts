import { notFoundError, unauthorizedError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import hotelRepository from '@/repositories/hotel-repository';

async function getBookingsById(userId: number) {

    if (!userId) throw unauthorizedError()

    const bookings = await bookingRepository.findBookingsById(userId);
    if (!bookings) throw notFoundError();

    return bookings;
}

async function postBookingByUser(userId: number, roomId: number) {

    if (!userId) throw unauthorizedError()

    const room = await bookingRepository.findRoomByRoomId(roomId)
    if (!room) throw notFoundError()
   const hotelWitRoom = await hotelRepository.findRoomsByHotelId(room.hotelId);
   if (!hotelWitRoom) throw new Error

    const bookings = await bookingRepository.insertBooking(userId, roomId);
    

    return bookings;
}


const bookingsService = {
    getBookingsById,
    postBookingByUser
};

export default bookingsService