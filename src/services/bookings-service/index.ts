import { notFoundError, unauthorizedError } from '@/errors';
import { cannotListRoomsError } from '@/errors/cannot-list-hotels-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';


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

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();


    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

    if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotListRoomsError();
    }

    const bookings = await bookingRepository.findBookingsByRoomId(roomId);

    if (room.capacity <= bookings.length) throw cannotListRoomsError()


    const insertedBookings = await bookingRepository.insertBooking(userId, roomId);


    return insertedBookings;
}

async function updateBookingByUser(userId: number, roomId: number, bookingId: number) {

    if (!userId) throw unauthorizedError()

    const room = await bookingRepository.findRoomByRoomId(roomId)
    if (!room) throw notFoundError()

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();


    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

    if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotListRoomsError();
    }

    const bookingsFind = await bookingRepository.findBookingsByRoomId(roomId);
    if (room.capacity <= bookingsFind.length) throw cannotListRoomsError()


    const updatedBooking = await bookingRepository.updateBookingByBookingId(bookingId, roomId)


    return updatedBooking;
}



const bookingsService = {
    getBookingsById,
    postBookingByUser,
    updateBookingByUser
};

export default bookingsService