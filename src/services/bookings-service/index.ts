import { notFoundError, unauthorizedError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';





async function getBookingsById(userId: number) {

    const bookings = await bookingRepository.findBookingsById(userId);
    if (!bookings || bookings.length === 0) throw notFoundError();

    const result = bookings.map((booking) => ({
        id: booking.id,
        Room: booking.Room,
    }));

    return result;
}

const bookingsService = {
    getBookingsById,
};


export default bookingsService


