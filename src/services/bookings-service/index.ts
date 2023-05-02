import { notFoundError, unauthorizedError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';





async function getBookingsById(userId: number) {

    if (!userId) throw unauthorizedError()
    
    const bookings = await bookingRepository.findBookingsById(userId);
    if (!bookings || bookings.length === 0) throw notFoundError();

    return bookings;
}


const bookingsService = {
    getBookingsById,
};

export default bookingsService