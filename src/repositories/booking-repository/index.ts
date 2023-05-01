import { prisma } from '@/config';


async function findBookingsById(userId: number) {
    return prisma.booking.findMany({
        where: {
            userId,
        },
        include:{
            Room: true
        },
    });
}

const bookingRepository = {
    findBookingsById
  };

export default bookingRepository