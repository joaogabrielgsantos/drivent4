import { prisma } from '@/config';
import { Booking, Room } from '@prisma/client';


async function findBookingsById(userId: number) {
    return prisma.booking.findFirst({
        where: {
            userId,
        },
        include: {
            Room: true
        },
    });
}

async function findRoomByRoomId(roomId: number): Promise<Room> {
    return prisma.room.findFirst({
        where: {
            id: roomId,
        },
    });
}

async function findBookingsByRoomId(roomId: number): Promise<Booking[]>{
    return prisma.booking.findMany({
        where: {
            roomId,
        },
    });
}


async function insertBooking(userId: number, roomId: number): Promise<Booking> {
    return await prisma.booking.create({
        data: {
            userId,
            roomId,
        },
    });
}

const bookingRepository = {
    findBookingsById,
    insertBooking,
    findRoomByRoomId,
    findBookingsByRoomId
};

export default bookingRepository