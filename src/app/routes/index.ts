import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
// import { AvailabilityRoutes } from '../modules/Availibility/availibility.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  // {
  //   path: '/',
  //   route: AvailabilityRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
